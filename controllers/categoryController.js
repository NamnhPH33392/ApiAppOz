import Category from "../models/Category.js";

//  Tạo mới Category
export const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Loại món ăn đã tồn tại" });
    }

    const newCategory = new Category({ name, description, image });
    await newCategory.save();

    res.status(201).json({ message: "Thêm loại món ăn thành công", category: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

//  Lấy tất cả Category
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

//  Lấy Category theo ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Không tìm thấy loại món ăn" });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

//  Cập nhật Category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, image },
      { new: true }
    );

    if (!updatedCategory)
      return res.status(404).json({ message: "Không tìm thấy loại món ăn" });

    res.status(200).json({ message: "Cập nhật thành công", category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

//  Xóa Category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy loại món ăn" });

    res.status(200).json({ message: "Xóa loại món ăn thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
