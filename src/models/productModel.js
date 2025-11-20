import db from '../config/db.js';

const Product = {
  create: (product) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO products SET ?', product, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      });
    });
  },
  update: (id, product) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE products SET ? WHERE id = ?', [product, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      });
    });
  },
};

export default Product;
