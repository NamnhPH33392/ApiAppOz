import Cart from "../models/Cart.js";
import Food from "../models/Food.js";

// Lấy giỏ hàng của user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.foodId", "name price image");
    if (!cart) return res.status(200).json({ items: [], totalPrice: 0 });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Thêm món vào giỏ
export const addToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: "Món ăn không tồn tại" });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(item => item.foodId.toString() === foodId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity, price: food.price });
    }

    // Tính tổng tiền
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({ message: "Thêm vào giỏ thành công", cart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật số lượng món trong giỏ
export const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Giỏ hàng trống" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Món không tồn tại trong giỏ" });

    item.quantity = quantity;

    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({ message: "Cập nhật thành công", cart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa món khỏi giỏ
export const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Giỏ hàng trống" });

    // Cách 1: dùng pull()
    // cart.items.pull({ _id: itemId });

    // Cách 2: dùng filter() (an toàn hơn)
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    // Tính lại tổng tiền
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Xóa món thành công", cart });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: "Đã xóa toàn bộ giỏ hàng" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
