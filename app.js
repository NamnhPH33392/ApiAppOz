import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";
import "./models/db.js"; // Kết nối MongoDB

const app = express();

// Cấu hình view (nếu bạn vẫn muốn giữ EJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Tạm thời comment các router cũ để không lỗi
// import indexRouter from './routes/index.js';
// import usersRouter from './routes/users.js';
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server đang chạy và MongoDB đã kết nối!");
});

// Bắt lỗi 404
app.use((req, res, next) => {
  next(createError(404));
});

// Xử lý lỗi tổng
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
