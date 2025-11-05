import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD", "Momo", "ZaloPay", "Stripe"], default: "COD" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "delivering", "done", "canceled"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
