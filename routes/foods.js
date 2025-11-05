import express from "express";
import mongoose from "mongoose";

import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

mongoose.connection.on("connected", () => {
  if (!mongoose.models.Food) {
    mongoose.model("Food", Food.schema);
  }
});

// Lấy tất cả món ăn, có thể filter bằng query ?categoryId=xxx&restaurantId=yyy
router.get("/", getAllFoods);

// Lấy món ăn theo ID
router.get("/:id", getFoodById);

// Thêm món ăn (admin)
router.post("/", createFood);

// Cập nhật món ăn (admin)
router.put("/:id",  updateFood);

// Xóa món ăn (admin)
router.delete("/:id",  deleteFood);

export default router;
