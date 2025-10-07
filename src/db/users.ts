import mongoose, { Schema } from 'mongoose';

export enum AuthType {
  GITHUB = 'github',
  GOOGLE = 'google',
  EMAIL = 'email',
}

// 定义用户表 Schema
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  auth_type: { type: String, required: true },
  third_party_id: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

console.log("here in users");

// 创建用户表模型
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;