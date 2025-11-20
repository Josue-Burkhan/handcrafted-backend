import db from '../config/db.js';

const Product = {
  create: async (product) => {
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, category, stock, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [product.name, product.description, product.price, product.category, product.stock, product.user_id]
    );
    return result.insertId;
  },
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },
  update: async (id, product) => {
    const [result] = await db.execute('UPDATE products SET ? WHERE id = ?', [product, id]);
    return result.affectedRows;
  },
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

export default Product;
