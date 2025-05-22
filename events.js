document.addEventListener('DOMContentLoaded', function() {
    // Loader for events page
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
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
    
    // Animate event cards when they come into view
    const animateEventCards = function() {
        const cards = document.querySelectorAll('.event-card, .past-event-card');
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateEventCards);
    animateEventCards(); // Run once on page load
});