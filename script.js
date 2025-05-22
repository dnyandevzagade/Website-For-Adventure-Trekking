document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    
    // Hide loader after 1.5 seconds
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        // Remove loader from DOM after animation completes
        loader.addEventListener('transitionend', () => {
            if (loader.classList.contains('loader-hidden')) {
                document.body.removeChild(loader);
            }
        });
    }, 1500);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
            
            // Set active link
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Infinite Horizontal Scroller Functionality
    function initInfiniteScroller() {
        const scroller = document.querySelector('.activities-scroller');
        const track = document.querySelector('.scroller-track');
        const items = document.querySelectorAll('.scroller-item');
        
        if (!scroller || !track || items.length === 0) return;
        
        const itemWidth = items[0].offsetWidth + 20; // width + gap
        let isDragging = false;
        let startX, scrollLeft;
        let animationId;
        let targetScroll = 0;
        let currentScroll = 0;
        const ease = 0.1;
        
        // Handle mouse events
        scroller.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - scroller.offsetLeft;
            scrollLeft = currentScroll;
            scroller.style.cursor = 'grabbing';
            cancelAnimationFrame(animationId);
        });
        
        scroller.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - scroller.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fastness
            targetScroll = scrollLeft - walk;
        });
        
        scroller.addEventListener('mouseup', () => {
            isDragging = false;
            scroller.style.cursor = 'grab';
            animateScroll();
        });
        
        scroller.addEventListener('mouseleave', () => {
            isDragging = false;
            scroller.style.cursor = 'grab';
            animateScroll();
        });
        
        // Touch events for mobile
        scroller.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - scroller.offsetLeft;
            scrollLeft = currentScroll;
            cancelAnimationFrame(animationId);
        });
        
        scroller.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - scroller.offsetLeft;
            const walk = (x - startX) * 2;
            targetScroll = scrollLeft - walk;
        });
        
        scroller.addEventListener('touchend', () => {
            isDragging = false;
            animateScroll();
        });
        
        // Navigation buttons
        const btnLeft = document.querySelector('.scroller-btn-left');
        const btnRight = document.querySelector('.scroller-btn-right');
        
        if (btnLeft && btnRight) {
            btnRight.addEventListener('click', () => {
                targetScroll += itemWidth * 3;
                animateScroll();
            });
            
            btnLeft.addEventListener('click', () => {
                targetScroll -= itemWidth * 3;
                animateScroll();
            });
        }
        
        // Smooth scroll animation
        function animateScroll() {
            const diff = targetScroll - currentScroll;
            currentScroll += diff * ease;
            
            // Check for infinite loop
            const maxScroll = track.scrollWidth - scroller.offsetWidth;
            
            if (currentScroll >= maxScroll) {
                currentScroll = 0;
                targetScroll = 0;
            } else if (currentScroll <= 0) {
                currentScroll = maxScroll;
                targetScroll = maxScroll;
            }
            
            track.style.transform = `translateX(${-currentScroll}px)`;
            animationId = requestAnimationFrame(animateScroll);
        }
        
        // Initialize
        scroller.style.cursor = 'grab';
        animateScroll();
    }
    
    // Initialize the scroller
    initInfiniteScroller();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            hero.style.backgroundPositionY = scrollValue * 0.5 + 'px';
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-content, .section-title, .scroller-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});