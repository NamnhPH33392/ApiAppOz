import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addReview, getReviewsByFood, getReviewsByRestaurant } from "../controllers/reviewController.js";

const router = express.Router();

mongoose.connection.on("connected", () => {
  if (!mongoose.models.Review) {
    mongoose.model("Review", Review.schema);
  }
});

// Thêm review (cần login)
router.post("/", authMiddleware, addReview);

// Lấy review theo món ăn
router.get("/food/:foodId", getReviewsByFood);

// Lấy review theo nhà hàng
router.get("/restaurant/:restaurantId", getReviewsByRestaurant);

export default router;
