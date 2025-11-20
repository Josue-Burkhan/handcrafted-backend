import express from 'express';
import orderController from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, orderController.addOrderItems).get(protect, admin, orderController.getOrders);
router.route('/:id').get(protect, orderController.getOrderById).put(protect, admin, orderController.updateOrderToDelivered);

export default router;
