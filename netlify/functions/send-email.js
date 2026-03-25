const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: {
    user: '1934399340@qq.com',
    pass: 'stcyzpepkfducfeh'
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: '只支持 POST 请求' })
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: '请填写完整信息' })
      };
    }

    if (!validateEmail(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: '邮箱格式不正确' })
      };
    }

    if (message.length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: '留言内容至少10个字符' })
      };
    }

    const subjectMap = {
      'video': '【视频创作合作】',
      'photo': '【摄影服务】',
      'copy': '【文案策划】',
      'other': '【其他咨询】'
    };

    const emailSubject = `${subjectMap[subject] || '【其他咨询】'} ${name} - 来信咨询`;

    const mailOptions = {
      from: '"CreatorHub 网站访客" <1934399340@qq.com>',
      to: '1934399340@qq.com',
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: 'Microsoft YaHei', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📬 新的联系消息</h1>
          </div>

          <div style="padding: 30px; background: #f8fafc;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; width: 80px;">姓名</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">邮箱</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  <a href="mailto:${email}" style="color: #6366f1;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">咨询类型</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">
                  <span style="display: inline-block; padding: 4px 12px; background: #6366f1; color: white; border-radius: 50px; font-size: 12px;">
                    ${subjectMap[subject] || subject}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">时间</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
                  ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
                </td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="font-weight: bold; color: #64748b; margin-bottom: 12px;">📝 留言内容：</p>
              <p style="color: #0f172a; line-height: 1.8; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; padding: 12px 30px; background: #6366f1; color: white; text-decoration: none; border-radius: 50px; font-weight: bold;">
                回复此人
              </a>
            </div>
          </div>

          <div style="padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
            此邮件由 <strong>CreatorHub</strong> 网站自动发送
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: '消息发送成功，我会尽快回复您！'
      })
    };

  } catch (error) {
    console.error('发送邮件失败:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: '发送失败，请稍后重试或通过其他方式联系我'
      })
    };
  }
}

module.exports = { handler };
