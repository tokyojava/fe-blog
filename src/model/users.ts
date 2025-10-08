import { constraints, type CreateEmailUserRequest, type User } from '@/types/user';
import mongoose, { Schema } from 'mongoose';
import { hashPassword } from '@/lib/password';
import { AlreadyInUseError } from '@/lib/custom_errors';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  auth_type: string;
  third_party_id?: string;
  created_at: Date;
  updated_at: Date;
}

// 定义用户表 Schema
const userSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minLength: constraints.username.minLength,
    maxLength: constraints.username.maxLength,
  },
  email: {
    type: String,
    required: true,
    match: constraints.emailPattern, // 正则表达式验证邮箱格式
  },
  password: {
    type: String,
    required: true,
    minLength: constraints.password.minLength,
  },
  auth_type: { type: String, required: true },
  third_party_id: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

if (!mongoose.models.User) {
  userSchema.pre("save", function (next) {
    this.username = this.username + "@@" + this.auth_type;
    next();
  });

  userSchema.post(/^find/, function (docs) {
    if (!docs) {
      return;
    }
    if (!Array.isArray(docs)) {
      docs = [docs];
    }
    docs.forEach((doc: User) => {
      doc.username = doc.username.split('@@')[0];
    });
  });
}


// 创建用户表模型
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export async function createEmailPasswordUser(req: CreateEmailUserRequest) {
  // 检查是否已存在相同 email 的用户
  const existingUser = await UserModel.findOne({ email: req.email });
  if (existingUser) {
    throw new AlreadyInUseError();
  }

  const hashedPassword = await hashPassword(req.password);
  // 创建新用户
  const newUser = new UserModel({
    username: req.username,
    email: req.email,
    password: hashedPassword,
    auth_type: 'email',
    created_at: new Date(),
    updated_at: new Date(),
  });

  // 保存用户到数据库
  await newUser.save();
  return newUser;
}

export async function listTestUsers() {
  const users = await UserModel.find({
    username: { $regex: '^test-', $options: 'i' },
  });

  return users;
}

export async function removeTestUsers() {
  await UserModel.deleteMany({
    username: { $regex: '^test-', $options: 'i' },
  });
}

export default UserModel;