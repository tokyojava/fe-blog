import { serverError } from '@/lib/server_utils';
import { CreateBlogRequest } from '@/types/blog';
import mongoose, { Schema } from 'mongoose';
import { ensureUserModelRegistration, type IUser } from './users';

export interface IBlog extends Document {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  type: 'blog' | 'diary';
  category: string;
  author: mongoose.Types.ObjectId;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

// 定义文章表 Schema
const blogSchema: Schema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String },
  tags: { type: [String] },
  type: { type: String, enum: ['blog', 'diary'], required: true },
  category: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  is_public: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// 创建索引
blogSchema.index({ author_id: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });

// 创建文章表模型
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export async function createBlog(req: CreateBlogRequest & { author: string }) {
  debugger;
  const newBlog = new BlogModel({
    title: req.title,
    content: req.content,
    tags: req.tags,
    summary: req.summary,
    category: req.category,
    type: req.type,
    author: new mongoose.Types.ObjectId(req.author),
  });
  await newBlog.save();
  return newBlog;
}

export type PopulatedBlog = IBlog & { author: IUser };

// As we will call populate below, we need to make sure User model is registered
ensureUserModelRegistration();
export async function getBlogById(id: string) {
  try {
    const blog = await BlogModel.findById(id).populate('author').lean<PopulatedBlog>();
    return blog;
  } catch (e) {
    serverError(e);
    throw e;
  }
}

export interface GetBlogsOptions {
  author?: string;
  limit?: number;
  beforeDate?: Date;
}

export async function getBlogs(options: GetBlogsOptions = {}) {
  try {
    const query: any = {};
    if (options.author) {
      query.author = options.author;
    }
    if (options.beforeDate) {
      query.created_at = { $lt: options.beforeDate };
    }

    const blogs = await BlogModel.find(query)
      .sort({ created_at: -1 })
      .limit(options.limit || 5)
      .populate('author')
      .lean<PopulatedBlog[]>();
    return blogs;
  } catch (e) {
    serverError(e);
    throw e;
  }
}

export async function deleteBlog(id: string) {
  try {
    const res = await BlogModel.deleteOne({ _id: id });
    return res.deletedCount === 1;
  } catch (e) {
    serverError(e);
    throw e;
  }
} 

export default BlogModel;