import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";
import dotenv from "dotenv";
import "./models/db.js"; // Kết nối MongoDB
import userRoutes from "./routes/users.js";
import authRouter from './routes/auth.js';
import categoryRoutes from "./routes/categories.js";
import restaurantRoutes from "./routes/restaurants.js";
import foodRoutes from "./routes/foods.js";
import cartRoutes from "./routes/cart.js";

dotenv.config();

const app = express();

// ✅ Xử lý đường dẫn (ESM không có __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Cấu hình view EJS (nếu bạn vẫn dùng)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ✅ Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/api/users", userRoutes);
app.use('/api/auth', authRouter);
app.use("/api/categories", categoryRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/cart", cartRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Server đang chạy và MongoDB đã kết nối!");
});

// ✅ Bắt lỗi 404
app.use((req, res, next) => {
  next(createError(404));
});

// ✅ Xử lý lỗi tổng
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
