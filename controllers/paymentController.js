import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

// Tạo payment cho order
export const createPayment = async (req, res) => {
  try {
    const { orderId, method, transactionId } = req.body;
    const userId = req.user.id;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại" });

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ message: "Bạn không thể thanh toán đơn hàng này" });
    }

    let status = "pending";
    if (method === "cod") status = "success"; // COD tự động thành công

    const payment = new Payment({
      orderId,
      userId,
      method,
      amount: order.totalPrice,
      status,
      transactionId: transactionId || null,
    });

    await payment.save();

    // Nếu thanh toán COD hoặc online success → cập nhật trạng thái order
    if (status === "success") {
      order.status = "confirmed";
      await order.save();
    }

    res.status(201).json({ message: "Tạo payment thành công", payment });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy tất cả payment của user
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).populate("orderId");
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Admin: lấy tất cả payment
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("orderId").populate("userId", "fullname email");
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Cập nhật trạng thái payment (chỉ admin)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body; // success | failed
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!payment) return res.status(404).json({ message: "Không tìm thấy payment" });

    // Nếu payment thành công → cập nhật trạng thái order
    if (status === "success") {
      const order = await Order.findById(payment.orderId);
      if (order) {
        order.status = "confirmed";
        await order.save();
      }
    }

    res.status(200).json({ message: "Cập nhật trạng thái payment thành công", payment });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
