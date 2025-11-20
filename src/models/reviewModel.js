import db from '../config/db.js';

const Review = {
  create: (review) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO reviews SET ?', review, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },
  findByProductId: (productId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM reviews WHERE product_id = ?', [productId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

export default Review;
