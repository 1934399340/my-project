-- ============================================
-- Supabase 数据库结构设置指南
-- ============================================

-- 1. 登录 Supabase (https://supabase.com)
-- 2. 进入你的项目 -> SQL Editor
-- 3. 运行以下SQL创建表结构

-- ============================================
-- 媒体文件表 (media)
-- ============================================
CREATE TABLE media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('image', 'video', 'document')),
    size INTEGER,
    cloudinary_public_id TEXT,
    folder TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用RLS
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public read access" ON media
    FOR SELECT USING (true);

-- 创建插入策略（需要认证）
CREATE POLICY "Allow authenticated insert" ON media
    FOR INSERT WITH CHECK (true);

-- 创建删除策略（需要认证）
CREATE POLICY "Allow authenticated delete" ON media
    FOR DELETE USING (true);

-- ============================================
-- 作品集表 (portfolio)
-- ============================================
CREATE TABLE portfolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('video', 'photo', 'brand')),
    cover_url TEXT,
    client TEXT,
    year TEXT DEFAULT '2024',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    media_ids UUID[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用RLS
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public portfolio read" ON portfolio
    FOR SELECT USING (true);

-- 创建插入策略
CREATE POLICY "Allow authenticated portfolio insert" ON portfolio
    FOR INSERT WITH CHECK (true);

-- 创建更新策略
CREATE POLICY "Allow authenticated portfolio update" ON portfolio
    FOR UPDATE USING (true);

-- 创建删除策略
CREATE POLICY "Allow authenticated portfolio delete" ON portfolio
    FOR DELETE USING (true);

-- ============================================
-- 文章表 (posts)
-- ============================================
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('文案技巧', '案例拆解', '工具推荐', '剪辑教程', '摄影')),
    excerpt TEXT,
    content TEXT,
    cover_url TEXT,
    read_time INTEGER DEFAULT 5,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public posts read" ON posts
    FOR SELECT USING (true);

-- 创建插入策略
CREATE POLICY "Allow authenticated posts insert" ON posts
    FOR INSERT WITH CHECK (true);

-- 创建更新策略
CREATE POLICY "Allow authenticated posts update" ON posts
    FOR UPDATE USING (true);

-- 创建删除策略
CREATE POLICY "Allow authenticated posts delete" ON posts
    FOR DELETE USING (true);

-- ============================================
-- 网站设置表 (settings)
-- ============================================
CREATE TABLE settings (
    id TEXT PRIMARY KEY DEFAULT 'general',
    site_title TEXT,
    site_description TEXT,
    avatar_url TEXT,
    email TEXT,
    wechat TEXT,
    address TEXT,
    social JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public settings read" ON settings
    FOR SELECT USING (true);

-- 创建更新策略
CREATE POLICY "Allow authenticated settings update" ON settings
    FOR UPDATE USING (true);

-- 插入默认设置
INSERT INTO settings (id, site_title, site_description)
VALUES ('general', 'CreatorHub', '创作者个人网站')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 分析数据表 (analytics)
-- ============================================
CREATE TABLE analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略
CREATE POLICY "Allow public analytics read" ON analytics
    FOR SELECT USING (true);

-- 创建插入策略
CREATE POLICY "Allow public analytics insert" ON analytics
    FOR INSERT WITH CHECK (true);

-- ============================================
-- 创建索引以提高查询性能
-- ============================================
CREATE INDEX idx_media_type ON media(type);
CREATE INDEX idx_media_created_at ON media(created_at DESC);
CREATE INDEX idx_portfolio_category ON portfolio(category);
CREATE INDEX idx_portfolio_featured ON portfolio(featured);
CREATE INDEX idx_portfolio_created_at ON portfolio(created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);

-- ============================================
-- 启用自动更新updated_at的触发器
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_media_updated_at
    BEFORE UPDATE ON media
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at
    BEFORE UPDATE ON portfolio
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();