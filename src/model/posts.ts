import { constraints, CreatePostRequest } from '@/types/post';
import mongoose, { Schema } from 'mongoose';

// 定义文章表 Schema
const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: constraints.title.minLength,
    maxLength: constraints.title.maxLength,
  },
  content: {
    type: String,
    required: true,
    minLength: constraints.content.minLength,
    maxLength: constraints.content.maxLength,
  },
  // ai generated
  tags: { type: [String] },
  // ai generated
  summary: { type: String },
  category: { type: String, required: true },
  type: { type: String, enum: ['blog', 'diary'], required: true },
  author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// 创建索引
postSchema.index({ author_id: 1 });
postSchema.index({ category: 1 });
postSchema.index({ tags: 1 });

// 创建文章表模型
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export async function createPost(req: CreatePostRequest & { author_id: string }) {
  const newPost = new Post({
    title: req.title,
    content: req.content,
    tags: req.tags,
    summary: req.summary,
    category: req.category,
    type: req.type,
    author_id: new mongoose.Types.ObjectId(req.author_id),
  });
  await newPost.save();
  return newPost;
}

export default Post;