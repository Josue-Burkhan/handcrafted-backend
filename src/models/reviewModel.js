import db from '../config/db.js';

const Review = {
  create: async (review) => {
    const [result] = await db.execute(
      'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [review.product_id, review.user_id, review.rating, review.comment]
    );
    return result.insertId;
  },
  findByProductId: async (productId) => {
    const [rows] = await db.execute('SELECT * FROM reviews WHERE product_id = ?', [productId]);
    return rows;
  }
};

export default Review;
