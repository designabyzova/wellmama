// WellMama V2 - Clean & Simple JavaScript

// Language Management
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    updateLanguageDisplay();
}

function updateLanguageDisplay() {
    // Update language toggle button
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        if (currentLang === 'en') {
            langToggle.innerHTML = '<span class="lang-active">EN</span> / <span class="lang-inactive">RU</span>';
        } else {
            langToggle.innerHTML = '<span class="lang-inactive">EN</span> / <span class="lang-active">RU</span>';
        }
    }

    // Update all text elements
    document.querySelectorAll('[data-en]').forEach(el => {
        if (currentLang === 'en') {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    document.querySelectorAll('[data-ru]').forEach(el => {
        if (currentLang === 'ru') {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    // Save preference
    localStorage.setItem('preferredLanguage', currentLang);
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Topic Selection
function selectTopic(topic) {
    // Update active state
    const cards = document.querySelectorAll('.topic-card');
    cards.forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Show resources
    const resourcesDiv = document.getElementById('topic-resources');
    const resourcesList = resourcesDiv.querySelector('.resources-list');

    // Define resources for each topic
    const resources = {
        sleep: [
            '📄 4-Month Sleep Regression Guide',
            '📹 Video: Swaddling Techniques',
            '📋 Sleep Schedule Templates',
            '💬 Join Sleep Support Group'
        ],
        feeding: [
            '📄 Breastfeeding Position Guide',
            '📹 Video: Proper Latch Technique',
            '📋 Feeding Schedule Tracker',
            '💬 Connect with Lactation Consultant'
        ],
        crying: [
            '📄 5 S\'s Soothing Method',
            '📹 Video: Calming Techniques',
            '📋 Crying Patterns Tracker',
            '💬 Ask an Expert Now'
        ],
        development: [
            '📄 Milestone Chart by Age',
            '📹 Video: Tummy Time Tips',
            '📋 Development Checklist',
            '💬 Join Development Discussion'
        ],
        selfcare: [
            '📄 Postpartum Recovery Guide',
            '📹 Video: Quick Relaxation',
            '📋 Self-Care Planner',
            '💬 Mental Health Support Group'
        ],
        emergency: [
            '🚨 When to Call 911',
            '📞 Pediatrician Hotline',
            '📄 Red Flags Checklist',
            '🏥 Find Nearest ER'
        ]
    };

    // Display resources
    resourcesList.innerHTML = resources[topic].map(resource =>
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

// Form Handling
function handleSubmit(event) {
    event.preventDefault();

    // Show success modal
    showModal();

    // Reset form
    event.target.reset();
}

function handleNewsletter(event) {
    event.preventDefault();

    // Show success message
    alert(currentLang === 'en' ?
        'Thank you for subscribing! Check your email for the New Mom Survival Kit.' :
        'Спасибо за подписку! Проверьте вашу почту для получения набора выживания.');

    // Reset form
    event.target.reset();
}

// Modal
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

// Smooth Scrolling for Navigation
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

// Show/Hide Back to Top Button
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Update active nav link
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
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguageDisplay();
    }

    // Add animation to cards on scroll
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

    // Animate topic cards
    document.querySelectorAll('.topic-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Animate article cards
    document.querySelectorAll('.article-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Animate community cards
    document.querySelectorAll('.community-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});

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
});