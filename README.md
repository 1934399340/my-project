## CreatorHub - 自媒体个人网站

## 项目简介

CreatorHub 是一个面向自媒体创作者的个人网站模板，展示了作品集、文案研究、剪辑技巧、摄影等多个内容板块。网站采用现代化的设计风格，支持响应式布局，适合创作者展示个人品牌和作品。

## 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 语义化标签 |
| CSS3 | 样式设计，使用 CSS Variables 管理主题 |
| Vanilla JavaScript | 原生 JS，无框架依赖 |
| Google Fonts | Inter + Noto Sans SC 字体 |
| Unsplash | 图片素材来源 |

## 文件结构

```
creator-hub/
├── index.html              # 首页
├── portfolio.html          # 作品集
├── copywriting.html       # 文案研究
├── editing.html           # 剪辑技巧
├── photography.html       # 摄影
├── about.html             # 关于我
├── contact.html           # 联系
├── css/
│   ├── style.css          # 公共样式
│   └── page.css           # 页面专属样式
└── js/
    ├── main.js             # 公共脚本
    ├── portfolio.js       # 作品集脚本
    └── contact.js          # 联系页脚本
```

## 页面说明

### 首页 (index.html)
- Hero 区域：个人介绍、数据统计、CTA 按钮
- 精选作品：4 个作品卡片展示
- 服务项目：4 项创作服务介绍
- 最新分享：3 篇最新文章
- 合作咨询区块

### 作品集 (portfolio.html)
- 分类筛选：全部 / 视频创作 / 摄影作品 / 品牌案例
- 作品网格：8 个作品展示
- 加载更多功能
- 数据统计区块

### 文案研究 (copywriting.html)
- 侧边栏：分类导航 + 热门标签
- 文章列表：4 篇文章卡片
- 分页导航

### 剪辑技巧 (editing.html)
- 教程卡片：4 个教程视频展示
- 资源推荐：背景音乐、LUT 预设、转场特效
- 软件推荐列表

### 摄影 (photography.html)
- 图片画廊：瀑布流布局，支持分类筛选
- 拍摄技巧：4 个技巧卡片
- 设备展示：相机、镜头、稳定器

### 关于我 (about.html)
- 个人介绍：头像、简介、社交链接
- 成长时间线
- 技能展示：进度条形式
- 合作客户展示

### 联系 (contact.html)
- 联系方式：邮箱、微信、地址
- 社交媒体：粉丝数据展示
- 联系表单：姓名、邮箱、主题、内容
- FAQ 常见问题

## 功能特性

### 已实现
- 响应式设计（桌面 / 平板 / 手机）
- 移动端汉堡菜单
- 滚动时导航栏样式变化
- 作品/图片分类筛选
- FAQ 手风琴交互
- 联系表单验证
- 懒加载动画效果
- 平滑滚动导航
- 图片悬停效果

### 可扩展功能
- [ ] 暗色/亮色模式切换
- [ ] 搜索功能
- [ ] 博客系统
- [ ] 作品详情弹窗
- [ ] 邮件订阅功能
- [ ] 访问统计分析
- [ ] 后端 API 对接

## 使用指南

### 本地运行
1. 下载或克隆项目
2. 直接在浏览器打开 `index.html`
3. 或使用本地服务器（如 VS Code Live Server）

### 修改内容
1. **个人信息**：编辑各 HTML 文件中的文本内容
2. **图片**：替换 `https://images.unsplash.com/` 链接为本地图片
3. **颜色主题**：修改 `css/style.css` 中的 `:root` 变量
4. **社交链接**：修改页脚和各页面中的社交媒体链接

### 部署
支持任意静态文件托管服务：
- GitHub Pages
- Vercel
- Netlify
- 阿里云 OSS
- 腾讯云 COS

## 注意事项

1. **图片优化**：生产环境请使用 WebP 格式并压缩图片
2. **版权声明**：Unsplash 图片仅供演示，请替换为原创内容
3. **表单处理**：当前表单仅做演示，需接入后端服务（如 Formspree）
4. **SEO**：建议添加 sitemap.xml 和 robots.txt
5. **性能**：可考虑添加图片懒加载和 CDN 加速

## 浏览器兼容性

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## License

MIT License - 可自由使用于个人和商业项目
