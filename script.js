// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const text = 'PRODUCT DESIGNER';
    const speed = 60;
    const delay = 500;
    let index = 0;
    let started = false;

    // Start delay
    setTimeout(() => {
        started = true;
        const interval = setInterval(() => {
            if (index <= text.length) {
                typingElement.textContent = text.slice(0, index);
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }, delay);
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
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

// Observe all animated text elements
document.querySelectorAll('.animated-text').forEach(el => {
    observer.observe(el);
});

// Observe work items
document.querySelectorAll('.work-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    itemObserver.observe(item);
});

// Observe process items
document.querySelectorAll('.process-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    processObserver.observe(item);
});

// Observe skills categories
document.querySelectorAll('.skills-category').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    skillsObserver.observe(item);
});

// Gallery scroll reveal animations - one by one, highlighting each image
document.querySelectorAll('.visual-journal-item.scroll-reveal').forEach((item, index) => {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add revealed class immediately when in view
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal for performance
                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    galleryObserver.observe(item);
});


// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navbar = document.querySelector('.navbar');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.nav-mobile-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navbar.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbar.classList.contains('menu-open') && 
        !navbar.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        navbar.classList.remove('menu-open');
    }
});

// Active link highlighting based on current page
function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('load', updateActiveLink);



