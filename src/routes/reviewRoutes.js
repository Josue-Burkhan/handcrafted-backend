import express from 'express';
import * as reviewController from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, reviewController.createReview);
router.get('/product/:productId', reviewController.getProductReviews);

export default router;
