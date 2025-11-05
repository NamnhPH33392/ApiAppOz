import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Tạo đơn hàng từ giỏ hàng
export const createOrder = async (req, res) => {
  try {
    const { paymentMethod, address, phone } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Giỏ hàng trống" });

    const order = new Order({
      userId,
      items: cart.items.map(item => ({
        foodId: item.foodId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cart.totalPrice,
      paymentMethod,
      address,
      phone,
    });

    await order.save();
    await Cart.findOneAndDelete({ userId }); // Xóa giỏ hàng sau khi đặt

    res.status(201).json({ message: "Đặt hàng thành công", order });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy tất cả đơn hàng của user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.foodId", "name price image");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy chi tiết đơn hàng
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.foodId", "name price image");
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật trạng thái đơn hàng (dành cho admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // pending | confirmed | delivered | cancelled
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.status(200).json({ message: "Cập nhật trạng thái thành công", order });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
