import mongoose, { Schema } from 'mongoose';


// 定义文章表 Schema
const postSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: [String], required: true },
  summary: { type: String },
  tags: { type: [String] },
  type: { type: String, enum: ['blog', 'diary'], required: true },
  author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  is_public: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// 创建索引
postSchema.index({ author_id: 1 });
postSchema.index({ tags: 1 });

// 创建文章表模型
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;