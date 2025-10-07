import mongoose, { Schema } from 'mongoose';


// 定义阅读统计表 Schema
const analyticsSchema: Schema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  views: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// 创建索引
analyticsSchema.index({ post_id: 1 });

// 创建阅读统计表模型
const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

export default Analytics;