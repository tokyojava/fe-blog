# 🗄 数据库设计文档（DB）

## 一、数据库概述

**数据库类型：** MongoDB  
**设计原则：**  
- 数据库设计遵循文档型数据库的特点，尽量减少关联查询，使用嵌套结构存储相关数据。
- 数据字段命名遵循小写加下划线的命名规则。

---

## 二、数据表设计

### 1️⃣ 用户表（`users`）

| 字段名          | 类型         | 描述                     |
| ------------- | ---------- | ---------------------- |
| `_id`         | ObjectId   | 用户唯一标识（MongoDB 自动生成） |
| `email`    | String     | 邮件登录                   |      
| `password`    | String     | 邮件登录密码                |      
| `username`    | String     | 用户在第三方平台的用户名或者邮件登录时候的登录名                   |           |
| `auth_type`   | String     | 登录方式（如 github或者email） |
| `third_party_id`   | String     | 第三方登录的ID，如在Github的ID |
| `created_at`  | Date       | 用户创建时间               |
| `updated_at`  | Date       | 用户信息更新时间             |

---

### 2️⃣ 文章表（`posts`）

| 字段名          | 类型         | 描述                     |
| ------------- | ---------- | ---------------------- |
| `_id`         | ObjectId   | 文章唯一标识（MongoDB 自动生成） |
| `title`       | String     | 文章标题                 |
| `content`     | [String]     | 文章内容（Markdown 格式）, 前端可能创建多个Markdown块，所以用数组   |
| `summary`     | String     | AI 生成的文章摘要            |
| `tags`        | [String]   | 文章标签（AI 生成或用户设置）    |               |
| `type`        | String     | 文章类型（`blog` 或 `diary`） |
| `author_id`   | ObjectId   | 作者 ID（关联 `users` 表）   |
| `is_public`   | Boolean    | 是否公开（`true` 为公开，`false` 为私密） |
| `created_at`  | Date       | 文章创建时间               |
| `updated_at`  | Date       | 文章更新时间               |

---

### 3️⃣ 阅读统计表（`analytics`）

| 字段名          | 类型         | 描述                     |
| ------------- | ---------- | ---------------------- |
| `_id`         | ObjectId   | 统计记录唯一标识（MongoDB 自动生成） |
| `post_id`     | ObjectId   | 文章 ID（关联 `posts` 表）     |
| `views`       | Number     | 文章阅读次数               |
| `created_at`  | Date       | 统计记录创建时间             |
| `updated_at`  | Date       | 统计记录更新时间             |          |

---

## 三、字段说明

1. **用户表（`users`）**
   - `auth_type` 字段用于区分用户的登录方式，例如 `github`或者`email` 等。

2. **文章表（`posts`）**
   - `summary` 和 `tags` 字段由 AI 自动生成，用户可手动修改。
   - `type` 字段区分文章类型，`blog` 为公开博客，`diary` 为私密日记。

3. **阅读统计表（`analytics`）**
   - 每篇文章的阅读次数单独存储，便于后续扩展统计功能。

---

## 四、索引设计

1. **文章表**
   - 在 `author_id` 字段上创建索引，便于查询某用户的所有文章。
   - 在 `tags`字段上创建索引，便于搜索和分类。

2. **阅读统计表**
   - 在 `post_id` 字段上创建索引，便于快速查询文章的阅读统计。

---

## 五、数据关系

- **用户表（`users`）** 与 **文章表（`posts`）**：一对多关系。
- **文章表（`posts`）** 与 **阅读统计表（`analytics`）**：一对一关系。
