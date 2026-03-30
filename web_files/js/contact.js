document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const RATE_LIMIT_KEY = 'contact_form_last_submit';
    const RATE_LIMIT_SECONDS = 60;
    const MESSAGES_KEY = 'contact_messages';

    function getLastSubmitTime() {
        const lastTime = localStorage.getItem(RATE_LIMIT_KEY);
        return lastTime ? parseInt(lastTime) : 0;
    }

    function setLastSubmitTime(time) {
        localStorage.setItem(RATE_LIMIT_KEY, time.toString());
    }

    function getRemainingSeconds() {
        const lastTime = getLastSubmitTime();
        if (!lastTime) return 0;
        const elapsed = Math.floor(Date.now() / 1000) - lastTime;
        return Math.max(0, RATE_LIMIT_SECONDS - elapsed);
    }

    function updateButtonState(button, remainingSeconds) {
        if (remainingSeconds > 0) {
            button.disabled = true;
            button.classList.add('btn-disabled');
            button.textContent = `${remainingSeconds}秒后可再次发送`;
        } else {
            button.disabled = false;
            button.classList.remove('btn-disabled');
            button.textContent = '发送消息';
        }
    }

    function initRateLimit() {
        if (!contactForm) return;
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const remainingSeconds = getRemainingSeconds();
        updateButtonState(submitBtn, remainingSeconds);

        if (remainingSeconds > 0) {
            const interval = setInterval(() => {
                const secs = getRemainingSeconds();
                updateButtonState(submitBtn, secs);
                if (secs <= 0) {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

    if (contactForm) {
        initRateLimit();

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const remainingSeconds = getRemainingSeconds();

            if (remainingSeconds > 0) {
                alert(`发送太频繁了，请在 ${remainingSeconds} 秒后重试！`);
                return;
            }

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('请填写完整信息！');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }

            if (message.length < 10) {
                alert('留言内容至少需要10个字符！');
                return;
            }

            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-disabled');

            try {
                // 保存消息到本地存储（管理后台可查看）
                const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
                const newMessage = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    time: new Date().toLocaleString('zh-CN'),
                    read: false
                };
                messages.unshift(newMessage);
                
                // 只保留最近100条消息
                if (messages.length > 100) {
                    messages.splice(100);
                }
                
                localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
                setLastSubmitTime(Math.floor(Date.now() / 1000));
                
                alert('✅ 消息发送成功！我们会尽快回复您。');
                contactForm.reset();
                
            } catch (error) {
                console.error('发送失败:', error);
                alert('❌ 发送失败，请稍后重试！');
            } finally {
                submitBtn.textContent = originalText;
                updateButtonState(submitBtn, RATE_LIMIT_SECONDS);

                const interval = setInterval(() => {
                    const secs = getRemainingSeconds();
                    updateButtonState(submitBtn, secs);
                    if (secs <= 0) {
                        clearInterval(interval);
                    }
                }, 1000);
            }
        });

        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});