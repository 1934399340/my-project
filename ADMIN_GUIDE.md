# CreatorHub 后台管理系统使用指南

## 1. 系统概述

CreatorHub 后台管理系统是一个功能完整的内容管理平台，用于管理 CreatorHub 个人网站的所有内容，包括文章、作品集和页面设置。系统采用现代化的设计风格，支持响应式布局，提供了直观的用户界面和完整的内容管理功能。

## 2. 功能特性

### 2.1 核心功能

- **文章管理**：创建、编辑、删除和发布文章
- **作品集管理**：管理视频、摄影和品牌案例等作品
- **页面管理**：管理网站的各个页面内容
- **数据同步**：后台修改自动同步到前端
- **用户友好界面**：现代化的设计和直观的操作流程

### 2.2 技术架构

- **前端**：HTML5 + CSS3 + Vanilla JavaScript
- **后端**：Cloudflare Workers API
- **数据库**：Supabase
- **部署**：支持 Cloudflare Pages、Netlify、Vercel 等静态托管服务

## 3. 快速开始

### 3.1 本地运行

1. 下载或克隆项目到本地
2. 直接在浏览器中打开 `admin/index.html`
3. 或使用本地服务器（如 VS Code Live Server）

### 3.2 部署

1. 将项目部署到静态托管服务（如 Cloudflare Pages、Netlify、Vercel 等）
2. 配置 API 函数（根据托管服务的要求）
3. 配置数据库连接（Supabase）

## 4. 系统使用

### 4.1 内容管理

#### 4.1.1 文章管理

1. **创建文章**：点击"新建内容"按钮，选择"文章"类型，填写标题、分类、内容等信息
2. **编辑文章**：在文章列表中点击"编辑"按钮，修改文章内容
3. **删除文章**：在文章列表中点击"删除"按钮，确认后删除文章
4. **发布状态**：通过"立即发布"选项控制文章的发布状态

#### 4.1.2 作品集管理

1. **创建作品**：点击"新建内容"按钮，选择"作品"类型，填写标题、分类、描述等信息
2. **编辑作品**：在作品列表中点击"编辑"按钮，修改作品内容
3. **删除作品**：在作品列表中点击"删除"按钮，确认后删除作品

#### 4.1.3 页面管理

1. **编辑页面**：在页面列表中点击"编辑"按钮，修改页面内容
2. **删除页面**：在页面列表中点击"删除"按钮，确认后删除页面

### 4.2 数据同步

- 后台修改的内容会自动同步到前端
- 前端页面会从 API 获取最新数据
- 无需手动刷新前端页面

## 5. API 文档

### 5.1 文章 API (`/api/articles`)

- **GET**：获取文章列表或单篇文章
  - 参数：`id`（可选，文章ID）、`category`（可选，分类）、`published`（可选，发布状态）
  - 响应：`{ success: true, articles: [...] }` 或 `{ success: true, article: {...} }`

- **POST**：创建文章
  - 数据：`{ category, title, content, excerpt, cover_url, read_time, published, published_at }`
  - 响应：`{ success: true, message: '文章创建成功', id: '...' }`

- **PUT**：更新文章
  - 参数：`id`（文章ID）
  - 数据：`{ category, title, content, excerpt, cover_url, read_time, published, published_at }`
  - 响应：`{ success: true, message: '文章更新成功' }`

- **DELETE**：删除文章
  - 参数：`id`（文章ID）
  - 响应：`{ success: true, message: '文章删除成功' }`

### 5.2 作品集 API (`/api/works`)

- **GET**：获取作品集列表或单个作品
  - 参数：`id`（可选，作品ID）、`category`（可选，分类）、`featured`（可选，是否精选）
  - 响应：`{ success: true, works: [...] }` 或 `{ success: true, work: {...} }`

- **POST**：创建作品
  - 数据：`{ title, description, category, cover_url, client, year, featured, media_ids }`
  - 响应：`{ success: true, message: '作品创建成功', id: '...' }`

- **PUT**：更新作品
  - 参数：`id`（作品ID）
  - 数据：`{ title, description, category, cover_url, client, year, featured, media_ids }`
  - 响应：`{ success: true, message: '作品更新成功' }`

- **DELETE**：删除作品
  - 参数：`id`（作品ID）
  - 响应：`{ success: true, message: '作品删除成功' }`

### 5.3 内容 API (`/api/content`)

- **GET**：获取页面内容
  - 参数：`page`（页面标识）
  - 响应：`{ success: true, content: {...} }`

- **PUT**：更新页面内容
  - 参数：`page`（页面标识）
  - 数据：`{ title, description, content, ... }`
  - 响应：`{ success: true, message: '内容已更新' }`

## 6. 数据库结构

### 6.1 文章表 (`posts`)

| 字段名 | 类型 | 描述 |
|-------|------|------|
| id | UUID | 文章ID |
| title | TEXT | 文章标题 |
| category | TEXT | 文章分类 |
| excerpt | TEXT | 文章摘要 |
| content | TEXT | 文章内容 |
| cover_url | TEXT | 封面图片URL |
| read_time | INTEGER | 阅读时间（分钟） |
| views | INTEGER | 浏览量 |
| likes | INTEGER | 点赞数 |
| published | BOOLEAN | 发布状态 |
| published_at | TIMESTAMP | 发布时间 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 6.2 作品集表 (`portfolio`)

| 字段名 | 类型 | 描述 |
|-------|------|------|
| id | UUID | 作品ID |
| title | TEXT | 作品标题 |
| description | TEXT | 作品描述 |
| category | TEXT | 作品分类 |
| cover_url | TEXT | 封面图片URL |
| client | TEXT | 客户名称 |
| year | TEXT | 创作年份 |
| views | INTEGER | 浏览量 |
| likes | INTEGER | 点赞数 |
| featured | BOOLEAN | 是否精选 |
| media_ids | UUID[] | 媒体文件ID数组 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 6.3 网站设置表 (`settings`)

| 字段名 | 类型 | 描述 |
|-------|------|------|
| id | TEXT | 设置ID |
| site_title | TEXT | 网站标题 |
| site_description | TEXT | 网站描述 |
| avatar_url | TEXT | 头像URL |
| email | TEXT | 邮箱 |
| wechat | TEXT | 微信 |
| address | TEXT | 地址 |
| social | JSONB | 社交媒体链接 |
| updated_at | TIMESTAMP | 更新时间 |

## 7. 常见问题

### 7.1 内容不显示

- 检查 API 连接是否正常
- 检查数据库是否正确配置
- 检查内容是否已发布

### 7.2 无法保存内容

- 检查网络连接
- 检查表单填写是否完整
- 检查 API 权限设置

### 7.3 前端不更新

- 刷新浏览器缓存
- 检查 API 响应是否正确
- 检查前端代码是否正确调用 API

## 8. 维护与更新

### 8.1 系统更新

- 定期备份数据库
- 定期更新依赖包
- 定期检查 API 性能

### 8.2 安全维护

- 定期更改密码
- 限制 API 访问权限
- 检查并修复安全漏洞

## 9. 扩展功能

### 9.1 媒体库

- 实现媒体文件上传和管理
- 支持图片、视频等多种媒体类型
- 提供媒体文件预览功能

### 9.2 用户管理

- 实现多用户系统
- 支持不同权限级别
- 提供用户登录和注册功能

### 9.3 数据分析

- 实现访问统计分析
- 提供内容表现报告
- 支持数据导出功能

## 10. 技术支持

如果您在使用过程中遇到问题，请参考以下资源：

- **文档**：本指南和项目中的其他文档
- **代码注释**：查看代码中的注释以了解实现细节
- **社区**：寻求相关技术社区的帮助

---

**CreatorHub 后台管理系统** - 为创作者提供便捷的内容管理解决方案
