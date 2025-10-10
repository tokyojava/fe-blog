import { serverError } from '@/lib/server_utils';
import { CreateOrUpdateBlogRequest } from '@/types/blog';
import mongoose, { Schema } from 'mongoose';
import { ensureUserModelRegistration, type IUser } from './users';

export interface IBlog extends Document {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  type: 'blog' | 'diary';
  category: string[];
  author: mongoose.Types.ObjectId;
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
  category: { type: [String], required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// 创建索引
blogSchema.index({ author_id: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });

// 创建文章表模型
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export async function createBlog(req: CreateOrUpdateBlogRequest & { author: string }) {
  const newBlog = new BlogModel({
    ...req,
    author: new mongoose.Types.ObjectId(req.author),
  });
  await newBlog.save();
  return newBlog;
}

export async function updateBlog(id: string, req: CreateOrUpdateBlogRequest) {
  const updatedBlog = await BlogModel.findByIdAndUpdate(
    id,
    {
      ...req,
      updated_at: new Date(),
    },
    { new: true }
  );
  return updatedBlog;
}


export type PopulatedBlog = IBlog & { author: IUser };

// As we will call populate below, we need to make sure User model is registered
ensureUserModelRegistration();
export async function getBlogById(id: string) {
  try {
    const blog = await BlogModel.findById(id).populate('author').lean<PopulatedBlog>();
    return JSON.parse(JSON.stringify(blog));
  } catch (e) {
    serverError(e);
    throw e;
  }
}

export interface GetBlogsOptions {
  author?: string;
  limit?: number;
  category?: string[];
  type?: IBlog['type'];
  pageSize?: number;
  page?: string;
}

export async function getBlogs(options: GetBlogsOptions = {}) {
  try {
    const query: any = buildQuery(options);

    const page = parseInt(options.page || "1");
    const pageSize = options.pageSize || 6;
    const skip = (page - 1) * pageSize;

    const blogs = await BlogModel.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate('author')
      .lean<PopulatedBlog[]>();

    const total = await BlogModel.countDocuments(query);

    return {
      blogs,
      pagination: {
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  } catch (e) {
    serverError(e);
    throw e;
  }
}

export async function getBlogsCount(options: GetBlogsOptions = {}) {
  try {
    const query: any = buildQuery(options);
    const count = await BlogModel.countDocuments(query);
    return count;
  } catch (e) {
    serverError(e);
    throw e;
  }
}

function buildQuery(options: GetBlogsOptions): any {
  const query: any = {};
  if (options.author) {
    query.author = options.author;
  }
  if (options.category && options.category.length > 0) {
    query.category = { $in: options.category };
  }
  if (options.type) {
    query.type = options.type;
  }
  return query;
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

export async function removeAllBlogs() {
  await BlogModel.deleteMany({});
}

export async function insertManyBlogs(blogs: Partial<IBlog>[]) {
  await BlogModel.insertMany(blogs);
}

export default BlogModel;