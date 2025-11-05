import express from "express";
import mongoose from "mongoose";
import {
  createPayment,
  getUserPayments,
  getAllPayments,
  updatePaymentStatus,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

mongoose.connection.on("connected", () => {
  if (!mongoose.models.Payment) {
    mongoose.model("Payment", Payment.schema);
  }
});

router.use(authMiddleware);

// User routes
router.post("/create", createPayment);
router.get("/", getUserPayments);

// Admin routes
router.get("/all",  getAllPayments);
router.put("/:id/status",  updatePaymentStatus);

export default router;
