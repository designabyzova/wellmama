// WellMama Premium - Luxury Experience JavaScript

// Premium Initialization
class WellMamaPremium {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.selectedJourney = null;
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);

        // Initialize premium features
        this.initPremiumAnimations();
        this.initSmoothScroll();
        this.initParallaxEffects();
        this.initJourneySelector();
        this.initResourceFilters();
        this.initExpertProfiles();
        this.initFormValidation();
        this.initTestimonialSlider();
        this.initBackToTop();
        this.initMobileMenu();

        // Add premium hover effects
        this.initHoverEffects();

        // Initialize loading animations
        this.initLoadingAnimations();
    }

    // Language Management with Smooth Transitions
    toggleLanguage() {
        // Add fade transition
        document.body.style.opacity = '0.95';

        setTimeout(() => {
            this.currentLang = this.currentLang === 'en' ? 'ru' : 'en';
            this.setLanguage(this.currentLang);
            localStorage.setItem('preferredLanguage', this.currentLang);

            // Restore opacity with animation
            document.body.style.opacity = '1';
        }, 200);
    }

    setLanguage(lang) {
        // Update language toggle with animation - Fixed to work with actual HTML structure
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher) {
            const indicators = languageSwitcher.querySelectorAll('.lang-indicator');
            if (indicators.length === 2) {
                if (lang === 'en') {
                    indicators[0].classList.add('active');
                    indicators[1].classList.remove('active');
                } else {
                    indicators[0].classList.remove('active');
                    indicators[1].classList.add('active');
                }
            }
        }

        // Smooth language content transition - Fixed to properly handle hidden class
        document.querySelectorAll('.lang-en').forEach(el => {
            if (lang === 'en') {
                el.classList.remove('hidden');
                el.style.display = 'block';
                el.style.opacity = '1';
            } else {
                el.classList.add('hidden');
                el.style.opacity = '0';
                el.style.display = 'none';
            }
        });

        document.querySelectorAll('.lang-ru').forEach(el => {
            if (lang === 'ru') {
                el.classList.remove('hidden');
                el.style.display = 'block';
                el.style.opacity = '1';
            } else {
                el.classList.add('hidden');
                el.style.opacity = '0';
                el.style.display = 'none';
            }
        });

        // Update form elements with proper language
        this.updateFormLanguage(lang);

        document.documentElement.lang = lang;
    }

    // Update form elements to show text in selected language only
    updateFormLanguage(lang) {
        // Update select dropdown options
        const ageSelect = document.getElementById('ageRangeSelect');
        if (ageSelect) {
            const options = ageSelect.querySelectorAll('option');
            options.forEach(option => {
                const text = lang === 'en' ? option.getAttribute('data-en') : option.getAttribute('data-ru');
                if (text) {
                    option.textContent = text;
                }
            });
        }

        // Update textarea placeholder
        const questionTextarea = document.getElementById('questionTextarea');
        if (questionTextarea) {
            const placeholder = lang === 'en'
                ? questionTextarea.getAttribute('data-placeholder-en')
                : questionTextarea.getAttribute('data-placeholder-ru');
            if (placeholder) {
                questionTextarea.setAttribute('placeholder', placeholder);
            }
        }

        // Update any other form elements with data attributes
        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            const placeholder = lang === 'en'
                ? el.getAttribute('data-placeholder-en')
                : el.getAttribute('data-placeholder-ru');
            if (placeholder && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
                el.setAttribute('placeholder', placeholder);
            }
        });
    }

    // Premium Animations
    initPremiumAnimations() {
        // Floating spheres with mouse interaction
        document.addEventListener('mousemove', (e) => {
            const spheres = document.querySelectorAll('.gradient-sphere');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            spheres.forEach((sphere, index) => {
                const speed = (index + 1) * 0.5;
                sphere.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
            });
        });

        // Text shimmer effect on scroll
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const shimmerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('shimmer-active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.gradient-text').forEach(text => {
            shimmerObserver.observe(text);
        });
    }

    // Smooth Parallax Scrolling
    initParallaxEffects() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;

            // Hero parallax
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            // Floating elements parallax
            document.querySelectorAll('.gradient-sphere').forEach((sphere, i) => {
                sphere.style.transform = `translateY(${scrolled * (0.2 * (i + 1))}px)`;
            });

            // Stats counter animation
            if (scrolled > 500) {
                this.animateStats();
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Premium Journey Selector
    initJourneySelector() {
        const journeyCards = document.querySelectorAll('.journey-card');

        journeyCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active from all
                journeyCards.forEach(c => c.classList.remove('active'));

                // Add active with animation
                card.classList.add('active');
                card.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 300);

                // Get journey type
                const journey = card.dataset.journey;
                this.selectedJourney = journey;

                // Show personalized resources
                this.showJourneyResources(journey);

                // Smooth scroll to resources
                const resources = document.getElementById('resources');
                if (resources) {
                    resources.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    showJourneyResources(journey) {
        const resourcesGrid = document.querySelector('.resources-grid');
        if (!resourcesGrid) return;

        // Add loading effect
        resourcesGrid.style.opacity = '0.5';

        setTimeout(() => {
            // Filter resources based on journey
            const allResources = resourcesGrid.querySelectorAll('.resource-card');
            allResources.forEach(card => {
                if (card.dataset.journey === journey || card.dataset.journey === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            resourcesGrid.style.opacity = '1';
        }, 300);
    }

    // Resource Filters with Premium Animations
    initResourceFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Animate button selection
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterType = btn.dataset.filter;
                this.filterResources(filterType);
            });
        });
    }

    filterResources(type) {
        const resources = document.querySelectorAll('.resource-card');

        resources.forEach((card, index) => {
            const cardType = card.dataset.type;

            if (type === 'all' || cardType === type) {
                setTimeout(() => {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                }, index * 50);
            } else {
                card.classList.remove('fade-in');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Expert Profiles Interaction
    initExpertProfiles() {
        const experts = document.querySelectorAll('.expert-card');

        experts.forEach(expert => {
            expert.addEventListener('mouseenter', () => {
                // Add premium hover effect
                expert.querySelector('.expert-photo').style.transform = 'scale(1.1)';
                expert.querySelector('.expert-credentials').style.opacity = '1';
            });

            expert.addEventListener('mouseleave', () => {
                expert.querySelector('.expert-photo').style.transform = 'scale(1)';
                expert.querySelector('.expert-credentials').style.opacity = '0.9';
            });

            expert.addEventListener('click', () => {
                this.showExpertModal(expert);
            });
        });
    }

    showExpertModal(expert) {
        // Create premium modal
        const modal = document.createElement('div');
        modal.className = 'expert-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-expert-info">
                    ${expert.innerHTML}
                    <button class="btn btn-gradient">Book Consultation</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate modal entrance
        setTimeout(() => modal.classList.add('active'), 10);

        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }

    // Premium Form Validation
    initFormValidation() {
        const form = document.querySelector('.consultation-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Premium focus effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.validateForm(form)) {
                this.submitForm(form);
            }
        });
    }

    validateField(field) {
        const parent = field.parentElement;
        parent.classList.remove('error', 'success');

        if (field.hasAttribute('required') && !field.value.trim()) {
            parent.classList.add('error');
            this.showFieldMessage(parent, 'This field is required');
            return false;
        }

        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                parent.classList.add('error');
                this.showFieldMessage(parent, 'Please enter a valid email');
                return false;
            }
        }

        parent.classList.add('success');
        return true;
    }

    showFieldMessage(parent, message) {
        let messageEl = parent.querySelector('.field-message');
        if (!messageEl) {
            messageEl = document.createElement('span');
            messageEl.className = 'field-message';
            parent.appendChild(messageEl);
        }
        messageEl.textContent = message;

        setTimeout(() => {
            messageEl.style.opacity = '1';
        }, 10);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                valid = false;
            }
        });

        return valid;
    }

    submitForm(form) {
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate submission
        setTimeout(() => {
            // Show success message
            this.showSuccessModal();

            // Reset form
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    showSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✓</div>
                <h3>${this.currentLang === 'en' ? 'Thank You!' : 'Спасибо!'}</h3>
                <p>${this.currentLang === 'en' ?
                    'We\'ll connect you with an expert within 24 hours.' :
                    'Мы свяжем вас с экспертом в течение 24 часов.'}</p>
                <button class="btn btn-gradient" onclick="wellmama.closeSuccessModal()">
                    ${this.currentLang === 'en' ? 'Continue' : 'Продолжить'}
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    closeSuccessModal() {
        const modal = document.querySelector('.success-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    }

    // Testimonial Slider
    initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length === 0) return;

        let currentIndex = 0;

        // Auto-rotate testimonials
        setInterval(() => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        }, 5000);
    }

    // Stats Counter Animation
    animateStats() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            if (stat.dataset.animated) return;

            const target = parseInt(stat.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    stat.dataset.animated = 'true';
                }

                stat.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }

    // Premium Hover Effects
    initHoverEffects() {
        // Card tilt effect
        document.querySelectorAll('.resource-card, .expert-card, .journey-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Button ripple effect
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'ripple';

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Loading Animations
    initLoadingAnimations() {
        // Fade in elements on load
        const animateElements = [
            '.hero-headline',
            '.hero-description',
            '.journey-card',
            '.resource-card',
            '.expert-card'
        ];

        animateElements.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }

    // Smooth Scroll
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const offset = 100;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Back to Top
    initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu
    initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Close on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }
}

// Initialize Premium Experience
const wellmama = new WellMamaPremium();

// Ensure language is properly set on page load
document.addEventListener('DOMContentLoaded', () => {
    // Force refresh of language display
    wellmama.setLanguage(wellmama.currentLang);
});

// Global functions for inline HTML calls
function toggleLanguage() {
    wellmama.toggleLanguage();
}

function selectJourney(journey) {
    wellmama.selectedJourney = journey;
    wellmama.showJourneyResources(journey);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add custom cursor effect for premium experience
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Cursor effects on interactive elements
    document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
});

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add page transition effects
window.addEventListener('beforeunload', () => {
    document.body.classList.add('page-exit');
});

// Premium keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + L for language toggle
    if (e.altKey && e.key === 'l') {
        wellmama.toggleLanguage();
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        wellmama.closeSuccessModal();
        document.querySelector('.mobile-menu')?.classList.remove('active');
    }

    // Ctrl/Cmd + K for quick search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Future: Open quick search modal
    }
});