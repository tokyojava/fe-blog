import mongoose, { Schema } from 'mongoose';


// 定义阅读统计表 Schema
const analyticsSchema: Schema = new Schema({
  blog_id: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  views: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// 创建索引
analyticsSchema.index({ blog_id: 1 });

// 创建阅读统计表模型
const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

export default Analytics;