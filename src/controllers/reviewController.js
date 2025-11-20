import Review from '../models/reviewModel.js';

const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id;

  try {
      const review = {
          product_id: productId,
          user_id: req.user.id, // from protect middleware
          rating,
          comment
      };

      const reviewId = await Review.create(review);
      res.status(201).json({ id: reviewId, ...review });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductReviews = async (req, res) => {
    const productId = req.params.id;
    try {
        const reviews = await Review.findByProductId(productId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { createProductReview, getProductReviews };
