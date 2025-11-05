import express from "express";
import mongoose from "mongoose";

import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Tất cả route đều cần user login
router.use(authMiddleware);

mongoose.connection.on("connected", () => {
  if (!mongoose.models.Order) {
    mongoose.model("Order", Order.schema);
  }
});

// User routes
router.post("/create", createOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);

// Admin route cập nhật trạng thái
router.put("/:id/status", adminMiddleware, updateOrderStatus);

export default router;
