import UserServices from "../service/UserService.js";
import {
  createResponse,
  createPaginationResponse,
} from "../utils/CreateResponse.js";

const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await UserServices.getUsers(page, limit);

    const pagination = createPaginationResponse(
      users.totalItems,
      users.totalPage,
      users.pageNumber,
      users.limitNumber
    );
    const dataResponse = createResponse(
      "Berhasil Mengambil data",
      users.users,
      pagination
    );

    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserServices.getProfile(userId);

    const dataResponse = createResponse("Berhasil mengambil data", user);

    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const user = await UserServices.register(req.body);

    const dataResponse = createResponse(
      "Registrasi Berhasil, silahkan cek email anda untuk verifikasi",
      user
    );

    res.status(201).json(dataResponse);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserServices.login(req.body);

    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'None'
    });

    const dataResponse = createResponse("Login Berhasil", {
      access_token: user.accessToken,
    });

    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await UserServices.logout(refreshToken);

    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const verify = await UserServices.verifyEmail(token);

    res.status(200).json({
      message: verify,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const resendVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    await UserServices.resendVerifyEmail(email);

    res.status(200).json({
      message: "Silahkan cek email anda untuk melakukan verifikasi",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    await UserServices.forgetPassword(email);

    res.status(200).json({
      message: "Silahkan cek email anda untuk reset password",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = req.body;

    await UserServices.resetPassword(data);

    res.status(200).json({
      message: "password berhasil diperbarui",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const settingProfile = async (req, res) => {
  try {
    const userId = req.id;
    const data = req.body;
    // const image_path = req.file.path;

    const profile = await UserServices.settingProfile(userId, data);

    const dataResponse = createResponse("Berhasil mengupdate profil", profile);

    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.id;

    const profile = await UserServices.getProfile(userId);

    const dataResponse = createResponse("Berhasil mengambil data", profile);

    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  getUsers,
  getUserById,
  register,
  login,
  logout,
  verifyEmail,
  resendVerifyEmail,
  forgetPassword,
  resetPassword,
  settingProfile,
  getProfile,
};
