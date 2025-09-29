/**
 * WellMama Redesigned - Modern JavaScript
 * Enhanced functionality with accessibility support
 */

// ============================
// Global State Management
// ============================
const state = {
    currentLang: 'en',
    isMenuOpen: false,
    selectedJourney: null,
    activeSection: 'home'
};

// ============================
// DOM Elements Cache
// ============================
const elements = {
    // Language elements
    langButtons: null,
    langElements: null,

    // Navigation
    mobileMenuToggle: null,
    mobileNav: null,
    navLinks: null,

    // Forms
    expertForm: null,
    newsletterForm: null,

    // Modals
    successModal: null,

    // Other
    backToTop: null,
    journeyCards: null,
    categoryTabs: null,
    adviceCards: null
};

// ============================
// Initialize Application
// ============================
document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initializeLanguage();
    initializeNavigation();
    initializeForms();
    initializeJourneySection();
    initializeAdviceFilters();
    initializeChecklists();
    initializeScrollEffects();
    initializeAccessibility();
});

// ============================
// Cache DOM Elements
// ============================
function cacheElements() {
    elements.langButtons = document.querySelectorAll('[data-lang-switch]');
    elements.langElements = document.querySelectorAll('[data-lang]');
    elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    elements.mobileNav = document.querySelector('.mobile-nav');
    elements.navLinks = document.querySelectorAll('.nav-link');
    elements.expertForm = document.getElementById('expertForm');
    elements.newsletterForm = document.getElementById('newsletterForm');
    elements.successModal = document.getElementById('successModal');
    elements.backToTop = document.getElementById('backToTop');
    elements.journeyCards = document.querySelectorAll('.journey-card');
    elements.categoryTabs = document.querySelectorAll('.category-tab');
    elements.adviceCards = document.querySelectorAll('.advice-card');
}

// ============================
// Language Management
// ============================
function initializeLanguage() {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLang);

    // Add click listeners to language buttons
    elements.langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.langSwitch;
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    state.currentLang = lang;

    // Update language buttons
    elements.langButtons.forEach(btn => {
        const isActive = btn.dataset.langSwitch === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });

    // Update all text elements
    elements.langElements.forEach(element => {
        const isVisible = element.dataset.lang === lang;
        element.classList.toggle('hidden', !isVisible);
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update form placeholders and select options
    updateFormElements(lang);

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

function updateFormElements(lang) {
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-placeholder-en]');
    placeholderElements.forEach(el => {
        const placeholderKey = lang === 'en' ? 'placeholderEn' : 'placeholderRu';
        el.placeholder = el.dataset[placeholderKey] || el.placeholder;
    });

    // Update select options
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        const options = select.querySelectorAll('option[data-text-en]');
        options.forEach(option => {
            const textKey = lang === 'en' ? 'textEn' : 'textRu';
            option.textContent = option.dataset[textKey] || option.textContent;
        });
    });
}

// ============================
// Navigation Management
// ============================
function initializeNavigation() {
    // Mobile menu toggle
    if (elements.mobileMenuToggle && elements.mobileNav) {
        elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking links
        const mobileLinks = elements.mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isMenuOpen) {
                closeMobileMenu();
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Active section highlighting
    observeSections();
}

function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    updateMobileMenuState();
}

function closeMobileMenu() {
    state.isMenuOpen = false;
    updateMobileMenuState();
}

function updateMobileMenuState() {
    elements.mobileMenuToggle.setAttribute('aria-expanded', state.isMenuOpen);
    elements.mobileNav.setAttribute('aria-hidden', !state.isMenuOpen);
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const offset = 80; // Account for fixed header
        const targetPosition = targetElement.offsetTop - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, '', `#${targetId}`);
    }
}

function observeSections() {
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavLink(sectionId);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function updateActiveNavLink(sectionId) {
    elements.navLinks.forEach(link => {
        const linkSection = link.dataset.section;
        link.classList.toggle('active', linkSection === sectionId);
    });
}

// ============================
// Form Management
// ============================
function initializeForms() {
    // Expert form
    if (elements.expertForm) {
        elements.expertForm.addEventListener('submit', handleExpertFormSubmit);

        // Character counter for textarea
        const textarea = elements.expertForm.querySelector('#questionInput');
        const counter = elements.expertForm.querySelector('.char-count');

        if (textarea && counter) {
            textarea.addEventListener('input', () => {
                counter.textContent = textarea.value.length;
            });
        }
    }

    // Newsletter form
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

async function handleExpertFormSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm(e.target)) {
        return;
    }

    // Simulate form submission
    showLoadingState(e.target);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success
    hideLoadingState(e.target);
    showSuccessModal();
    e.target.reset();

    // Track event
    trackEvent('form_submit', 'expert_question');
}

async function handleNewsletterSubmit(e) {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;

    // Simulate submission
    showLoadingState(e.target);
    await new Promise(resolve => setTimeout(resolve, 1000));
    hideLoadingState(e.target);

    // Show success
    showSuccessModal();
    e.target.reset();

    // Track event
    trackEvent('newsletter_signup', email);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = state.currentLang === 'en' ? 'Sending...' : 'Отправка...';
    }
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = state.currentLang === 'en' ? 'Submit' : 'Отправить';
    }
}

// ============================
// Journey Section
// ============================
function initializeJourneySection() {
    elements.journeyCards.forEach(card => {
        card.addEventListener('click', handleJourneyCardClick);
    });
}

function handleJourneyCardClick(e) {
    const stage = e.currentTarget.dataset.stage;

    // Update active state
    elements.journeyCards.forEach(card => {
        card.classList.toggle('active', card.dataset.stage === stage);
    });

    // Show recommendations
    showJourneyRecommendations(stage);
    state.selectedJourney = stage;
}

function showJourneyRecommendations(stage) {
    const recommendations = getRecommendations(stage);
    const resultsContainer = document.getElementById('journey-results');
    const recommendationsEl = resultsContainer.querySelector('.journey-recommendations');

    // Clear and populate
    recommendationsEl.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
            <a href="${rec.link}" class="link-arrow">
                <span>${state.currentLang === 'en' ? 'Learn more' : 'Узнать больше'}</span>
            </a>
        </div>
    `).join('');

    // Show results
    resultsContainer.classList.remove('hidden');

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getRecommendations(stage) {
    const recommendations = {
        expecting: [
            {
                title: state.currentLang === 'en' ? 'Preparing for Birth' : 'Подготовка к родам',
                description: state.currentLang === 'en' ? 'Essential checklist and birth plan guide' : 'Основной чек-лист и план родов',
                link: '#checklists'
            },
            {
                title: state.currentLang === 'en' ? 'Newborn Essentials' : 'Необходимое для новорожденного',
                description: state.currentLang === 'en' ? 'What you really need vs. nice-to-have' : 'Что действительно нужно',
                link: '#checklists'
            }
        ],
        newborn: [
            {
                title: state.currentLang === 'en' ? 'Sleep Foundations' : 'Основы сна',
                description: state.currentLang === 'en' ? 'Setting up healthy sleep habits from day one' : 'Формирование здоровых привычек сна',
                link: '#advice'
            },
            {
                title: state.currentLang === 'en' ? 'Breastfeeding Support' : 'Поддержка грудного вскармливания',
                description: state.currentLang === 'en' ? 'Common challenges and solutions' : 'Частые проблемы и решения',
                link: '#advice'
            }
        ],
        infant: [
            {
                title: state.currentLang === 'en' ? 'Starting Solids' : 'Начало прикорма',
                description: state.currentLang === 'en' ? 'When and how to introduce foods' : 'Когда и как вводить продукты',
                link: '#checklists'
            },
            {
                title: state.currentLang === 'en' ? 'Sleep Schedules' : 'Расписание сна',
                description: state.currentLang === 'en' ? 'Age-appropriate sleep schedules' : 'Расписание сна по возрасту',
                link: '#advice'
            }
        ],
        toddler: [
            {
                title: state.currentLang === 'en' ? 'Toddler Tantrums' : 'Истерики малыша',
                description: state.currentLang === 'en' ? 'Understanding and managing big emotions' : 'Понимание и управление эмоциями',
                link: '#advice'
            },
            {
                title: state.currentLang === 'en' ? 'Potty Training' : 'Приучение к горшку',
                description: state.currentLang === 'en' ? 'Signs of readiness and gentle methods' : 'Признаки готовности и мягкие методы',
                link: '#advice'
            }
        ]
    };

    return recommendations[stage] || [];
}

// ============================
// Advice Filters
// ============================
function initializeAdviceFilters() {
    elements.categoryTabs.forEach(tab => {
        tab.addEventListener('click', handleCategoryFilter);
    });
}

function handleCategoryFilter(e) {
    const category = e.currentTarget.dataset.category;

    // Update active tab
    elements.categoryTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });

    // Filter advice cards
    elements.adviceCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const shouldShow = category === 'all' || cardCategory === category;
        card.style.display = shouldShow ? '' : 'none';
    });
}

// ============================
// Checklists
// ============================
function initializeChecklists() {
    const checklistButtons = document.querySelectorAll('[data-checklist]');

    checklistButtons.forEach(btn => {
        btn.addEventListener('click', handleChecklistDownload);
    });
}

function handleChecklistDownload(e) {
    const checklistType = e.currentTarget.dataset.checklist;

    // Track download
    trackEvent('checklist_download', checklistType);

    // Simulate download
    showToast(state.currentLang === 'en' ?
        'Download starting...' :
        'Загрузка начинается...');

    // In a real app, this would trigger an actual download
    setTimeout(() => {
        showToast(state.currentLang === 'en' ?
            'Download complete!' :
            'Загрузка завершена!');
    }, 2000);
}

// ============================
// Scroll Effects
// ============================
function initializeScrollEffects() {
    // Back to top button
    if (elements.backToTop) {
        window.addEventListener('scroll', throttle(handleBackToTopVisibility, 100));
        elements.backToTop.addEventListener('click', scrollToTop);
    }

    // Parallax effects
    initializeParallax();

    // Fade in animations
    initializeFadeInAnimations();
}

function handleBackToTopVisibility() {
    const scrolled = window.pageYOffset;
    const threshold = 300;

    elements.backToTop.classList.toggle('visible', scrolled > threshold);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

function initializeFadeInAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (animateElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));
}

// ============================
// Accessibility
// ============================
function initializeAccessibility() {
    // Handle keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Announce form errors to screen readers
    setupFormAccessibility();

    // Focus management for modals
    setupModalAccessibility();
}

function handleKeyboardNavigation(e) {
    // Tab trapping for mobile menu
    if (state.isMenuOpen && e.key === 'Tab') {
        trapFocus(elements.mobileNav, e);
    }
}

function trapFocus(container, e) {
    const focusableElements = container.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}

function setupFormAccessibility() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('invalid', (e) => {
            e.preventDefault();

            // Find all invalid fields
            const invalidFields = form.querySelectorAll(':invalid');

            // Focus first invalid field
            if (invalidFields.length > 0) {
                invalidFields[0].focus();

                // Announce error to screen reader
                announceToScreenReader('Please correct the errors in the form');
            }
        }, true);
    });
}

function setupModalAccessibility() {
    if (!elements.successModal) return;

    // Save last focused element
    let lastFocusedElement = null;

    // When modal opens
    window.addEventListener('modal-open', () => {
        lastFocusedElement = document.activeElement;
        elements.successModal.querySelector('button').focus();
    });

    // When modal closes
    window.addEventListener('modal-close', () => {
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    });
}

// ============================
// Modal Management
// ============================
function showSuccessModal() {
    elements.successModal.setAttribute('aria-hidden', 'false');
    window.dispatchEvent(new Event('modal-open'));

    // Auto-close after 5 seconds
    setTimeout(() => {
        closeModal();
    }, 5000);
}

function closeModal() {
    elements.successModal.setAttribute('aria-hidden', 'true');
    window.dispatchEvent(new Event('modal-close'));
}

// Make closeModal globally available
window.closeModal = closeModal;

// ============================
// Toast Notifications
// ============================
function showToast(message, duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    // Add to body
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================
// Analytics
// ============================
function trackEvent(action, label, value = null) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_label: label,
            event_value: value
        });
    }

    // Console log for development
    console.log('Track Event:', { action, label, value });
}

// ============================
// Utility Functions
// ============================
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// ============================
// Toast Styles (inject dynamically)
// ============================
const toastStyles = `
    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--color-text);
        color: white;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-lg);
        z-index: var(--z-toast);
        opacity: 0;
        transition: all var(--transition-base);
    }

    .toast.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }

    .error {
        border-color: var(--color-error) !important;
    }

    .recommendation-card {
        background: white;
        padding: var(--space-lg);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-md);
        border: 2px solid var(--color-border);
        transition: all var(--transition-base);
    }

    .recommendation-card:hover {
        border-color: var(--color-primary);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    .recommendation-card h4 {
        margin-bottom: var(--space-sm);
        color: var(--color-text);
    }

    .recommendation-card p {
        font-size: var(--text-sm);
        color: var(--color-text-light);
        margin-bottom: var(--space-md);
    }
`;

// Inject toast styles
const styleElement = document.createElement('style');
styleElement.textContent = toastStyles;
document.head.appendChild(styleElement);

// ============================
// Service Worker Registration
// ============================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => console.log('ServiceWorker registered:', registration),
            error => console.log('ServiceWorker registration failed:', error)
        );
    });
}