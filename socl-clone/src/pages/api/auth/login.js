import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();
  const { nickname, password } = req.body;

  // Find user
  const user = await User.findOne({ nickname });
  if (!user) return res.status(400).json({ error: 'User not found' });

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return res.status(400).json({ error: 'Invalid credentials' });

  // Create token
  const token = jwt.sign({ nickname: user.nickname }, 'secret', { expiresIn: '1h' });

  res.status(200).json({ token });
}
