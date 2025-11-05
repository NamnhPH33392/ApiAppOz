import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // lưu giá tại thời điểm order
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "delivered", "cancelled"], default: "pending" },
    paymentMethod: { type: String, enum: ["cod", "online"], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
