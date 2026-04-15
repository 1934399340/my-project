// 前端数据服务 - 用于从API加载公共数据
// 注意：此服务仅用于前端页面，不包含管理功能

class FrontendDataService {
    constructor() {
        this.apiBaseUrl = '/api';
        this.initialized = true; // API服务不需要初始化
    }

    // 获取所有作品（带过滤选项）
    async getPortfolio(category = null, featured = null, limit = 12) {
        try {
            let url = `${this.apiBaseUrl}/works`;
            const params = new URLSearchParams();
            
            if (category && category !== 'all') {
                params.append('category', category);
            }
            
            if (featured !== null) {
                params.append('featured', featured);
            }
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || '获取作品数据失败');
            }
            
            return data.works || [];
        } catch (error) {
            console.error('获取作品数据失败:', error.message);
            // 返回备用数据
            return this.getFallbackPortfolio(category);
        }
    }

    // 获取单个作品
    async getPortfolioItem(id) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/works?id=${id}`);
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || '获取作品详情失败');
            }
            
            return data.work;
        } catch (error) {
            console.error('获取作品详情失败:', error.message);
            return null;
        }
    }

    // 获取文章列表
    async getPosts(category = null, published = true, limit = 10) {
        try {
            let url = `${this.apiBaseUrl}/articles`;
            const params = new URLSearchParams();
            
            if (category) {
                params.append('category', category);
            }
            
            if (published !== null) {
                params.append('published', published);
            }
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || '获取文章数据失败');
            }
            
            return data.articles || [];
        } catch (error) {
            console.error('获取文章数据失败:', error.message);
            return this.getFallbackPosts(category);
        }
    }

    // 获取网站设置
    async getSettings() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/content?page=general`);
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || '获取网站设置失败');
            }
            
            return data.content || this.getFallbackSettings();
        } catch (error) {
            console.error('获取网站设置失败:', error.message);
            return this.getFallbackSettings();
        }
    }

    // 增加作品浏览量
    async incrementViews(portfolioId) {
        try {
            // 这里可以实现增加浏览量的API调用
            // 暂时不实现，保持静默
        } catch (error) {
            console.warn('增加浏览量失败:', error.message);
            // 静默失败，不影响用户体验
        }
    }

    // 增加作品点赞数
    async incrementLikes(portfolioId) {
        try {
            // 这里可以实现增加点赞数的API调用
            // 暂时返回模拟数据
            return { success: true, likes: Math.floor(Math.random() * 1000) };
        } catch (error) {
            console.warn('增加点赞数失败:', error.message);
            return { success: false, error: error.message };
        }
    }

    // 备用数据（当Supabase不可用时使用）
    getFallbackPortfolio(category = null) {
        const portfolio = [
            {
                id: '1',
                title: '城市风光延时摄影',
                category: 'video',
                cover_url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
                description: '记录城市24小时的光影变化，展现都市生活的独特魅力',
                client: '个人项目',
                year: '2024',
                views: 23000,
                likes: 12000,
                featured: true,
                created_at: '2024-03-15T10:30:00Z'
            },
            {
                id: '2',
                title: '自然风光摄影',
                category: 'photo',
                cover_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
                description: '探索大自然的绝美瞬间，捕捉光影与自然的和谐',
                client: '个人项目',
                year: '2024',
                views: 15000,
                likes: 8500,
                featured: true,
                created_at: '2024-03-10T14:20:00Z'
            },
            {
                id: '3',
                title: '品牌形象片',
                category: 'brand',
                cover_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
                description: '为创业公司打造的品牌宣传片，突出创新与专业',
                client: '创业公司',
                year: '2024',
                views: 18000,
                likes: 9500,
                featured: false,
                created_at: '2024-03-05T09:15:00Z'
            },
            {
                id: '4',
                title: '短视频合集',
                category: 'video',
                cover_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
                description: '系列短视频创作，展现不同的创作风格和技巧',
                client: '个人项目',
                year: '2024',
                views: 12000,
                likes: 6500,
                featured: false,
                created_at: '2024-02-28T16:45:00Z'
            }
        ];

        if (category && category !== 'all') {
            return portfolio.filter(item => item.category === category);
        }

        return portfolio;
    }

    getFallbackPosts(category = null) {
        const posts = [
            {
                id: '1',
                title: '5个让视频更专业的剪辑技巧',
                category: '剪辑教程',
                excerpt: '掌握这些剪辑技巧，让你的视频作品更上一层楼',
                cover_url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
                read_time: 5,
                views: 3200,
                likes: 1500,
                published: true,
                published_at: '2024-03-12T10:30:00Z',
                created_at: '2024-03-12T10:30:00Z'
            },
            {
                id: '2',
                title: '如何写出让人忍不住转发的文案',
                category: '文案技巧',
                excerpt: '揭秘爆款文案的写作技巧和心法',
                cover_url: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80',
                read_time: 8,
                views: 5800,
                likes: 2800,
                published: true,
                published_at: '2024-03-08T14:20:00Z',
                created_at: '2024-03-08T14:20:00Z'
            },
            {
                id: '3',
                title: '摄影构图的基本原则',
                category: '摄影',
                excerpt: '掌握这些构图原则，让你的照片更有故事感',
                cover_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
                read_time: 6,
                views: 4200,
                likes: 1900,
                published: true,
                published_at: '2024-03-05T09:15:00Z',
                created_at: '2024-03-05T09:15:00Z'
            }
        ];

        if (category) {
            return posts.filter(post => post.category === category);
        }

        return posts;
    }

    getFallbackSettings() {
        return {
            id: 'general',
            site_title: 'CreatorHub',
            site_description: '创作者个人网站',
            avatar_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
            email: 'contact@creatorhub.com',
            wechat: 'creatorhub',
            address: '北京市朝阳区',
            social: {
                bilibili: 'https://space.bilibili.com/123456789',
                douyin: 'https://www.douyin.com/user/xxx',
                xiaohongshu: 'https://www.xiaohongshu.com/user/profile/xxx',
                weibo: 'https://weibo.com/u/123456789'
            },
            updated_at: '2024-03-15T10:30:00Z'
        };
    }

    // 工具方法：渲染作品卡片
    renderPortfolioCard(item) {
        const categoryIcons = {
            video: '🎬',
            photo: '📷',
            brand: '🏢'
        };

        const categoryLabels = {
            video: '视频',
            photo: '摄影',
            brand: '品牌'
        };

        return `
            <article class="work-card" data-id="${item.id}">
                <div class="work-image">
                    <img src="${item.cover_url || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80'}" 
                         alt="${item.title}" loading="lazy">
                    <div class="work-overlay">
                        <span class="work-category">${categoryIcons[item.category] || '✦'} ${categoryLabels[item.category] || '作品'}</span>
                        <h3 class="work-title">${item.title}</h3>
                        <p class="work-desc">${item.description || ''}</p>
                        <div class="work-stats">
                            <span class="work-stat"><i class="fas fa-eye"></i> ${this.formatNumber(item.views || 0)}</span>
                            <span class="work-stat"><i class="fas fa-heart"></i> ${this.formatNumber(item.likes || 0)}</span>
                        </div>
                        <button class="work-link view-details" data-id="${item.id}">查看详情 →</button>
                    </div>
                </div>
            </article>
        `;
    }

    // 工具方法：渲染文章卡片
    renderPostCard(post) {
        return `
            <article class="post-card" data-id="${post.id}">
                <div class="post-image">
                    <img src="${post.cover_url || 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&q=80'}" 
                         alt="${post.title}" loading="lazy">
                </div>
                <div class="post-content">
                    <span class="post-category">${post.category || '文章'}</span>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt || ''}</p>
                    <div class="post-meta">
                        <span class="post-read-time"><i class="far fa-clock"></i> ${post.read_time || 5}分钟阅读</span>
                        <span class="post-views"><i class="far fa-eye"></i> ${this.formatNumber(post.views || 0)}</span>
                        <span class="post-likes"><i class="far fa-heart"></i> ${this.formatNumber(post.likes || 0)}</span>
                    </div>
                    <a href="#" class="post-link read-more" data-id="${post.id}">阅读全文 →</a>
                </div>
            </article>
        `;
    }

    // 格式化数字（千位分隔）
    formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + '千';
        }
        return num.toString();
    }
}

// 创建全局实例
window.FrontendDataService = FrontendDataService;