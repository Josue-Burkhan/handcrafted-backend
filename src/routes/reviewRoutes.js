import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(protect, reviewController.createProductReview).get(reviewController.getProductReviews);

export default router;
