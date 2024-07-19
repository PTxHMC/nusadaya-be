import express from "express";
import UserController from "../controller/UserController.js";
import { refreshToken } from "../controller/RefreshToken.js";
import verifyToken from "../middleware/VerifyToken.js";
import roleAccess from "../middleware/RoleAccess.js";
import upload from "../middleware/Multer.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  roleAccess(["USER", "TEACHER", "ADMIN"]),
  UserController.getUsers
);

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/token", refreshToken);

router.get("/verify", UserController.verifyEmail);
router.post("/verify", UserController.resendVerifyEmail);

router.post("/password", UserController.forgetPassword);
router.patch("/password", UserController.resetPassword);

router.delete("/logout", UserController.logout);

router.get("/profile", verifyToken, UserController.getProfile);
router.patch(
  "/profile",
  verifyToken,
  upload.single("profile_picture"),
  UserController.settingProfile
);
router.get("/:id", verifyToken, UserController.getUserById);

export default router;
