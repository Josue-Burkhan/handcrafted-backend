import Review from '../models/reviewModel.js';

export const createReview = async (req, res) => {
  try {
    const reviewId = await Review.create({ ...req.body, user_id: req.user.id });
    res.status(201).json({ id: reviewId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.findByProductId(req.params.productId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
