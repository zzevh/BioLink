import bcrypt from 'bcryptjs';
import User from '../../../models/User'; // Mongoose User model
import dbConnect from '../../../utils/dbConnect'; // DB connection helper

export default async function handler(req, res) {
  await dbConnect();
  const { nickname, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ nickname });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create new user
  const newUser = new User({ nickname, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User created successfully!' });
}
