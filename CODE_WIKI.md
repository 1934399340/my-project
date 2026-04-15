# CreatorHub 项目代码 Wiki

## 1. 项目概述

CreatorHub 是一个面向自媒体创作者的个人网站模板，展示了作品集、文案研究、剪辑技巧、摄影等多个内容板块。网站采用现代化的设计风格，支持响应式布局，适合创作者展示个人品牌和作品。

### 1.1 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 语义化标签 |
| CSS3 | 样式设计，使用 CSS Variables 管理主题 |
| Vanilla JavaScript | 原生 JS，无框架依赖 |
| Google Fonts | Inter + Noto Sans SC 字体 |
| Unsplash | 图片素材来源 |
| Supabase | 后端服务（可选） |

### 1.2 项目结构

```
CreatorHub/
├── index.html              # 首页
├── portfolio.html          # 作品集
├── copywriting.html       # 文案研究
├── editing.html           # 剪辑技巧
├── photography.html       # 摄影
├── about.html             # 关于我
├── contact.html           # 联系
├── css/
│   ├── style.css          # 公共样式
│   ├── page.css           # 页面专属样式
│   └── portfolio.css      # 作品集样式
├── js/
│   ├── main.js             # 公共脚本
│   ├── portfolio.js       # 作品集脚本
│   ├── contact.js          # 联系页脚本
│   ├── data-service.js     # 数据服务
│   ├── index.js            # 首页数据加载
│   └── cloudbase-service.js # 云服务
├── content/               # 内容数据（JSON）
├── admin/                 # 后台管理系统
├── functions/             # API函数
└── web_files/             # 网站文件
```

## 2. 核心模块

### 2.1 页面模块

#### 2.1.1 首页 (index.html)
- **功能**：网站入口，展示个人介绍、精选作品、服务项目和最新分享
- **主要组件**：
  - Hero 区域：个人介绍、数据统计、CTA 按钮
  - 精选作品：4 个作品卡片展示
  - 服务项目：4 项创作服务介绍
  - 最新分享：3 篇最新文章
  - 合作咨询区块

#### 2.1.2 作品集 (portfolio.html)
- **功能**：展示创作者的作品集合，支持分类筛选
- **主要组件**：
  - 分类筛选：全部 / 视频创作 / 摄影作品 / 品牌案例
  - 作品网格：8 个作品展示
  - 加载更多功能
  - 数据统计区块

#### 2.1.3 文案研究 (copywriting.html)
- **功能**：展示文案相关的文章和研究内容
- **主要组件**：
  - 侧边栏：分类导航 + 热门标签
  - 文章列表：4 篇文章卡片
  - 分页导航

#### 2.1.4 剪辑技巧 (editing.html)
- **功能**：分享视频剪辑相关的教程和资源
- **主要组件**：
  - 教程卡片：4 个教程视频展示
  - 资源推荐：背景音乐、LUT 预设、转场特效
  - 软件推荐列表

#### 2.1.5 摄影 (photography.html)
- **功能**：展示摄影作品和技巧
- **主要组件**：
  - 图片画廊：瀑布流布局，支持分类筛选
  - 拍摄技巧：4 个技巧卡片
  - 设备展示：相机、镜头、稳定器

#### 2.1.6 关于我 (about.html)
- **功能**：展示创作者的个人信息和成长经历
- **主要组件**：
  - 个人介绍：头像、简介、社交链接
  - 成长时间线
  - 技能展示：进度条形式
  - 合作客户展示

#### 2.1.7 联系 (contact.html)
- **功能**：提供联系方式和联系表单
- **主要组件**：
  - 联系方式：邮箱、微信、地址
  - 社交媒体：粉丝数据展示
  - 联系表单：姓名、邮箱、主题、内容
  - FAQ 常见问题

### 2.2 样式模块 (css/)

#### 2.2.1 公共样式 (style.css)
- **功能**：定义网站的全局样式和主题
- **主要特性**：
  - CSS Variables 管理主题颜色和尺寸
  - 响应式设计媒体查询
  - 动画效果和过渡
  - 组件样式（按钮、卡片、导航等）

#### 2.2.2 页面专属样式 (page.css)
- **功能**：为特定页面提供专属样式

#### 2.2.3 作品集样式 (portfolio.css)
- **功能**：为作品集页面提供专属样式

### 2.3 脚本模块 (js/)

#### 2.3.1 公共脚本 (main.js)
- **功能**：提供网站的核心交互功能
- **主要功能**：
  - 移动端汉堡菜单切换
  - FAQ 手风琴交互
  - 作品分类筛选
  - 滚动时导航栏样式变化
  - 元素懒加载动画
  - 平滑滚动导航

#### 2.3.2 作品集脚本 (portfolio.js)
- **功能**：为作品集页面提供交互功能
- **主要功能**：
  - 作品分类筛选
  - 加载更多功能

#### 2.3.3 联系页脚本 (contact.js)
- **功能**：为联系页面提供交互功能
- **主要功能**：
  - 联系表单验证
  - 表单提交处理

#### 2.3.4 数据服务 (data-service.js)
- **功能**：提供数据获取和处理功能
- **主要功能**：
  - 与后端服务交互
  - 数据格式化和处理

#### 2.3.5 首页数据加载 (index.js)
- **功能**：为首页加载动态数据

#### 2.3.6 云服务 (cloudbase-service.js)
- **功能**：与云服务（如腾讯云）交互

### 2.4 内容模块 (content/)

- **功能**：存储网站的内容数据
- **结构**：
  - portfolio/：作品集数据
  - posts/：文章数据
  - settings/：网站设置

### 2.5 后台管理模块 (admin/)

- **功能**：提供网站内容管理功能
- **主要组件**：
  - 登录页面
  - 内容管理页面
  - 用户管理页面
  - 系统设置页面

### 2.6 API 函数模块 (functions/)

- **功能**：提供后端API功能
- **主要功能**：
  - 账户管理
  - 文章管理
  - 内容管理
  - 登录验证
  - 邮件发送
  - 消息管理

## 3. 关键功能实现

### 3.1 响应式设计

- **实现方式**：使用 CSS 媒体查询和弹性布局
- **断点**：
  - 1024px：平板设备
  - 768px：移动设备
- **关键代码**：
  ```css
  @media (max-width: 1024px) {
      /* 平板设备样式 */
  }
  
  @media (max-width: 768px) {
      /* 移动设备样式 */
  }
  ```

### 3.2 移动端汉堡菜单

- **实现方式**：使用 JavaScript 切换菜单状态
- **关键代码**：
  ```javascript
  navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
  });
  ```

### 3.3 作品分类筛选

- **实现方式**：使用 JavaScript 处理筛选按钮点击事件
- **关键代码**：
  ```javascript
  filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const parent = this.closest('.gallery-filters, .filter-tabs');
          parent.querySelectorAll('.filter-btn, .filter-tab').forEach(b => b.classList.remove('active'));
          this.classList.add('active');
      });
  });
  ```

### 3.4 懒加载动画效果

- **实现方式**：使用 Intersection Observer API
- **关键代码**：
  ```javascript
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1 });
  ```

### 3.5 平滑滚动导航

- **实现方式**：使用 JavaScript 处理锚点点击事件
- **关键代码**：
  ```javascript
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });
  ```

## 4. 依赖关系

### 4.1 前端依赖

| 依赖 | 版本 | 用途 | 来源 |
|------|------|------|------|
| Supabase SDK | 2.39.0 | 后端服务交互 | CDN |
| Google Fonts | - | 字体资源 | 外部链接 |
| Unsplash | - | 图片素材 | 外部链接 |

### 4.2 后端依赖

| 依赖 | 版本 | 用途 | 来源 |
|------|------|------|------|
| nodemailer | ^6.9.8 | 邮件发送 | package.json |

## 5. 项目运行方式

### 5.1 本地运行

1. 下载或克隆项目
2. 直接在浏览器打开 `index.html`
3. 或使用本地服务器（如 VS Code Live Server）

### 5.2 部署

支持任意静态文件托管服务：
- GitHub Pages
- Vercel
- Netlify
- 阿里云 OSS
- 腾讯云 COS

### 5.3 命令行操作

```bash
# 开发模式（静态站点，直接打开 index.html）
npm run dev

# 构建（静态站点，无需构建）
npm run build

# 部署到 Cloudflare Pages
npm run deploy
```

## 6. 配置与定制

### 6.1 个人信息修改

1. 编辑各 HTML 文件中的文本内容
2. 替换 `https://images.unsplash.com/` 链接为本地图片
3. 修改 `css/style.css` 中的 `:root` 变量以更改主题颜色
4. 修改页脚和各页面中的社交媒体链接

### 6.2 内容管理

1. 编辑 `content/` 目录下的 JSON 文件以更新内容
2. 使用 `admin/` 目录下的后台管理系统进行内容管理

### 6.3 功能扩展

可扩展功能：
- [ ] 暗色/亮色模式切换
- [ ] 搜索功能
- [ ] 博客系统
- [ ] 作品详情弹窗
- [ ] 邮件订阅功能
- [ ] 访问统计分析
- [ ] 后端 API 对接

## 7. 浏览器兼容性

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 8. 注意事项

1. **图片优化**：生产环境请使用 WebP 格式并压缩图片
2. **版权声明**：Unsplash 图片仅供演示，请替换为原创内容
3. **表单处理**：当前表单仅做演示，需接入后端服务（如 Formspree）
4. **SEO**：建议添加 sitemap.xml 和 robots.txt
5. **性能**：可考虑添加图片懒加载和 CDN 加速

## 9. 项目维护

### 9.1 目录结构维护

- 保持目录结构清晰，避免文件混乱
- 新增页面时，遵循现有的命名和结构规范
- 定期清理不必要的文件和代码

### 9.2 代码规范

- 遵循 HTML5 语义化标签规范
- 使用 CSS Variables 管理样式
- 保持 JavaScript 代码简洁明了
- 添加必要的注释

### 9.3 性能优化

- 压缩 CSS 和 JavaScript 文件
- 优化图片大小和格式
- 使用浏览器缓存
- 减少 HTTP 请求

## 10. 总结

CreatorHub 是一个功能完整、设计现代的自媒体个人网站模板，适合创作者展示个人品牌和作品。它采用了响应式设计，支持多种设备访问，并提供了丰富的交互功能。项目结构清晰，代码组织合理，易于定制和扩展。

通过本 Wiki 文档，您应该能够快速了解项目的整体架构、主要模块职责、关键功能实现以及如何运行和定制项目。如果您有任何问题或建议，欢迎提出。
