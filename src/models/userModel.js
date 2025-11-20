import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
  create: async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [user.username, user.email, hashedPassword, user.role || 'user']
    );
    return result.insertId;
  },
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await db.execute('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  matchPassword: async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }
};

export default User;
