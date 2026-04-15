// 内容管理 API
export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(context.request.url);
  const page = url.searchParams.get('page');

  try {
    const { request, env } = context;

    // GET - 获取内容
    if (request.method === 'GET') {
      if (page) {
        // 获取指定页面内容
        const { results } = await env.DB.prepare(
          'SELECT * FROM settings WHERE id = ?'
        ).bind(page).all();

        return new Response(JSON.stringify({
          success: true,
          content: results[0] || null
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        // 获取所有内容
        const { results } = await env.DB.prepare(
          'SELECT * FROM settings'
        ).all();

        return new Response(JSON.stringify({
          success: true,
          contents: results
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // PUT - 更新内容
    if (request.method === 'PUT') {
      if (!page) {
        return new Response(JSON.stringify({
          success: false,
          error: '缺少页面标识'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const body = await request.json();
      const { site_title, site_description, avatar_url, email, wechat, address, social } = body;

      // 检查内容是否存在
      const { results } = await env.DB.prepare(
        'SELECT id FROM settings WHERE id = ?'
      ).bind(page).all();

      if (results.length > 0) {
        // 更新现有内容
        await env.DB.prepare(`
          UPDATE settings
          SET site_title = COALESCE(?, site_title),
              site_description = COALESCE(?, site_description),
              avatar_url = COALESCE(?, avatar_url),
              email = COALESCE(?, email),
              wechat = COALESCE(?, wechat),
              address = COALESCE(?, address),
              social = COALESCE(?, social),
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(site_title, site_description, avatar_url, email, wechat, address, social, page).run();
      } else {
        // 创建新内容
        await env.DB.prepare(`
          INSERT INTO settings (id, site_title, site_description, avatar_url, email, wechat, address, social)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(page, site_title || '', site_description || '', avatar_url || '', email || '', wechat || '', address || '', social || '{}').run();
      }

      return new Response(JSON.stringify({
        success: true,
        message: '内容已更新'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
