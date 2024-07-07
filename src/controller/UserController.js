import UserServices from "../service/UserService.js";

const getUsers = async (req, res) => {
  try {
    const users = await UserServices.getUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const user = await UserServices.register(req.body);

    res.status(201).json({
      message: "Registrasi Berhasil, silahkan cek email anda untuk verifikasi",
      data: user,
    });
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
    });

    res.status(200).json({
      message: "Login Berhasil",
      data: {
        access_token: user.accessToken,
      },
    });
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
    const image_path = req.file.path;

    const profile = await UserServices.settingProfile(userId, data, image_path);

    res.status(200).json({
      message: "Berhasil mengupdate profil",
      data: profile,
    });
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

    res.status(200).json({
      message: "Berhasil mengambil data",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  getUsers,
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
