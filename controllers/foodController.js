import Food from "../models/Food.js";

// Lấy tất cả món ăn (có thể filter theo categoryId hoặc restaurantId)
export const getAllFoods = async (req, res) => {
  try {
    const { categoryId, restaurantId } = req.query;
    let filter = {};
    if (categoryId) filter.categoryId = categoryId;
    if (restaurantId) filter.restaurantId = restaurantId;

    const foods = await Food.find(filter)
      .populate("categoryId", "name")
      .populate("restaurantId", "name address");

    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy món ăn theo ID
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate("categoryId", "name")
      .populate("restaurantId", "name address");
    if (!food) return res.status(404).json({ message: "Không tìm thấy món ăn" });

    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Thêm món ăn (admin)
export const createFood = async (req, res) => {
  try {
    const { name, description, price, image, categoryId, restaurantId, discount, status } = req.body;

    const newFood = new Food({
      name,
      description,
      price,
      image,
      categoryId,
      restaurantId,
      discount: discount || 0,
      status: status || "available",
    });

    await newFood.save();
    res.status(201).json({ message: "Thêm món ăn thành công", food: newFood });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật món ăn (admin)
export const updateFood = async (req, res) => {
  try {
    const { name, description, price, image, categoryId, restaurantId, discount, status } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, categoryId, restaurantId, discount, status },
      { new: true }
    );

    if (!updatedFood) return res.status(404).json({ message: "Không tìm thấy món ăn" });

    res.status(200).json({ message: "Cập nhật thành công", food: updatedFood });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa món ăn (admin)
export const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: "Không tìm thấy món ăn" });

    res.status(200).json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
