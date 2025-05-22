document.addEventListener('DOMContentLoaded', function() {
    // Loader for gallery page
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
    
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox Functionality
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaptionTitle = document.querySelector('.caption-title');
    const lightboxCaptionText = document.querySelector('.caption-text');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.gallery-item img'));
    const captions = Array.from(document.querySelectorAll('.overlay-content'));
    
    // Open lightbox when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside image
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation between images
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    });
    
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateLightbox();
            }
        }
    });
    
    function updateLightbox() {
        const imgSrc = images[currentImageIndex].getAttribute('src');
        const captionTitle = captions[currentImageIndex].querySelector('h3').textContent;
        const captionText = captions[currentImageIndex].querySelector('p').textContent;
        
        lightboxImage.setAttribute('src', imgSrc);
        lightboxImage.setAttribute('alt', captionTitle);
        lightboxCaptionTitle.textContent = captionTitle;
        lightboxCaptionText.textContent = captionText;
    }
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.gallery-load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // In a real implementation, this would load more images from server
            alert('More adventures coming soon! This would load additional images in a real implementation.');
        });
    }
    
    // Animate gallery items when they come into view
    const animateGalleryItems = function() {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemPosition < windowHeight - 100) {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateGalleryItems);
    animateGalleryItems(); // Run once on page load
});