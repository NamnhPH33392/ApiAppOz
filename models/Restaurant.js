import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, default: "" },
    openTime: { type: String, default: "08:00" },  // giờ mở cửa
    closeTime: { type: String, default: "22:00" }, // giờ đóng cửa
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
