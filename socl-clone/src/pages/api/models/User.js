import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
