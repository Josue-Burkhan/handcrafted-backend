import express from 'express';
import productController from '../controllers/productController.js';
import { protect, seller, admin } from '../middleware/authMiddleware.js';
import reviewRoutes from './reviewRoutes.js';

const router = express.Router();

// Nested route for reviews
router.use('/:id/reviews', reviewRoutes);

router.route('/').get(productController.getProducts).post(protect, seller, productController.createProduct);
router.route('/:id').get(productController.getProductById).put(protect, seller, productController.updateProduct).delete(protect, seller, productController.deleteProduct);

export default router;
