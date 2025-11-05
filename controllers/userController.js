import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

// Đăng ký
export const register = async (req, res) => {
  try {
    const { fullname, email, passwd, phone, address, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(passwd, 10);

    const newUser = new User({
      fullname,
      email,
      passwd: hashedPassword,
      phone,
      address,
      avatar,
    });

    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, passwd } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(passwd, user.passwd);
    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;
    await user.save();

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy tất cả user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passwd");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy user theo ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwd");
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật user
export const updateUser = async (req, res) => {
  try {
    const { fullname, phone, address, avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullname, phone, address, avatar },
      { new: true }
    ).select("-passwd");

    if (!updatedUser)
      return res.status(404).json({ message: "Không tìm thấy user" });

    res.status(200).json({ message: "Cập nhật thành công", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy user" });

    res.status(200).json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
