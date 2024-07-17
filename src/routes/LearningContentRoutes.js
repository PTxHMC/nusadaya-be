import express from "express";
import LearningContentController from "../controller/LearningContentController.js";
import verifyToken from "../middleware/VerifyToken.js";
import upload from "../middleware/Multer.js";

const router = express.Router();

router.get("/", LearningContentController.getLearningContents);
router.get("/my", verifyToken, LearningContentController.getMyLearningContents);
router.post(
  "/",
  verifyToken,
  upload.single("thumbnail"),
  LearningContentController.createLearningContent
);
router.get("/:id", LearningContentController.getLearningContentById);
router.patch(
  "/:id",
  verifyToken,
  upload.single("thumbnail"),
  LearningContentController.updateLearningContent
);
router.delete(
  "/:id",
  verifyToken,
  LearningContentController.deleteLearningContent
);

export default router;
