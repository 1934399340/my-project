# Cloudflare Pages 迁移指南

## 迁移步骤

### 1. 创建 Cloudflare 账号
1. 访问 [https://pages.cloudflare.com](https://pages.cloudflare.com)
2. 用 GitHub 账号登录
3. 点击 "Create a project"

### 2. 连接 GitHub 仓库
1. 选择 "Connect to Git"
2. 选择你的 GitHub 仓库
3. 设置：
   - **Project name**: `creatorhub` (或你喜欢的名字)
   - **Production branch**: `main`
   - **Build command**: (留空)
   - **Build output directory**: `/`

### 3. 配置环境变量（如需要）
在 Cloudflare Pages → Settings → Environment variables 中添加：
```
SUPABASE_URL = https://twfihaxptmhvdnapfovc.supabase.co
SUPABASE_ANON_KEY = sb_publishable_IFWl0r0vz0m5Vr4_Gk5w-A_xG9lGTYj
```

### 4. 更新 Decap CMS 配置
将 `admin/config.yml` 改为 GitHub backend：

```yaml
backend:
  name: github
  repo: 你的GitHub用户名/仓库名
  branch: main
```

### 5. 部署
- Cloudflare Pages 会自动检测 GitHub 推送并部署
- 每次推送代码都会自动构建

---

## 自定义域名（可选）

### 绑定域名
1. 进入 Pages 项目 → Custom domains
2. 添加你的域名
3. 按照提示在 DNS 中添加记录

### 设置 AAAA 记录
```
Type: AAAA
Name: @
Value: 100:: (或 Cloudflare 提供的地址)
```

---

## 与 Netlify 的对比

| 功能 | Netlify | Cloudflare Pages |
|------|---------|------------------|
| 带宽 | 100GB/月 | 无限 ✅ |
| Serverless | Functions (125K/月) | Workers (10万/天) ✅ |
| CDN | 全球 | 全球 ✅ |
| 免费SSL | ✅ | ✅ |
| 部署预览 | ✅ | ✅ |
| 表单处理 | ✅ | ❌ (需用 Workers) |

---

## Workers 替代 Netlify Functions

如果你需要后端功能，可以使用 Cloudflare Workers。

### 创建发送邮件的 Worker

1. 安装 Wrangler CLI:
```bash
npm install -g wrangler
```

2. 创建 Worker:
```bash
wrangler generate send-email
cd send-email
```

3. 编辑 `src/index.js`:
```javascript
export default {
    async email(message) {
        // 发送邮件逻辑
        // 可以使用 Mailgun、SendGrid 等服务
    }
};
```

4. 部署:
```bash
wrangler deploy
```

---

## Supabase + Cloudflare Pages

Supabase 支持所有静态托管平台，因为它只需要前端 API 调用。

在 `admin/config.js` 中配置好 Supabase URL 和 Anon Key 后即可使用。

---

## 文件结构

```
your-project/
├── admin/
│   ├── index.html
│   ├── config.js          ← Supabase/Cloudinary 配置
│   ├── config.yml         ← Decap CMS GitHub backend 配置
│   ├── config.cloudflare.yml  ← Cloudflare 专用配置
│   └── services/
│       ├── supabase-client.js
│       └── cloudinary-client.js
├── content/
│   ├── settings/
│   ├── portfolio/
│   └── posts/
├── public/
│   ├── _routes.json
│   └── images/
├── netlify/               ← Netlify Functions (如果还有)
├── database/
│   └── supabase-schema.sql
├── config.json
├── netlify.toml          ← 可删除
└── SETUP_GUIDE.md
```

---

## 常见问题

### Q: Cloudflare Pages 支持 .htaccess 吗？
A: 不支持，但可以用 `_headers` 文件或 `_routes.json` 实现类似功能。

### Q: 如何配置 404 页面？
A: Cloudflare Pages 会自动处理 SPA 的路由重写。

### Q: Decap CMS 认证怎么配置？
A: Cloudflare Pages 不提供内置认证，但可以使用 Netlify Identity 的替代品：
- **Cloudflare Access** (付费)
- **Supabase Auth** (免费) ← 推荐

---

## 推荐：使用 Supabase Auth 替代 Netlify Identity

Supabase 提供完整的认证系统：

```javascript
// 在 admin/services/supabase-client.js 中使用
const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github', // 或 google, email 等
});
```

这样就不依赖 Netlify Identity 了！