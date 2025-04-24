document.addEventListener('DOMContentLoaded', function() {
    // 1. Intersection Observer로 스크롤 진입 애니메이션 & 폰트 스케일링
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    document.querySelectorAll('.scale-text').forEach(el => {
        observer.observe(el);
    });

    // 히어로 섹션 등은 로드 시 바로 is-visible + scale-active
    document.querySelectorAll('#hero .animate-on-scroll, #hero .scale-text').forEach(el => {
        el.classList.add('is-visible');
        if (el.classList.contains('scale-text')) {
            el.classList.add('scale-active');
        }
    });

    // 스크롤 진입 시 scale-text에 scale-active 추가
    const scaleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scale-active');
            } else {
                entry.target.classList.remove('scale-active');
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.scale-text').forEach(el => scaleObserver.observe(el));

    // 2. 부드러운 스크롤 및 네비게이션 활성화
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('#site-header').offsetHeight;
                const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // 스크롤 시 네비게이션 활성화
    const sections = document.querySelectorAll('main section');
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.scrollY;
        const headerHeight = header.offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector('nav a[href="#' + current + '"]');
        if (activeLink) activeLink.classList.add('active');
    });

    // 모바일 메뉴 토글
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            const isOpen = mainNav.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });
    }
});
