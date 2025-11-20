import orderModel from '../models/orderModel.js';

const addOrderItems = async (req, res) => {
  const { orderItems, totalAmount } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = {
      user_id: req.user.id,
      total_amount: totalAmount,
    };

    try {
      const createdOrder = await orderModel.createOrder(order, orderItems);
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findOrderById(req.params.id);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await orderModel.findOrderById(req.params.id);

        if (order) {
            const updatedOrder = await orderModel.updateOrderStatus(req.params.id, 'delivered');
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.findAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  getOrders
};
