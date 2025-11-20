import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findByEmail(email);

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const userId = await User.create({ username, email, password, role });
    const newUser = await User.findById(userId);

    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser.id),
      });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (user && (await User.matchPassword(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
    // req.user is set by the 'protect' middleware
    const user = req.user;
    if(user){
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    }else{
        res.status(404).json({ message: 'User not found' });
    }
};

export default { registerUser, authUser, getUserProfile };
