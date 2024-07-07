import prisma from "../db/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validate from "../validation/validation.js";
import {
  profileValidation,
  registerValidation,
  resetPasswordValidation,
} from "../validation/UserValidation.js";
import sendVerificationEmail from "../utils/SendMail.js";
import sendResetPasswordMail from "../utils/ResetPassword.js";
import uploads from "../middleware/UploadImage.js";

const getUsers = async (page, limit) => {
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [totalItems, users] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: skip,
      take: limitNumber,
    }),
  ]);

  const totalPage = Math.ceil(totalItems / limitNumber);

  return { totalPage, totalItems, pageNumber, limitNumber, users };
};

const getUserCount = async (data) => {
  return await prisma.user.count({
    where: {
      email: data.email,
    },
  });
};

const register = async (data) => {
  const userData = validate(registerValidation, data);

  const countUser = await getUserCount(data);

  if (countUser === 1) {
    throw new Error("email sudah terdaftar");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(userData.password, salt);

  const user = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: hashPassword,
      role: userData.role,
    },
    select: {
      username: true,
      email: true,
      role: true,
    },
  });

  const { email } = user;

  const verifyToken = jwt.sign({ email }, process.env.VERIFY_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  await sendVerificationEmail(email, verifyToken);

  return user;
};

const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("email atau password salah");
  }

  const match = await bcrypt.compare(data.password, user.password);

  if (!match) {
    throw new Error("email atau password salah");
  }

  const { id, username, email, role } = user;

  const accessToken = jwt.sign(
    { id, username, email, role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { id, username, email, role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  await prisma.user.update({
    data: {
      refresh_token: refreshToken,
    },
    where: {
      id: id,
    },
  });

  return { refreshToken, accessToken };
};

const logout = async (refreshToken) => {
  if (!refreshToken) throw "No Content";

  const user = await prisma.user.findMany({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) throw new Error("No Content");

  await prisma.user.update({
    data: {
      refresh_token: null,
    },
    where: {
      id: user[0].id,
    },
  });

  return;
};

const verifyEmail = async (token) => {
  const { email } = jwt.verify(token, process.env.VERIFY_TOKEN_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Token tidak valid");
  }

  await prisma.user.update({
    data: {
      is_verified: true,
    },
    where: {
      email,
    },
  });

  return "Email anda terverifikasi";
};

const resendVerifyEmail = async (email) => {
  const verifyToken = jwt.sign({ email }, process.env.VERIFY_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  await sendVerificationEmail(email, verifyToken);

  return;
};

const forgetPassword = async (email) => {
  const token = jwt.sign({ email }, process.env.RESET_PASS_SECRET, {
    expiresIn: "1h",
  });

  await sendResetPasswordMail(email, token);

  return;
};

const resetPassword = async (data) => {
  const { email } = jwt.verify(data.token, process.env.RESET_PASS_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Token tidak valid");
  }

  const userData = await validate(resetPasswordValidation, {
    password: data.password,
    confirm_password: data.confirm_password,
  });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(userData.password, salt);

  await prisma.user.update({
    data: {
      password: hashPassword,
    },
    where: {
      email,
    },
  });

  return;
};

const settingProfile = async (id, data, image_path) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("pengguna tidak ditemukan");
  }

  const existingProfile = await prisma.profile.findUnique({
    where: {
      userId: id,
    },
  });

  const userData = validate(profileValidation, data);

  const image = await uploads(image_path, "nusadaya-media");

  if (!existingProfile) {
    const profile = await prisma.profile.create({
      data: {
        userId: id,
        full_name: userData.full_name,
        gender: userData.gender,
        profile_picture: image,
      },
    });
    return profile;
  } else {
    const profile = await prisma.profile.update({
      data: {
        userId: id,
        full_name: userData.full_name,
        gender: userData.gender,
        profile_picture: image,
      },
      where: {
        userId: id,
      },
    });
    return profile;
  }
};

const getProfile = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new Error("Pengguna tidak ditemukan");
  }

  const response = {
    email: user.email,
    username: user.username,
    role: user.role,
    full_name: user.profile?.full_name || null,
    gender: user.profile?.gender || "UNKNOWN",
    profile_picture: user.profile?.profile_picture || null,
  };

  return response;
};

export default {
  getUsers,
  register,
  getUserCount,
  login,
  logout,
  verifyEmail,
  resendVerifyEmail,
  forgetPassword,
  resetPassword,
  settingProfile,
  getProfile,
};
