// ============================================
// Mobile Navigation (Hamburger Menu)
// ============================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (header) {
    if (currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll("section[id]");

function activateNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 110;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", activateNavLink);

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const headerOffset = 90;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// ============================================
// Animated Counter for Statistics
// ============================================
const statNumbers = document.querySelectorAll(".stat-number");

function formatCounterText(target, value, done) {
  const suffix = target === 98 ? "%" : "+";
  const finalValue = done ? target : value;
  return `${finalValue}${suffix}`;
}

function animateStatNumber(el) {
  const target = parseInt(el.dataset.target || el.textContent || "0", 10);
  const duration = 2000; // ms
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = formatCounterText(target, current, progress === 1);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

if (statNumbers.length) {
  if (!("IntersectionObserver" in window)) {
    // Fallback: just set final values
    statNumbers.forEach((el) => {
      const target = parseInt(el.dataset.target || el.textContent || "0", 10);
      el.textContent = formatCounterText(target, target, true);
    });
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (!el.dataset.animated) {
              el.dataset.animated = "true";
              animateStatNumber(el);
            }
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }
}

// ============================================
// Testimonials Slider
// ============================================
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDots = document.querySelectorAll(".dot");
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonialCards.forEach((card) => card.classList.remove("active"));
  testimonialDots.forEach((dot) => dot.classList.remove("active"));

  if (testimonialCards[index]) {
    testimonialCards[index].classList.add("active");
  }
  if (testimonialDots[index]) {
    testimonialDots[index].classList.add("active");
  }

  currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index);
  });
});

let testimonialInterval;

function startTestimonialSlider() {
  if (!testimonialCards.length) return;
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}

if (testimonialCards.length > 0) {
  startTestimonialSlider();

  const testimonialsSection = document.querySelector(".testimonials-slider");
  if (testimonialsSection) {
    testimonialsSection.addEventListener("mouseenter", () => {
      clearInterval(testimonialInterval);
    });

    testimonialsSection.addEventListener("mouseleave", () => {
      startTestimonialSlider();
    });
  }
}

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    if (!data.name || !data.email || !data.message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    setTimeout(() => {
      showNotification(
        "Thank you! Your quote request has been submitted successfully. We will contact you soon.",
        "success"
      );
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = "success") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 96px;
        right: 20px;
        background: ${
          type === "success"
            ? "linear-gradient(135deg, #22c55e, #16a34a)"
            : "linear-gradient(135deg, #f97373, #ef4444)"
        };
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

  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
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

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// ============================================
// Gallery Item Click Handler (Optional)
// ============================================
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    console.log("Gallery item clicked");
  });
});

// ============================================
// Form Input Animations
// ============================================
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea, .form-group select"
);

formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    if (!this.value) {
      this.parentElement.classList.remove("focused");
    }
  });

  if (input.value) {
    input.parentElement.classList.add("focused");
  }
});

// ============================================
// Prevent Form Resubmission on Page Reload
// ============================================
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// ============================================
// GSAP ANIMATIONS
// ============================================
function initGSAPAnimations() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded – check CDN script tags.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // --- NAVBAR APPEAR ---
  gsap.from(".logo, .nav-link, .btn-cta", {
    y: -20,
    opacity: 0,
    duration: 0.7,
    stagger: 0.06,
    ease: "power3.out",
  });

  // --- HERO ---
  const heroLeft = document.querySelector(".hero-left") || document.querySelector(".hero-content");
  const heroRight = document.querySelector(".hero-right");

  if (heroLeft) {
    gsap.from(heroLeft, {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
    });
  }

  if (heroRight) {
    gsap.from(heroRight, {
      y: 40,
      opacity: 0,
      duration: 1.1,
      delay: 0.15,
      ease: "power3.out",
    });

    // slow orbital rotation
    const heroOrbit = document.querySelector(".hero-orbit");
    if (heroOrbit) {
      gsap.to(heroOrbit, {
        rotate: 360,
        duration: 50,
        repeat: -1,
        ease: "none",
      });
    }
  }

  // --- SECTION HEADERS ---
  gsap.utils.toArray(".section-header").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  });

  // --- ABOUT ---
  const aboutContent = document.querySelector(".about-content");
  if (aboutContent) {
    gsap.from(aboutContent, {
      scrollTrigger: {
        trigger: ".about",
        start: "top 75%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }

  const aboutImage = document.querySelector(".about-image");
  if (aboutImage) {
    gsap.from(aboutImage, {
      scrollTrigger: {
        trigger: ".about",
        start: "top 75%",
      },
      x: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }

  // --- SERVICES CARDS ---
  gsap.utils.toArray(".service-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.05,
      ease: "power3.out",
    });
  });

  // --- FEATURES TIMELINE ---
  gsap.utils.toArray(".feature-item").forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
      x: -40,
      opacity: 0,
      duration: 0.85,
      delay: i * 0.04,
      ease: "power3.out",
    });
  });

  // --- GALLERY ITEMS ---
  gsap.utils.toArray(".gallery-item").forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 0.85,
      delay: i * 0.04,
      ease: "power3.out",
    });
  });

  // --- TESTIMONIALS ---
  const testimonialContent = document.querySelector(".testimonial-content");
  if (testimonialContent) {
    gsap.from(testimonialContent, {
      scrollTrigger: {
        trigger: ".testimonials",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  }

  // --- CONTACT BLOCKS ---
  const contactWrapper = document.querySelector(".contact-wrapper");
  if (contactWrapper) {
    gsap.from(".contact-details", {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
      },
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from(".contact-form-wrapper", {
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
      },
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  }
}

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  if (window.scrollY < 100) {
    navLinks[0]?.classList.add("active");
  }

  activateNavLink();
  initGSAPAnimations();

  console.log("Manufacturing Website Initialized with GSAP animations");
});
