import express from "express";
import mongoose from "mongoose";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import Category from "../models/Category.js";

const router = express.Router();

mongoose.connection.on("connected", () => {
  if (!mongoose.models.Category) {
    mongoose.model("Category", Category.schema);
  }
});

// 📌 Lấy danh sách category (ai cũng xem được)
router.get("/", getAllCategories);

// 📌 Lấy chi tiết 1 category
router.get("/:id", getCategoryById);

// 📌 Tạo mới (chỉ admin)
router.post("/",  createCategory);

// 📌 Cập nhật (chỉ admin)
router.put("/:id",  updateCategory);

// 📌 Xóa (chỉ admin)
router.delete("/:id",  deleteCategory);

export default router;
