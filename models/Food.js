import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    discount: { type: Number, default: 0 },
    status: { type: String, enum: ["available", "out-of-stock"], default: "available" },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
export default Food;
