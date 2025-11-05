import Review from "../models/Review.js";

// Thêm review
export const addReview = async (req, res) => {
  try {
    const { foodId, restaurantId, rating, comment } = req.body;

    const newReview = new Review({
      userId: req.user.id,
      foodId,
      restaurantId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Đã thêm đánh giá", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy review theo món ăn
export const getReviewsByFood = async (req, res) => {
  try {
    const reviews = await Review.find({ foodId: req.params.foodId })
      .populate("userId", "fullname avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Lấy review theo nhà hàng
export const getReviewsByRestaurant = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId })
      .populate("userId", "fullname avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
