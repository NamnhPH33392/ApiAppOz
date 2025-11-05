import Restaurant from "../models/Restaurant.js";

// Lấy tất cả nhà hàng
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy nhà hàng theo ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Không tìm thấy nhà hàng" });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Thêm nhà hàng
export const createRestaurant = async (req, res) => {
  try {
    const { name, address, image, openTime, closeTime } = req.body;
    const newRestaurant = new Restaurant({ name, address, image, openTime, closeTime });
    await newRestaurant.save();
    res.status(201).json({ message: "Tạo nhà hàng thành công", restaurant: newRestaurant });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật nhà hàng
export const updateRestaurant = async (req, res) => {
  try {
    const { name, address, image, openTime, closeTime } = req.body;
    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, address, image, openTime, closeTime },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy nhà hàng" });

    res.status(200).json({ message: "Cập nhật thành công", restaurant: updated });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa nhà hàng
export const deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Không tìm thấy nhà hàng" });

    res.status(200).json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
