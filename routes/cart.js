import express from "express";
import mongoose from "mongoose";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

mongoose.connection.on("connected", () => {
  if (!mongoose.models.Cart) {
    mongoose.model("Cart", Cart.schema);
  }
});

// Tất cả route đều cần user login
router.use(authMiddleware);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove", removeCartItem);
router.delete("/clear", clearCart);

export default router;
