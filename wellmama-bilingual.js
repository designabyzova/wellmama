// WellMama Bilingual - Enhanced Language Support

// Current language state
let currentLang = localStorage.getItem('preferredLanguage') || 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    setLanguage(currentLang);

    // Initialize animations
    initializeAnimations();

    // Initialize smooth scrolling
    initializeSmoothScroll();

    // Initialize back to top
    initializeBackToTop();
});

// Language Toggle Function
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    setLanguage(currentLang);

    // Save preference
    localStorage.setItem('preferredLanguage', currentLang);
}

// Set Language Function
function setLanguage(lang) {
    // Update language toggle button
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        if (lang === 'en') {
            langToggle.innerHTML = '<span class="lang-active">EN</span> / <span class="lang-inactive">RU</span>';
        } else {
            langToggle.innerHTML = '<span class="lang-inactive">EN</span> / <span class="lang-active">RU</span>';
        }
    }

    // Update all language-specific elements
    document.querySelectorAll('.lang-en').forEach(el => {
        el.classList.toggle('hidden', lang !== 'en');
    });

    document.querySelectorAll('.lang-ru').forEach(el => {
        el.classList.toggle('hidden', lang !== 'ru');
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update form placeholders
    updateFormPlaceholders(lang);

    // Update select options
    updateSelectOptions(lang);
}

// Update form placeholders
function updateFormPlaceholders(lang) {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        if (lang === 'ru') {
            input.placeholder = 'ваша@почта.com';
        } else {
            input.placeholder = 'your@email.com';
        }
    });

    const questionTextarea = document.getElementById('question');
    const questionTextareaRu = document.getElementById('question-ru');

    if (questionTextarea && questionTextareaRu) {
        if (lang === 'ru') {
            questionTextarea.style.display = 'none';
            questionTextareaRu.style.display = 'block';
        } else {
            questionTextarea.style.display = 'block';
            questionTextareaRu.style.display = 'none';
        }
    }
}

// Update select options dynamically
function updateSelectOptions(lang) {
    const topicSelect = document.getElementById('topic');
    if (topicSelect) {
        const options = {
            '': lang === 'en' ? 'Choose a topic...' : 'Выберите тему...',
            'sleep': lang === 'en' ? 'Sleep Issues' : 'Проблемы со сном',
            'feeding': lang === 'en' ? 'Feeding & Nutrition' : 'Кормление и питание',
            'health': lang === 'en' ? 'Health Concerns' : 'Вопросы здоровья',
            'behavior': lang === 'en' ? 'Behavior & Development' : 'Поведение и развитие',
            'selfcare': lang === 'en' ? 'Parent Wellbeing' : 'Благополучие родителей',
            'other': lang === 'en' ? 'Something Else' : 'Другое'
        };

        topicSelect.querySelectorAll('option').forEach(option => {
            if (options[option.value]) {
                option.textContent = options[option.value];
            }
        });
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Topic Selection with Bilingual Support
function selectTopic(topic) {
    // Update active state
    const cards = document.querySelectorAll('.topic-card');
    cards.forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Show resources
    const resourcesDiv = document.getElementById('topic-resources');
    const resourcesList = resourcesDiv.querySelector('.resources-list');

    // Define bilingual resources
    const resources = {
        sleep: {
            en: [
                '📄 4-Month Sleep Regression Guide',
                '📹 Video: Swaddling Techniques',
                '📋 Sleep Schedule Templates',
                '💬 Join Sleep Support Group'
            ],
            ru: [
                '📄 Руководство по регрессу сна в 4 месяца',
                '📹 Видео: Техники пеленания',
                '📋 Шаблоны режима сна',
                '💬 Присоединиться к группе поддержки'
            ]
        },
        feeding: {
            en: [
                '📄 Breastfeeding Position Guide',
                '📹 Video: Proper Latch Technique',
                '📋 Feeding Schedule Tracker',
                '💬 Connect with Lactation Consultant'
            ],
            ru: [
                '📄 Руководство по позам для кормления',
                '📹 Видео: Правильное прикладывание',
                '📋 Дневник кормления',
                '💬 Связаться с консультантом по ГВ'
            ]
        },
        crying: {
            en: [
                '📄 5 S\'s Soothing Method',
                '📹 Video: Calming Techniques',
                '📋 Crying Patterns Tracker',
                '💬 Ask an Expert Now'
            ],
            ru: [
                '📄 Метод 5 П для успокоения',
                '📹 Видео: Техники успокоения',
                '📋 Дневник плача',
                '💬 Спросить эксперта сейчас'
            ]
        },
        development: {
            en: [
                '📄 Milestone Chart by Age',
                '📹 Video: Tummy Time Tips',
                '📋 Development Checklist',
                '💬 Join Development Discussion'
            ],
            ru: [
                '📄 Таблица развития по возрасту',
                '📹 Видео: Время на животике',
                '📋 Чек-лист развития',
                '💬 Присоединиться к обсуждению'
            ]
        },
        selfcare: {
            en: [
                '📄 Postpartum Recovery Guide',
                '📹 Video: Quick Relaxation',
                '📋 Self-Care Planner',
                '💬 Mental Health Support Group'
            ],
            ru: [
                '📄 Восстановление после родов',
                '📹 Видео: Быстрая релаксация',
                '📋 Планировщик заботы о себе',
                '💬 Группа психологической поддержки'
            ]
        },
        emergency: {
            en: [
                '🚨 When to Call 911',
                '📞 Pediatrician Hotline',
                '📄 Red Flags Checklist',
                '🏥 Find Nearest ER'
            ],
            ru: [
                '🚨 Когда звонить 03',
                '📞 Горячая линия педиатра',
                '📄 Тревожные признаки',
                '🏥 Найти ближайшую скорую помощь'
            ]
        }
    };

    // Display resources in current language
    const langResources = resources[topic][currentLang];
    resourcesList.innerHTML = langResources.map(resource =>
        `<div class="resource-item">
            <a href="#" class="btn btn-outline">${resource}</a>
        </div>`
    ).join('');

    resourcesDiv.classList.remove('hidden');

    // Scroll to resources
    resourcesDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Tab Management
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Mark button as active
    event.currentTarget.classList.add('active');
}

// Form Handling with Bilingual Messages
function handleSubmit(event) {
    event.preventDefault();

    // Show success modal
    showModal();

    // Reset form
    event.target.reset();
}

function handleNewsletter(event) {
    event.preventDefault();

    // Show bilingual success message
    const message = currentLang === 'en' ?
        'Thank you for subscribing! Check your email for the New Mom Survival Kit.' :
        'Спасибо за подписку! Проверьте почту для получения Набора выживания молодой мамы.';

    alert(message);

    // Reset form
    event.target.reset();
}

// Modal Functions
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Back to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize Smooth Scrolling
function initializeSmoothScroll() {
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
}

// Initialize Back to Top Button
function initializeBackToTop() {
    window.addEventListener('scroll', () => {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Update active nav link
        updateActiveNavLink();
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Initialize Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animatedElements = [
        '.topic-card',
        '.article-card',
        '.community-card',
        '.testimonial',
        '.stat'
    ];

    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
            observer.observe(element);
        });
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal on Escape
    if (e.key === 'Escape') {
        closeModal();
        closeMobileMenu();
    }

    // Language switch with Alt + L
    if (e.altKey && e.key === 'l') {
        toggleLanguage();
    }
});