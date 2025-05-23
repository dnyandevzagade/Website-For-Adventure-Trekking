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

    // Manual Scroller with Arrows
    function initManualScroller() {
        const track = document.querySelector('.scroller-track');
        const btnLeft = document.querySelector('.scroller-btn-left');
        const btnRight = document.querySelector('.scroller-btn-right');
        const items = document.querySelectorAll('.scroller-item');
        
        if (!track || !btnLeft || !btnRight || items.length === 0) return;
        
        const itemWidth = items[0].offsetWidth + 20; // width + gap
        
        btnRight.addEventListener('click', () => {
            track.scrollBy({
                left: itemWidth * 2, // Scroll 2 items at a time
                behavior: 'smooth'
            });
        });
        
        btnLeft.addEventListener('click', () => {
            track.scrollBy({
                left: -itemWidth * 2, // Scroll 2 items at a time
                behavior: 'smooth'
            });
        });
        
        // Hide/show arrows based on scroll position
        track.addEventListener('scroll', () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            
            if (track.scrollLeft <= 10) {
                btnLeft.style.opacity = '0.5';
                btnLeft.style.pointerEvents = 'none';
            } else {
                btnLeft.style.opacity = '1';
                btnLeft.style.pointerEvents = 'auto';
            }
            
            if (track.scrollLeft >= maxScroll - 10) {
                btnRight.style.opacity = '0.5';
                btnRight.style.pointerEvents = 'none';
            } else {
                btnRight.style.opacity = '1';
                btnRight.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Initialize the scroller
    initManualScroller();
    
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
