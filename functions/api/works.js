// 作品集管理 API (CRUD)
export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  const category = url.searchParams.get('category');
  const featured = url.searchParams.get('featured');

  try {
    const { request, env } = context;

    // GET - 获取作品集列表或单个作品
    if (request.method === 'GET') {
      if (id) {
        // 获取单个作品
        const { results } = await env.DB.prepare(
          'SELECT * FROM portfolio WHERE id = ?'
        ).bind(id).all();

        if (results.length === 0) {
          return new Response(JSON.stringify({
            success: false,
            error: '作品不存在'
          }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({
          success: true,
          work: results[0]
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        // 获取作品集列表
        let query = 'SELECT * FROM portfolio';
        const params = [];
        let conditions = [];

        if (category) {
          conditions.push('category = ?');
          params.push(category);
        }

        if (featured !== null) {
          conditions.push('featured = ?');
          params.push(featured === 'true');
        }

        if (conditions.length > 0) {
          query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at DESC';

        const { results } = params.length > 0
          ? await env.DB.prepare(query).bind(...params).all()
          : await env.DB.prepare(query).all();

        return new Response(JSON.stringify({
          success: true,
          works: results
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // POST - 创建作品
    if (request.method === 'POST') {
      const body = await request.json();
      const { title, description, category, cover_url, client, year, featured, media_ids } = body;

      if (!title || !category) {
        return new Response(JSON.stringify({
          success: false,
          error: '缺少必要字段'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const result = await env.DB.prepare(`
        INSERT INTO portfolio (title, description, category, cover_url, client, year, featured, media_ids)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        title,
        description || '',
        category,
        cover_url || '',
        client || '',
        year || '2024',
        featured || false,
        media_ids || '{}'
      ).run();

      return new Response(JSON.stringify({
        success: true,
        message: '作品创建成功',
        id: result.meta.last_row_id
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // PUT - 更新作品
    if (request.method === 'PUT') {
      if (!id) {
        return new Response(JSON.stringify({
          success: false,
          error: '缺少作品ID'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const body = await request.json();
      const { title, description, category, cover_url, client, year, featured, media_ids } = body;

      await env.DB.prepare(`
        UPDATE portfolio
        SET title = COALESCE(?, title),
            description = COALESCE(?, description),
            category = COALESCE(?, category),
            cover_url = COALESCE(?, cover_url),
            client = COALESCE(?, client),
            year = COALESCE(?, year),
            featured = COALESCE(?, featured),
            media_ids = COALESCE(?, media_ids)
        WHERE id = ?
      `).bind(
        title,
        description,
        category,
        cover_url,
        client,
        year,
        featured,
        media_ids,
        id
      ).run();

      return new Response(JSON.stringify({
        success: true,
        message: '作品更新成功'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // DELETE - 删除作品
    if (request.method === 'DELETE') {
      if (!id) {
        return new Response(JSON.stringify({
          success: false,
          error: '缺少作品ID'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      await env.DB.prepare('DELETE FROM portfolio WHERE id = ?').bind(id).run();

      return new Response(JSON.stringify({
        success: true,
        message: '作品删除成功'
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