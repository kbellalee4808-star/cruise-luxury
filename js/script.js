// 부드러운 스크롤 및 상호작용

document.addEventListener('DOMContentLoaded', function() {
    
    // 네비게이션 스크롤 활성화
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navMenu = document.querySelector('.nav-menu');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 외부 링크나 다른 페이지는 제외
            if (!href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            // 모든 링크에서 active 제거
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 해당 섹션으로 스크롤
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 스크롤 시 네비게이션 업데이트
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션할 요소들
    const animatedElements = document.querySelectorAll(
        '.region-card, .feature-card, .timeline-item, .checklist-card, .procedure-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // CTA 버튼 클릭 이벤트
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 콘솔에 로그 (실제 구현에서는 모달이나 예약 페이지로)
            console.log('예약 상담 신청:', this.textContent);
            alert('예약 상담 신청이 접수되었습니다.\n\n전문가가 곧 연락드리겠습니다!');
        });
    });
    
    // 지역 카드 호버 효과
    const regionCards = document.querySelectorAll('.region-card');
    regionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 페이지 로드 시 부드러운 페이드인
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 비디오 재생 (있는 경우)
window.addEventListener('load', function() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.playbackRate = 0.5; // 느린 재생 속도로 더 우아하게
    });
});
