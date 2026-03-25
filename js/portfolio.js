document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const sortSelect = document.getElementById('sortSelect');
    const countNums = document.querySelectorAll('.count-num');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    countNums.forEach(num => {
        const target = parseInt(num.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                num.textContent = target;
                clearInterval(timer);
            } else {
                num.textContent = Math.floor(current);
            }
        }, 40);
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            masonryItems.forEach((item, index) => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    item.offsetHeight;
                    item.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const itemsArray = Array.from(masonryItems);

            itemsArray.sort((a, b) => {
                const dateA = a.dataset.date;
                const dateB = b.dataset.date;

                if (sortValue === 'latest') {
                    return dateB.localeCompare(dateA);
                } else if (sortValue === 'oldest') {
                    return dateA.localeCompare(dateB);
                } else {
                    const viewsA = parseInt(a.querySelector('.work-views').textContent.replace(/[^0-9]/g, '')) || 0;
                    const viewsB = parseInt(b.querySelector('.work-views').textContent.replace(/[^0-9]/g, '')) || 0;
                    return viewsB - viewsA;
                }
            });

            const grid = document.getElementById('portfolioGrid');
            itemsArray.forEach(item => {
                grid.appendChild(item);
            });
        });
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadingIndicator.classList.add('active');
            loadMoreBtn.style.display = 'none';

            setTimeout(() => {
                loadingIndicator.classList.remove('active');
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.innerHTML = `
                    <span>没有更多作品了</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                `;
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.6';
                loadMoreBtn.style.cursor = 'default';
            }, 1500);
        });
    }

    const workBtns = document.querySelectorAll('.work-btn');
    workBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const card = this.closest('.masonry-item');
            const title = card.querySelector('.work-title').textContent;
            const category = card.querySelector('.work-category').textContent;
            const desc = card.querySelector('.work-desc').textContent;
            const img = card.querySelector('img').src;

            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="modal-work">
                    <div class="modal-image">
                        <img src="${img}" alt="${title}">
                    </div>
                    <div class="modal-details">
                        <span class="modal-category">${category}</span>
                        <h2 class="modal-title">${title}</h2>
                        <p class="modal-desc">${desc}</p>
                        <div class="modal-info">
                            <div class="modal-info-item">
                                <span class="info-label">创作时间</span>
                                <span class="info-value">2024年</span>
                            </div>
                            <div class="modal-info-item">
                                <span class="info-label">项目类型</span>
                                <span class="info-value">${category}</span>
                            </div>
                            <div class="modal-info-item">
                                <span class="info-label">使用工具</span>
                                <span class="info-value">Premiere Pro, After Effects</span>
                            </div>
                        </div>
                        <a href="contact.html" class="modal-cta">咨询合作</a>
                    </div>
                </div>
            `;

            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    masonryItems.forEach(item => {
        observer.observe(item);
    });
});
