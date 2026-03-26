const { createClient } = window.supabase;

class SupabaseService {
    constructor() {
        this.supabase = null;
        this.config = {
            supabaseUrl: 'YOUR_SUPABASE_URL',
            supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY'
        };
    }

    async init(supabaseUrl, supabaseAnonKey) {
        if (supabaseUrl && supabaseAnonKey) {
            this.config.supabaseUrl = supabaseUrl;
            this.config.supabaseAnonKey = supabaseAnonKey;
        }

        this.supabase = createClient(this.config.supabaseUrl, this.config.supabaseAnonKey);
        const { data, error } = await this.supabase.auth.getSession();

        if (error) {
            console.error('Supabase初始化失败:', error);
            return false;
        }

        return true;
    }

    async signIn(email, password) {
        if (!this.supabase) await this.init();
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;
        return data;
    }

    async signUp(email, password, metadata) {
        if (!this.supabase) await this.init();
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
            options: { data: metadata }
        });

        if (error) throw error;
        return data;
    }

    async signOut() {
        if (!this.supabase) await this.init();
        const { error } = await this.supabase.auth.signOut();
        if (error) throw error;
    }

    async getSession() {
        if (!this.supabase) await this.init();
        const { data: { session } } = await this.supabase.auth.getSession();
        return session;
    }

    async getCurrentUser() {
        if (!this.supabase) await this.init();
        const { data: { user } } = await this.supabase.auth.getUser();
        return user;
    }

    onAuthStateChange(callback) {
        if (!this.supabase) this.init();
        return this.supabase.auth.onAuthStateChange(callback);
    }
}

class MediaService {
    constructor(supabaseService) {
        this.supabase = supabaseService.supabase;
    }

    async getAll(type = null, limit = 50) {
        let query = this.supabase
            .from('media')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (type) {
            query = query.eq('type', type);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async getById(id) {
        const { data, error } = await this.supabase
            .from('media')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async upload(file, folder = 'general') {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { data, error } = await this.supabase.storage
            .from('media')
            .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = this.supabase.storage
            .from('media')
            .getPublicUrl(filePath);

        const type = file.type.startsWith('image/') ? 'image' :
                     file.type.startsWith('video/') ? 'video' : 'document';

        const { data: media, error: dbError } = await this.supabase
            .from('media')
            .insert({
                name: file.name,
                url: publicUrl,
                type,
                size: file.size,
                folder,
                metadata: {
                    original_name: file.name,
                    mime_type: file.type
                }
            })
            .select()
            .single();

        if (dbError) throw dbError;
        return media;
    }

    async delete(id) {
        const { error } = await this.supabase
            .from('media')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
}

class PortfolioService {
    constructor(supabaseService) {
        this.supabase = supabaseService.supabase;
    }

    async getAll(category = null, featured = null) {
        let query = this.supabase
            .from('portfolio')
            .select('*')
            .order('created_at', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }

        if (featured !== null) {
            query = query.eq('featured', featured);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async getById(id) {
        const { data, error } = await this.supabase
            .from('portfolio')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async create(item) {
        const { data, error } = await this.supabase
            .from('portfolio')
            .insert(item)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async update(id, item) {
        const { data, error } = await this.supabase
            .from('portfolio')
            .update(item)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id) {
        const { error } = await this.supabase
            .from('portfolio')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }

    async incrementViews(id) {
        const { data, error } = await this.supabase.rpc('increment_portfolio_views', { row_id: id });
        if (error) {
            const { data: item } = await this.supabase
                .from('portfolio')
                .select('views')
                .eq('id', id)
                .single();

            if (item) {
                await this.update(id, { views: (item.views || 0) + 1 });
            }
        }
        return data;
    }

    async incrementLikes(id) {
        const { data: item } = await this.supabase
            .from('portfolio')
            .select('likes')
            .eq('id', id)
            .single();

        if (item) {
            await this.update(id, { likes: (item.likes || 0) + 1 });
        }
        return item;
    }
}

class PostsService {
    constructor(supabaseService) {
        this.supabase = supabaseService.supabase;
    }

    async getAll(category = null, published = null) {
        let query = this.supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }

        if (published !== null) {
            query = query.eq('published', published);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async getById(id) {
        const { data, error } = await this.supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async create(item) {
        const { data, error } = await this.supabase
            .from('posts')
            .insert(item)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async update(id, item) {
        const { data, error } = await this.supabase
            .from('posts')
            .update(item)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async delete(id) {
        const { error } = await this.supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }

    async publish(id) {
        return this.update(id, {
            published: true,
            published_at: new Date().toISOString()
        });
    }

    async unpublish(id) {
        return this.update(id, {
            published: false,
            published_at: null
        });
    }
}

class SettingsService {
    constructor(supabaseService) {
        this.supabase = supabaseService.supabase;
    }

    async get(key = 'general') {
        const { data, error } = await this.supabase
            .from('settings')
            .select('*')
            .eq('id', key)
            .single();

        if (error) throw error;
        return data;
    }

    async update(key, settings) {
        const { data, error } = await this.supabase
            .from('settings')
            .update({ ...settings, updated_at: new Date().toISOString() })
            .eq('id', key)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
}

class AnalyticsService {
    constructor(supabaseService) {
        this.supabase = supabaseService.supabase;
    }

    async track(eventType, eventData = {}) {
        const { error } = await this.supabase
            .from('analytics')
            .insert({
                event_type: eventType,
                event_data: eventData,
                user_agent: navigator.userAgent
            });

        if (error) console.error('Analytics track error:', error);
    }

    async getRecent(limit = 100) {
        const { data, error } = await this.supabase
            .from('analytics')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    }

    async getStats(days = 7) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const { data, error } = await this.supabase
            .from('analytics')
            .select('event_type, created_at')
            .gte('created_at', startDate.toISOString());

        if (error) throw error;

        const stats = {};
        data.forEach(item => {
            if (!stats[item.event_type]) {
                stats[item.event_type] = 0;
            }
            stats[item.event_type]++;
        });

        return stats;
    }
}

window.SupabaseService = SupabaseService;
window.MediaService = MediaService;
window.PortfolioService = PortfolioService;
window.PostsService = PostsService;
window.SettingsService = SettingsService;
window.AnalyticsService = AnalyticsService;