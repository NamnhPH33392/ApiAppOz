import express from "express";
import mongoose from "mongoose";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

mongoose.connection.on("connected", () => {
  if (!mongoose.models.User) {
    mongoose.model("User", User.schema);
  }
});

// Auth
router.post("/register", register);
router.post("/login", login);

// User management
router.get("/",  getAllUsers);
router.get("/:id",  getUserById);
router.put("/:id",  updateUser);
router.delete("/:id",  deleteUser);

export default router;
