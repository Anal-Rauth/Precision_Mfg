// ============================================
// Mobile Navigation (Hamburger Menu)
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Header Scroll Effect + Hero Parallax
// ============================================
const header = document.getElementById('header');
const heroShapes = document.querySelectorAll('.hero-shape');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Subtle parallax for hero shapes
    if (heroShapes.length) {
        heroShapes.forEach((shape, index) => {
            const speed = 0.08 + index * 0.04;
            shape.style.transform = `translate3d(0, ${currentScroll * speed * -1}px, 0)`;
        });
    }

    lastScroll = currentScroll;
});

// ============================================
// 3D hero tilt effect (mouse-based parallax)
// ============================================
const heroWrapper = document.querySelector('.hero-3d-wrapper');
const heroCard = heroWrapper ? heroWrapper.querySelector('.hero-content') : null;
const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroWrapper && heroCard && !prefersReducedMotion) {
    let heroTiltRAF = null;

    const handleHeroMouseMove = (event) => {
        const bounds = heroWrapper.getBoundingClientRect();
        const offsetX = event.clientX - bounds.left;
        const offsetY = event.clientY - bounds.top;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        const rotateMax = 8; // max rotation in degrees

        const rotateY = ((offsetX - centerX) / centerX) * rotateMax;
        const rotateX = ((centerY - offsetY) / centerY) * rotateMax;

        if (heroTiltRAF) cancelAnimationFrame(heroTiltRAF);

        heroTiltRAF = requestAnimationFrame(() => {
            heroCard.style.transform =
                `rotateX(${rotateX.toFixed(2)}deg) ` +
                `rotateY(${rotateY.toFixed(2)}deg) ` +
                `translate3d(0, -6px, 40px)`;
        });
    };

    const resetHeroTilt = () => {
        if (heroTiltRAF) cancelAnimationFrame(heroTiltRAF);
        heroCard.style.transform = 'translate3d(0, 0, 0)';
    };

    heroWrapper.addEventListener('mousemove', handleHeroMouseMove);
    heroWrapper.addEventListener('mouseleave', resetHeroTilt);
}

// ============================================
// Global 3D tilt for interactive cards
// (services, features, gallery, testimonials, contact)
// ============================================
// Scroll-safe, logic-safe: purely visual transforms on .tilt-card / .tilt-soft
function initTiltOnElements(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || prefersReducedMotion) return;

    const maxRotate = options.maxRotate || 8;      // degrees
    const maxTranslateZ = options.maxTranslateZ || 18; // px
    const liftY = options.liftY || -6;            // px

    elements.forEach((el) => {
        let rafId = null;

        const handleMove = (event) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;

            const rotateY = ((x - midX) / midX) * maxRotate;   // left/right
            const rotateX = ((midY - y) / midY) * maxRotate;   // up/down

            if (rafId) cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
                el.style.transform =
                    `rotateX(${rotateX.toFixed(2)}deg) ` +
                    `rotateY(${rotateY.toFixed(2)}deg) ` +
                    `translate3d(0, ${liftY}px, ${maxTranslateZ}px)`;
            });
        };

        const reset = () => {
            if (rafId) cancelAnimationFrame(rafId);
            el.style.transform = 'translate3d(0, 0, 0)';
        };

        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', reset);
    });
}

// Apply 3D tilt everywhere we use tilt-card / tilt-soft
initTiltOnElements('.tilt-card', { maxRotate: 9, maxTranslateZ: 22, liftY: -8 });
initTiltOnElements('.tilt-soft', { maxRotate: 6, maxTranslateZ: 16, liftY: -4 });

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 110;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Animated Counter for Statistics
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 98 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 98 ? '%' : '+');
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, target);
                }
            });
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ============================================
// Testimonials Slider
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    // Show selected testimonial
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }

    currentTestimonial = index;
}

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-play testimonials
let testimonialInterval;

function startTestimonialSlider() {
    testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Start auto-play
if (testimonialCards.length > 0) {
    startTestimonialSlider();

    // Pause on hover
    const testimonialsSection = document.querySelector('.testimonials-slider');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialsSection.addEventListener('mouseleave', () => {
            startTestimonialSlider();
        });
    }
}

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple form validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you! Your quote request has been submitted successfully. We will contact you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 96px;
        right: 20px;
        background: ${type === 'success'
            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
            : 'linear-gradient(135deg, #f97373, #ef4444)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 22px 70px rgba(15, 23, 42, 0.85);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-weight: 500;
        border: 1px solid rgba(15, 23, 42, 0.6);
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// Scroll Animations (Fade In on Scroll)
// Scroll reveal animation + Staggered card reveal
// ============================================
const fadeElements = document.querySelectorAll(
    '.about-content, .services-grid, .features-grid, .gallery-grid, .testimonials-slider, .contact-wrapper, .section-header'
);

// Initialize base state for scroll reveal
fadeElements.forEach(element => {
    // Staggered card reveal for grids
    if (element.matches('.services-grid, .features-grid, .gallery-grid')) {
        const cards = Array.from(element.children);
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        });
    } else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    }
});

const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Staggered card reveal for feature/service/gallery grids
                if (entry.target.matches('.services-grid, .features-grid, .gallery-grid')) {
                    const cards = Array.from(entry.target.children);
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 120); // Staggered card reveal
                    });
                } else {
                    // Simple scroll reveal animation
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }

                fadeObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ============================================
// Gallery Item Click Handler (Optional - for future lightbox)
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Future: Implement lightbox functionality
        console.log('Gallery item clicked');
    });
});

// ============================================
// Form Input Animations
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });

    // Check if input has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// ============================================
// Prevent Form Resubmission on Page Reload
// ============================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Activate first navigation link
    if (window.scrollY < 100) {
        navLinks[0]?.classList.add('active');
    }

    // Initialize scroll position
    activateNavLink();

    console.log('Manufacturing Website Initialized');
});
