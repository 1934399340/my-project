# Supabase + Cloudinary 集成设置指南

## 一、Supabase 数据库设置 (免费额度: 500MB)

### 1.1 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub 账号登录
4. 点击 "New project"
5. 填写项目信息:
   - Organization: 选择你的组织
   - Name: `creatorhub-db` (或你喜欢的名字)
   - Database Password: 设置强密码
   - Region: 选择靠近你的区域 (如 `Northeast Asia` for 日本/韩国)

### 1.2 获取 API 密钥

1. 进入项目后，点击左侧 "Settings" -> "API"
2. 找到以下信息:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public** key: `eyJhbGc...`
   - **service_role** key: `eyJhbGc...` (谨慎使用，仅用于后端)

### 1.3 创建数据库表

1. 点击左侧 "SQL Editor"
2. 点击 "New query"
3. 复制 `database/supabase-schema.sql` 的内容到编辑器
4. 点击 "Run" 执行

### 1.4 配置 Supabase 存储

1. 进入 "Storage" -> "New bucket"
2. 创建 bucket: `media`
3. 设置为 Public

---

## 二、Cloudinary 媒体存储 (免费额度: 25GB带宽/月)

### 2.1 创建 Cloudinary 账号

1. 访问 [https://cloudinary.com](https://cloudinary.com)
2. 点击 "Sign Up"
3. 使用 GitHub/Google 账号登录
4. 填写信息创建账户

### 2.2 获取 API 密钥

1. 登录后，点击右上角头像 -> "Dashboard"
2. 在 "Product Environment Credentials" 中找到:
   - **Cloud Name**: `your_cloud_name`
   - **API Key**: `123456789012345`
   - **API Secret**: `xxxxxx`

### 2.3 创建上传预设

1. 进入 "Settings" -> "Upload"
2. 滚动到 "Upload presets"
3. 点击 "Add upload preset"
4. 设置:
   - Folder: `media`
   - Signing Mode: `Unsigned` (方便前端直接上传)

---

## 三、配置你的项目

### 3.1 复制配置文件

```bash
cp config.example.json config.json
```

### 3.2 编辑 config.json

```json
{
  "supabaseUrl": "https://xxxxx.supabase.co",
  "supabaseAnonKey": "eyJhbGc...",
  "supabaseServiceKey": "eyJhbGc...",
  "cloudinaryCloudName": "your_cloud_name",
  "cloudinaryApiKey": "123456789012345",
  "cloudinaryApiSecret": "xxxxxx"
}
```

---

## 四、Netlify Functions 集成

创建一个 Netlify Function 来处理敏感操作:

### 4.1 创建 `netlify/functions/supabase-proxy.js`

```javascript
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

exports.handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: ''
        };
    }

    const { table, method, id, data } = JSON.parse(event.body);

    const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    return {
        statusCode: response.status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    };
};
```

### 4.2 设置环境变量

在 Netlify 的 "Site settings" -> "Build & deploy" -> "Environment variables" 中添加:

- `SUPABASE_URL`: 你的 Supabase URL
- `SUPABASE_SERVICE_KEY`: 你的 Supabase Service Role Key

---

## 五、功能说明

### 5.1 已实现的服务

| 服务 | 文件 | 功能 |
|------|------|------|
| SupabaseService | `admin/services/supabase-client.js` | 用户认证、数据库操作 |
| MediaService | `admin/services/supabase-client.js` | 媒体文件CRUD |
| PortfolioService | `admin/services/supabase-client.js` | 作品集CRUD |
| PostsService | `admin/services/supabase-client.js` | 文章CRUD |
| SettingsService | `admin/services/supabase-client.js` | 网站设置 |
| AnalyticsService | `admin/services/supabase-client.js` | 数据分析 |
| CloudinaryService | `admin/services/cloudinary-client.js` | 媒体上传/处理 |
| FileUploadComponent | `admin/services/cloudinary-client.js` | 上传组件UI |

### 5.2 迁移指南

从当前的 JSON 文件迁移到 Supabase:

1. 导出现有的 JSON 数据
2. 在 Supabase Dashboard 的 Table Editor 中手动导入
3. 或者创建一次性迁移脚本

---

## 六、免费额度总结

| 服务 | 免费额度 | 超出费用 |
|------|----------|----------|
| Supabase | 500MB 数据库, 50万月活 | 按使用量付费 |
| Cloudinary | 25GB 带宽/月 | $0.004/GB |
| Netlify | 100GB 带宽/月 | $0.05/GB |

---

## 七、常见问题

### Q: 是否需要信用卡?
A: Supabase 不需要，Cloudinary 不需要，Netlify 不需要。

### Q: 数据安全吗?
A: Supabase 有 Row Level Security (RLS)，可以精确控制谁可以读写什么数据。

### Q: 可以不用后端代码吗?
A: 可以！Supabase 和 Cloudinary 都可以从前端直接调用，配合 RLS 足够安全。

### Q: 迁移现有数据麻烦吗?
A: 不麻烦。可以导出 JSON 到 CSV，然后用 Supabase 的 Dashboard 导入，或写一个一次性脚本。
