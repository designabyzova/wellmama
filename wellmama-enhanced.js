/**
 * WellMama Enhanced - Advanced JavaScript System
 * Premium interactions, animations, and functionality
 * Mobile-first with progressive enhancement
 */

class WellMamaEnhanced {
    constructor() {
        // State management
        this.state = {
            currentLang: localStorage.getItem('preferredLanguage') || 'en',
            selectedJourney: localStorage.getItem('selectedJourney') || null,
            scrollPosition: 0,
            isLoading: false,
            formData: {},
            theme: localStorage.getItem('theme') || 'light'
        };

        // Animation observers
        this.observers = new Map();

        // Performance tracking
        this.performance = {
            loadTime: performance.now(),
            interactions: []
        };

        // Initialize
        this.init();
    }

    /**
     * Initialize all systems
     */
    async init() {
        try {
            // Core systems
            this.initLanguageSystem();
            this.initNavigation();
            this.initAnimations();
            this.initJourneySelector();
            this.initForms();
            this.initResourceFilters();

            // Enhanced features
            this.initParallaxEffects();
            this.initSmoothScroll();
            this.initLazyLoading();
            this.initKeyboardShortcuts();
            this.initAnalytics();

            // Mobile enhancements
            if (this.isMobile()) {
                this.initTouchGestures();
                this.initMobileOptimizations();
            }

            // Theme system
            this.initThemeSystem();

            console.log('WellMama Enhanced initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
            this.showNotification('error', 'Something went wrong. Please refresh the page.');
        }
    }

    /**
     * Language System with Smooth Transitions
     */
    initLanguageSystem() {
        const currentLang = this.state.currentLang;
        this.setLanguage(currentLang);

        // Language switcher handlers
        document.querySelectorAll('.language-switcher').forEach(switcher => {
            switcher.addEventListener('click', () => this.toggleLanguage());
        });

        // Keyboard shortcut: Alt + L
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'l') {
                this.toggleLanguage();
            }
        });
    }

    toggleLanguage() {
        const newLang = this.state.currentLang === 'en' ? 'ru' : 'en';
        this.setLanguage(newLang);

        // Smooth transition effect
        this.animateLanguageSwitch();

        // Update analytics
        this.trackEvent('language_switch', { from: this.state.currentLang, to: newLang });
    }

    setLanguage(lang) {
        this.state.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);

        // Update UI with fade animation
        const elements = {
            en: document.querySelectorAll('.lang-en'),
            ru: document.querySelectorAll('.lang-ru')
        };

        // Fade out current language
        Object.values(elements).flat().forEach(el => {
            el.style.transition = 'opacity 0.2s ease-out';
        });

        // Update visibility
        elements.en.forEach(el => {
            if (lang === 'en') {
                el.classList.remove('hidden');
                setTimeout(() => el.style.opacity = '1', 10);
            } else {
                el.style.opacity = '0';
                setTimeout(() => el.classList.add('hidden'), 200);
            }
        });

        elements.ru.forEach(el => {
            if (lang === 'ru') {
                el.classList.remove('hidden');
                setTimeout(() => el.style.opacity = '1', 10);
            } else {
                el.style.opacity = '0';
                setTimeout(() => el.classList.add('hidden'), 200);
            }
        });

        // Update language indicators
        this.updateLanguageIndicators(lang);
    }

    updateLanguageIndicators(lang) {
        document.querySelectorAll('.lang-indicator').forEach(indicator => {
            const isActive =
                (indicator.textContent === 'EN' && lang === 'en') ||
                (indicator.textContent === 'RU' && lang === 'ru');

            indicator.classList.toggle('active', isActive);
        });
    }

    animateLanguageSwitch() {
        const content = document.querySelector('.hero-content');
        if (!content) return;

        content.style.transform = 'scale(0.98)';
        content.style.opacity = '0.8';

        setTimeout(() => {
            content.style.transform = '';
            content.style.opacity = '';
        }, 300);
    }

    /**
     * Enhanced Navigation System
     */
    initNavigation() {
        const nav = document.querySelector('.premium-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.getElementById('mobileNav');

        // Scroll effects
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Add scrolled class
            nav?.classList.toggle('scrolled', currentScroll > 50);

            // Hide/show nav on scroll (mobile only)
            if (this.isMobile() && currentScroll > 100) {
                if (currentScroll > lastScroll) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }
            }

            lastScroll = currentScroll;
            this.state.scrollPosition = currentScroll;
        });

        // Mobile menu toggle
        mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!mobileNav?.contains(e.target) && !mobileToggle?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        const toggle = document.querySelector('.mobile-menu-toggle');

        mobileNav?.classList.toggle('active');
        toggle?.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNav?.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        const toggle = document.querySelector('.mobile-menu-toggle');

        mobileNav?.classList.remove('active');
        toggle?.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Advanced Animation System
     */
    initAnimations() {
        // Intersection Observer for scroll animations
        const animationObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');

                        // Stagger animations for child elements
                        const children = entry.target.querySelectorAll('[data-animate-child]');
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animate-in');
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        // Observe elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            animationObserver.observe(el);
        });

        this.observers.set('animation', animationObserver);
    }

    /**
     * Journey Selector with State Persistence
     */
    initJourneySelector() {
        const cards = document.querySelectorAll('.journey-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const journey = card.dataset.journey;
                this.selectJourney(journey);
            });

            // Keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const journey = card.dataset.journey;
                    this.selectJourney(journey);
                }
            });
        });

        // Load saved journey
        if (this.state.selectedJourney) {
            this.selectJourney(this.state.selectedJourney);
        }
    }

    selectJourney(journey) {
        // Update state
        this.state.selectedJourney = journey;
        localStorage.setItem('selectedJourney', journey);

        // Update UI
        document.querySelectorAll('.journey-card').forEach(card => {
            card.classList.toggle('active', card.dataset.journey === journey);
        });

        // Filter resources
        this.filterResourcesByJourney(journey);

        // Smooth scroll to resources
        setTimeout(() => {
            document.getElementById('resources')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);

        // Track event
        this.trackEvent('journey_selected', { journey });
    }

    filterResourcesByJourney(journey) {
        const resources = document.querySelectorAll('.resource-card');

        resources.forEach(card => {
            const cardJourney = card.dataset.journey;
            const shouldShow = !journey || cardJourney === journey || cardJourney === 'all';

            if (shouldShow) {
                card.style.display = '';
                setTimeout(() => card.classList.add('fade-in'), 10);
            } else {
                card.classList.remove('fade-in');
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    }

    /**
     * Enhanced Form System with Validation
     */
    initForms() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            // Real-time validation
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
            });

            // Form submission
            form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));

            // Auto-save form data
            this.initFormAutoSave(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';

        // Required field check
        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Update UI
        this.updateFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    updateFieldValidation(field, isValid, errorMessage) {
        const parent = field.parentElement;
        const existingError = parent.querySelector('.field-error');

        // Remove existing error
        existingError?.remove();
        parent.classList.remove('error', 'success');

        if (!isValid) {
            parent.classList.add('error');

            const errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            errorEl.textContent = errorMessage;
            parent.appendChild(errorEl);
        } else if (field.value.trim()) {
            parent.classList.add('success');
        }
    }

    clearFieldError(field) {
        const parent = field.parentElement;
        parent.classList.remove('error');
        parent.querySelector('.field-error')?.remove();
    }

    async handleFormSubmit(e, form) {
        e.preventDefault();

        // Validate all fields
        const fields = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('error', 'Please fix the errors in the form');
            return;
        }

        // Show loading state
        this.setFormLoading(form, true);

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            // Simulate API call
            await this.submitFormData(data);

            // Success
            this.showNotification('success', 'Thank you! We\'ll be in touch soon.');
            form.reset();
            this.clearFormAutoSave(form);

            // Track conversion
            this.trackEvent('form_submission', {
                formType: form.dataset.formType || 'contact',
                journey: this.state.selectedJourney
            });

        } catch (error) {
            this.showNotification('error', 'Something went wrong. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            this.setFormLoading(form, false);
        }
    }

    setFormLoading(form, isLoading) {
        const submitBtn = form.querySelector('[type="submit"]');

        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = submitBtn.dataset.originalText || 'Submit';
        }
    }

    async submitFormData(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In production, this would be an actual API call
        console.log('Form data submitted:', data);

        // Store lead in localStorage for demo
        const leads = JSON.parse(localStorage.getItem('wellmama_leads') || '[]');
        leads.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('wellmama_leads', JSON.stringify(leads));
    }

    initFormAutoSave(form) {
        const formId = form.id || 'default-form';

        form.addEventListener('input', () => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem(`wellmama_form_${formId}`, JSON.stringify(data));
        });

        // Restore saved data
        const savedData = localStorage.getItem(`wellmama_form_${formId}`);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = form.elements[key];
                    if (field) field.value = data[key];
                });
            } catch (e) {
                console.error('Error restoring form data:', e);
            }
        }
    }

    clearFormAutoSave(form) {
        const formId = form.id || 'default-form';
        localStorage.removeItem(`wellmama_form_${formId}`);
    }

    /**
     * Resource Filters with Animation
     */
    initResourceFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterResources(category, btn);
            });
        });
    }

    filterResources(category, activeBtn) {
        // Update button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn === activeBtn);
        });

        // Filter cards with animation
        const cards = document.querySelectorAll('.resource-card');

        cards.forEach((card, index) => {
            const cardCategory = card.dataset.category;
            const shouldShow = !category || category === 'all' || cardCategory === category;

            if (shouldShow) {
                card.style.display = '';
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 50); // Stagger effect
            } else {
                card.classList.remove('fade-in');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Track filter usage
        this.trackEvent('resource_filter', { category });
    }

    /**
     * Parallax Effects System
     */
    initParallaxEffects() {
        if (this.prefersReducedMotion()) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');

        const handleParallax = () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        };

        // Throttled scroll handler
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Smooth Scroll System
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    const offset = 80; // Nav height
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without scrolling
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    /**
     * Lazy Loading System
     */
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        lazyImages.forEach(img => imageObserver.observe(img));
        this.observers.set('lazyload', imageObserver);
    }

    /**
     * Keyboard Shortcuts
     */
    initKeyboardShortcuts() {
        const shortcuts = {
            'Escape': () => this.closeAllModals(),
            '/': (e) => {
                e.preventDefault();
                document.querySelector('.search-input')?.focus();
            },
            'ArrowLeft': () => this.navigateTestimonials('prev'),
            'ArrowRight': () => this.navigateTestimonials('next')
        };

        document.addEventListener('keydown', (e) => {
            const handler = shortcuts[e.key];
            if (handler && !e.target.matches('input, textarea')) {
                handler(e);
            }
        });
    }

    /**
     * Touch Gestures for Mobile
     */
    initTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Horizontal swipe (testimonials, gallery, etc.)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.handleSwipe('right');
                } else {
                    this.handleSwipe('left');
                }
            }
        });
    }

    handleSwipe(direction) {
        // Handle testimonial navigation
        const testimonialSection = document.querySelector('.testimonials-section');
        if (testimonialSection && this.isInViewport(testimonialSection)) {
            this.navigateTestimonials(direction === 'left' ? 'next' : 'prev');
        }
    }

    navigateTestimonials(direction) {
        // Testimonial navigation logic
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (!testimonials.length) return;

        const currentActive = document.querySelector('.testimonial-card.active');
        const currentIndex = Array.from(testimonials).indexOf(currentActive);

        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % testimonials.length;
        } else {
            newIndex = currentIndex - 1 < 0 ? testimonials.length - 1 : currentIndex - 1;
        }

        testimonials[currentIndex]?.classList.remove('active');
        testimonials[newIndex]?.classList.add('active');
    }

    /**
     * Mobile Optimizations
     */
    initMobileOptimizations() {
        // Disable hover effects on touch
        document.addEventListener('touchstart', () => {
            document.body.classList.add('touch-device');
        });

        // Optimize animations for mobile
        if (this.isMobile()) {
            document.documentElement.style.setProperty('--duration-normal', '200ms');
            document.documentElement.style.setProperty('--duration-slow', '300ms');
        }

        // Viewport height fix for mobile browsers
        this.setViewportHeight();
        window.addEventListener('resize', () => this.setViewportHeight());
    }

    setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    /**
     * Theme System
     */
    initThemeSystem() {
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        this.setTheme(theme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        this.state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.trackEvent('theme_change', { theme: newTheme });
    }

    /**
     * Analytics System
     */
    initAnalytics() {
        // Track page view
        this.trackEvent('page_view', {
            page: window.location.pathname,
            referrer: document.referrer,
            language: this.state.currentLang
        });

        // Track engagement metrics
        this.trackEngagement();
    }

    trackEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            data: {
                ...data,
                timestamp: new Date().toISOString(),
                sessionId: this.getSessionId(),
                userId: this.getUserId()
            }
        };

        // Store locally for demo
        const events = JSON.parse(localStorage.getItem('wellmama_analytics') || '[]');
        events.push(event);
        localStorage.setItem('wellmama_analytics', JSON.stringify(events));

        // In production, send to analytics service
        console.log('Analytics Event:', event);
    }

    trackEngagement() {
        let engagementTime = 0;
        let isEngaged = true;

        // Track time on page
        setInterval(() => {
            if (isEngaged) {
                engagementTime += 1;

                // Track milestones
                if (engagementTime === 30) {
                    this.trackEvent('engagement_30s');
                } else if (engagementTime === 60) {
                    this.trackEvent('engagement_1m');
                } else if (engagementTime === 180) {
                    this.trackEvent('engagement_3m');
                }
            }
        }, 1000);

        // Track if user is engaged
        document.addEventListener('visibilitychange', () => {
            isEngaged = !document.hidden;
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;

                if ([25, 50, 75, 100].includes(maxScroll)) {
                    this.trackEvent(`scroll_${maxScroll}`, { depth: maxScroll });
                }
            }
        });
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('wellmama_session_id');
        if (!sessionId) {
            sessionId = this.generateId();
            sessionStorage.setItem('wellmama_session_id', sessionId);
        }
        return sessionId;
    }

    getUserId() {
        let userId = localStorage.getItem('wellmama_user_id');
        if (!userId) {
            userId = this.generateId();
            localStorage.setItem('wellmama_user_id', userId);
        }
        return userId;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Notification System
     */
    showNotification(type, message, duration = 4000) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Add styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    z-index: 9999;
                    animation: slideIn 0.3s ease-out;
                    max-width: 90vw;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }

                .notification-success {
                    border-left: 4px solid #10B981;
                }

                .notification-error {
                    border-left: 4px solid #EF4444;
                }

                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .notification-icon {
                    font-size: 20px;
                }

                .notification-success .notification-icon {
                    color: #10B981;
                }

                .notification-error .notification-icon {
                    color: #EF4444;
                }

                .notification-message {
                    color: #1F2937;
                    font-size: 14px;
                }

                .notification-close {
                    background: transparent;
                    border: none;
                    color: #9CA3AF;
                    cursor: pointer;
                    font-size: 24px;
                    padding: 0;
                    margin-left: 12px;
                }

                .notification-close:hover {
                    color: #1F2937;
                }
            `;
            document.head.appendChild(styles);
        }

        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            notification.style.animationFillMode = 'forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    /**
     * Utility Functions
     */
    isMobile() {
        return window.innerWidth < 768;
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    }

    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    /**
     * Cleanup on page unload
     */
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();

        // Track session end
        this.trackEvent('session_end', {
            duration: performance.now() - this.performance.loadTime
        });
    }
}

// Global instance
let wellmama;

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        wellmama = new WellMamaEnhanced();
    });
} else {
    wellmama = new WellMamaEnhanced();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    wellmama?.destroy();
});

// Global functions for inline HTML calls
function toggleLanguage() {
    wellmama?.toggleLanguage();
}

function toggleMobileMenu() {
    wellmama?.toggleMobileMenu();
}

function closeMobileMenu() {
    wellmama?.closeMobileMenu();
}

function selectJourney(journey) {
    wellmama?.selectJourney(journey);
}

function toggleTheme() {
    wellmama?.toggleTheme();
}