import db from '../config/db.js';

const createOrder = async (order, orderItems) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [orderResult] = await connection.execute(
            'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
            [order.user_id, order.total_amount]
        );

        const orderId = orderResult.insertId;

        const itemsPromises = orderItems.map(item => {
            return connection.execute(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        });

        await Promise.all(itemsPromises);

        await connection.commit();

        return { id: orderId, ...order };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const findOrderById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0];
};

const updateOrderStatus = async (id, status) => {
    await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return findOrderById(id);
};

const findAllOrders = async () => {
    const [rows] = await db.execute('SELECT * FROM orders');
    return rows;
};


export default {
    createOrder,
    findOrderById,
    updateOrderStatus,
    findAllOrders
};
