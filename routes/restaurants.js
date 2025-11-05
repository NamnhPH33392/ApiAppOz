import express from "express";
import mongoose from "mongoose";
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from "../controllers/restaurantController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

mongoose.connection.on("connected", () => {
  if (!mongoose.models.Restaurant) {
    mongoose.model("Restaurant", Restaurant.schema);
  }
});

// Lấy tất cả nhà hàng
router.get("/", getAllRestaurants);

// Lấy nhà hàng theo ID
router.get("/:id", getRestaurantById);

// Các route admin
router.post("/",  createRestaurant);
router.put("/:id",  updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
