/**
 * WellMama Mobile - Mobile-specific JavaScript
 * Handles mobile menu and touch interactions
 */

// Mobile Menu Management
let mobileMenuOpen = false;

/**
 * Toggle mobile menu open/close
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const body = document.body;

    if (!mobileMenuOpen) {
        // Open menu
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        hamburgerMenu.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scroll when menu is open
        mobileMenuOpen = true;
    } else {
        // Close menu
        closeMobileMenu();
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const body = document.body;

    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    hamburgerMenu.classList.remove('active');
    body.style.overflow = ''; // Restore scroll
    mobileMenuOpen = false;
}

// Close menu when clicking overlay
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu if window is resized to desktop
            if (window.innerWidth > 767) {
                closeMobileMenu();
            }
        }, 250);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                if (mobileMenuOpen) {
                    closeMobileMenu();
                }

                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.premium-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // iOS Viewport Height Fix
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Touch handling for better mobile experience
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, false);

    function handleSwipeGesture() {
        // Only handle swipe if menu is open
        if (!mobileMenuOpen) return;

        // Swipe right to close menu
        if (touchEndX > touchStartX + 50) {
            closeMobileMenu();
        }
    }

    // Prevent double-tap zoom on buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Handle sticky CTA visibility on scroll (mobile only)
    if (window.innerWidth <= 767) {
        let lastScrollTop = 0;
        const stickyCTA = document.querySelector('.mobile-sticky-cta');

        if (stickyCTA) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Show sticky CTA after scrolling past hero
                if (scrollTop > 600) {
                    stickyCTA.classList.add('show');
                } else {
                    stickyCTA.classList.remove('show');
                }

                lastScrollTop = scrollTop;
            }, false);
        }
    }

    // Form input zoom prevention (iOS)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth <= 767) {
                // Temporarily set viewport to prevent zoom
                const viewport = document.querySelector('meta[name="viewport"]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            }
        });

        input.addEventListener('blur', function() {
            // Restore viewport
            const viewport = document.querySelector('meta[name="viewport"]');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        });
    });

    // Optimize animations for mobile
    if (window.innerWidth <= 767) {
        // Reduce animation complexity on mobile
        document.documentElement.style.setProperty('--animation-duration', '0.2s');

        // Disable parallax on mobile for better performance
        document.querySelectorAll('[data-parallax]').forEach(el => {
            el.removeAttribute('data-parallax');
        });
    }

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        // Close menu on orientation change
        closeMobileMenu();

        // Recalculate viewport height
        setTimeout(setViewportHeight, 100);
    });

    // Lazy loading for images on mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Utility function to check if device is mobile
function isMobile() {
    return window.innerWidth <= 767 ||
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Export for use in other scripts if needed
window.wellmamaMobile = {
    toggleMobileMenu,
    closeMobileMenu,
    isMobile
};