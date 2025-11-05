import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
