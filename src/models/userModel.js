import db from '../config/db.js';

const User = {
  create: (user) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    });
  },
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      });
    });
  },
};

export default User;
