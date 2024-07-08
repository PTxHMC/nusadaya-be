import express from "express";
import verifyToken from "../middleware/VerifyToken.js";
import roleAccess from "../middleware/RoleAccess.js";
import CategoryController from "../controller/CategoryController.js";

const router = express.Router();

router.use(verifyToken, roleAccess(["ADMIN"]));

router.get("/", CategoryController.getCategories);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
