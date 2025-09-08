// document.addEventListener('DOMContentLoaded', function () {
//     // ///////////Search functionality
//     document.addEventListener('click', function (event) {
//         // Check if the search icon is clicked
//         if (event.target.closest('.nav-search')) {
//             document.querySelector('.search-bar').classList.add('search-bar-active');
//         }
//         // Check if the cancel button is clicked
//         else if (event.target.closest('.search-cencle')) {
//             console.log('Cancel button clicked');
//             document.querySelector('.search-bar').classList.remove('search-bar-active');
//         }

//     });
// // Corrected Login and signup functionality
// document.addEventListener('click', function (event) {
//     const formElement = document.querySelector('.form');
    
//     // Check if the clicked element has the class 'nav-user' or 'Already-account'
//     if (event.target.closest('.nav-user, .Already-account')) {
//         formElement.classList.add('login-active');
//         formElement.classList.remove('sign-up-active');
//     }
    
//     // Check if the clicked element has the class 'sign-up-btn'
//     if (event.target.closest('.sign-up-btn')) {
//         formElement.classList.remove('login-active');
//         formElement.classList.add('sign-up-active');
//     }
    
//     // Check if the clicked element has the class 'form-cancle'
//     if (event.target.closest('.form-cancle')) {
//         formElement.classList.remove('login-active');
//         formElement.classList.remove('sign-up-active');
//     }
// });
// // Get the elements from the DOM
// const loginForm = document.querySelector('.login-form');
// const signUpForm = document.querySelector('.sign-up-form');
// const signUpBtn = document.querySelector('.Sign-up-btn');
// const alreadyAccountBtn = document.querySelector('.Already-account');

// // When "Create An Account" is clicked, hide login form and show sign-up form
// signUpBtn.addEventListener('click', function() {
//     loginForm.style.display = 'none';
//     signUpForm.style.display = 'block';
// });

// // When "Already Have An Account" is clicked, hide sign-up form and show login form
// alreadyAccountBtn.addEventListener('click', function() {
//     signUpForm.style.display = 'none';
//     loginForm.style.display = 'block';
// });


// });

// // Fix Header on scroll
// const header = document.querySelector('header');
// let lastScrollY = window.scrollY;

// window.addEventListener('scroll', function() {
//     const currentScrollY = window.scrollY;
    
// //    check if at the top
// if (currentScrollY === 0){
//     header.classList.remove('header-fix');
// } else if(currentScrollY === 0){
//     header.classList.add('header-fix');
// } else {
//     header.classList.remove('header-fix');
// }

// lastScrollY = currentScrollY;
// });




// new one
// ===== GLOBAL VARIABLES =====

let cartCount = 0;
const productsData = {
    popular: [
        { id: 1, name: "Ethiopian Blend", price: 24.50, originalPrice: 35.00, image: "images/p1.png", isNew: true },
        { id: 2, name: "Colombian Supreme", price: 28.00, originalPrice: 40.00, image: "images/p2.png", isNew: true },
        { id: 3, name: "Brazilian Santos", price: 22.50, originalPrice: 32.00, image: "images/p3.png", isNew: true },
        { id: 4, name: "Guatemala Antigua", price: 26.00, originalPrice: 38.00, image: "images/p4.png", isNew: true },
        { id: 5, name: "Costa Rican Gold", price: 30.00, originalPrice: 45.00, image: "images/p5.png", isNew: true },
        { id: 6, name: "Jamaican Blue Mountain", price: 45.00, originalPrice: 65.00, image: "images/p6.png", isNew: true }
    ],
    recent: [
        { id: 7, name: "Kenyan AA", price: 32.00, originalPrice: 48.00, image: "images/p7.png", isNew: true },
        { id: 8, name: "Yemen Mocha", price: 38.00, originalPrice: 55.00, image: "images/p8.png", isNew: true },
        { id: 9, name: "Hawaiian Kona", price: 42.00, originalPrice: 60.00, image: "images/p9.png", isNew: true },
        { id: 10, name: "Panama Geisha", price: 48.00, originalPrice: 70.00, image: "images/p10.png", isNew: true }
    ]
};

const blogPosts = [
    {
        id: 1,
        title: "The Art of Perfect Coffee Brewing",
        date: "December 15, 2024",
        category: "Coffee Tips",
        excerpt: "Discover the secrets behind brewing the perfect cup of coffee with our expert guide to extraction methods and bean selection.",
        image: "images/blog-1.jpeg"
    },
    {
        id: 2,
        title: "Sustainable Coffee Farming Practices",
        date: "December 10, 2024",
        category: "Sustainability",
        excerpt: "Learn how our partner farms are implementing eco-friendly practices to ensure the future of premium coffee production.",
        image: "images/blog-2.jpg"
    },
    {
        id: 3,
        title: "Coffee Origins: A Journey Around the World",
        date: "December 5, 2024",
        category: "Origins",
        excerpt: "Explore the unique characteristics and flavors of coffee beans from different regions around the globe.",
        image: "images/blog-3.jpg"
    }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZATION =====
function initializeApp() {
    setupEventListeners();
    renderProducts();
    renderBlogPosts();
    setupAnimations();
    updateCartDisplay();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation events
    setupNavigationEvents();
    
    // Search functionality
    setupSearchEvents();
    
    // Form events
    setupFormEvents();
    
    // Cart events
    setupCartEvents();
    
    // Scroll events
    setupScrollEvents();
    
    // Toast events
    setupToastEvents();
    
    // Menu navigation
    setupMenuNavigation();
}

function setupNavigationEvents() {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            menuBtn.checked = false;
        });
    }
    
    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.checked = false;
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuBtn.checked && !e.target.closest('.side-menu') && !e.target.closest('.menu-icon')) {
            menuBtn.checked = false;
        }
    });
}

function setupSearchEvents() {
    const searchBtn = document.querySelector('.nav-search');
    const searchBar = document.querySelector('.search-bar');
    const searchCancel = document.querySelector('.search-cancel');
    const searchInput = document.querySelector('.search-input input');
    
    if (searchBtn && searchBar) {
        searchBtn.addEventListener('click', () => {
            searchBar.classList.add('active');
            setTimeout(() => searchInput?.focus(), 100);
        });
    }
    
    if (searchCancel && searchBar) {
        searchCancel.addEventListener('click', () => {
            searchBar.classList.remove('active');
            if (searchInput) searchInput.value = '';
        });
    }
    
    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar?.classList.contains('active')) {
            searchBar.classList.remove('active');
            if (searchInput) searchInput.value = '';
        }
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

function setupFormEvents() {
    const userBtn = document.querySelector('.nav-user');
    const formOverlay = document.querySelector('.form-overlay');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const formCloses = document.querySelectorAll('.form-close');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    
    // Open login form
    if (userBtn && formOverlay && loginForm) {
        userBtn.addEventListener('click', () => {
            formOverlay.classList.add('active');
            loginForm.classList.add('active');
            signupForm?.classList.remove('active');
        });
    }
    
    // Switch between forms
    if (switchToSignup && signupForm && loginForm) {
        switchToSignup.addEventListener('click', () => {
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });
    }
    
    if (switchToLogin && loginForm && signupForm) {
        switchToLogin.addEventListener('click', () => {
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }
    
    // Close forms
    formCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            formOverlay?.classList.remove('active');
            loginForm?.classList.remove('active');
            signupForm?.classList.remove('active');
        });
    });
    
    // Close form when clicking outside
    if (formOverlay) {
        formOverlay.addEventListener('click', (e) => {
            if (e.target === formOverlay) {
                formOverlay.classList.remove('active');
                loginForm?.classList.remove('active');
                signupForm?.classList.remove('active');
            }
        });
    }
    
    // Handle form submissions
    const loginFormElement = document.querySelector('.login-form form');
    const signupFormElement = document.querySelector('.signup-form form');
    
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', handleLogin);
    }
    
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', handleSignup);
    }
    
    // Newsletter subscription
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleSubscription);
    }
}

function setupCartEvents() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart({
                id: 'main-product',
                name: 'Premium Morning Coffee',
                price: 14.50
            });
        });
    }
}

function setupScrollEvents() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('header-fixed');
            } else {
                header.classList.remove('header-fixed');
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll for anchor links
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

function setupToastEvents() {
    const toastClose = document.querySelector('.toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', hideToast);
    }
}

function setupMenuNavigation() {
    // Add active states and smooth scrolling for menu items
    const menuItems = document.querySelectorAll('.menu a, .footer-link-box a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const menuBtn = document.getElementById('menu-btn');
                    if (menuBtn) menuBtn.checked = false;
                }
            }
        });
    });
}

// ===== PRODUCT RENDERING =====
function renderProducts() {
    renderPopularProducts();
    renderRecentProducts();
}

function renderPopularProducts() {
    const container = document.querySelector('.popular-product-container');
    if (!container) return;
    
    container.innerHTML = productsData.popular.map(product => createProductHTML(product)).join('');
    
    // Add event listeners to cart buttons
    container.querySelectorAll('.product-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.productId);
            const product = productsData.popular.find(p => p.id === productId);
            if (product) addToCart(product);
        });
    });
}

function renderRecentProducts() {
    const container = document.querySelector('.recent-product-container');
    if (!container) return;
    
    container.innerHTML = productsData.recent.map(product => createProductHTML(product)).join('');
    
    // Add event listeners to cart buttons
    container.querySelectorAll('.product-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.productId);
            const product = productsData.recent.find(p => p.id === productId);
            if (product) addToCart(product);
        });
    });
}

function createProductHTML(product) {
    return `
        <div class="product-box" data-product-id="${product.id}">
            <div class="product-box-img">
                ${product.isNew ? '<span>New</span>' : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-box-text">
                <a href="#" class="product-text-title">${product.name}</a>
                <span class="price">$${product.price.toFixed(2)} ${product.originalPrice ? `<del>$${product.originalPrice.toFixed(2)}</del>` : ''}</span>
                <button class="product-cart-btn" data-product-id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em" width="1em">
                        <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// ===== BLOG RENDERING =====
function renderBlogPosts() {
    const container = document.querySelector('.blog-container');
    if (!container) return;
    
    container.innerHTML = blogPosts.map(post => createBlogHTML(post)).join('');
    
    // Add click events to blog posts
    container.querySelectorAll('.blog-box').forEach(box => {
        box.addEventListener('click', () => {
            const postId = parseInt(box.dataset.postId);
            const post = blogPosts.find(p => p.id === postId);
            if (post) {
                showToast(`Opening: ${post.title}`);
            }
        });
    });
}

function createBlogHTML(post) {
    return `
        <div class="blog-box" data-post-id="${post.id}">
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-text">
                <span>${post.date} / ${post.category}</span>
                <a href="#" class="blog-title">${post.title}</a>
                <p>${post.excerpt}</p>
                <a href="#">Read More</a>
            </div>
        </div>
    `;
}

// ===== CART FUNCTIONALITY =====
function addToCart(product) {
    cartCount++;
    updateCartDisplay();
    showToast(`${product.name} added to cart!`);
    
    // Add animation to cart icon
    const cartBtn = document.querySelector('.nav-cart');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Add pulse animation for new items
        if (cartCount > 0) {
            cartCountElement.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                cartCountElement.style.animation = '';
            }, 300);
        }
    }
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) return;
    
    const allProducts = [...productsData.popular, ...productsData.recent];
    const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    
    if (results.length > 0) {
        showToast(`Found ${results.length} product(s) matching "${query}"`);
    } else {
        showToast(`No products found for "${query}"`);
    }
}

// ===== FORM HANDLERS =====
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    // Simulate login process
    showToast(`Welcome back! Logging in as ${email}...`);
    
    setTimeout(() => {
        const formOverlay = document.querySelector('.form-overlay');
        const loginForm = document.querySelector('.login-form');
        
        formOverlay?.classList.remove('active');
        loginForm?.classList.remove('active');
        
        showToast('Successfully logged in!');
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullname = formData.get('fullname');
    const email = formData.get('email');
    
    // Simulate signup process
    showToast(`Creating account for ${fullname}...`);
    
    setTimeout(() => {
        const formOverlay = document.querySelector('.form-overlay');
        const signupForm = document.querySelector('.signup-form');
        
        formOverlay?.classList.remove('active');
        signupForm?.classList.remove('active');
        
        showToast(`Welcome ${fullname}! Account created successfully!`);
    }, 1500);
}

function handleSubscription(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('subscribe_email');
    
    if (email) {
        showToast(`Thank you for subscribing with ${email}!`);
        e.target.reset();
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Auto hide after duration
        setTimeout(() => {
            hideToast();
        }, duration);
    }
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('show');
    }
}

// ===== ANIMATIONS =====
function setupAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll([
        '.product-box',
        '.blog-box',
        '.service-box',
        '.popular-banner',
        '.shopping-banner-container'
    ].join(','));
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stagger product animations
    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach((box, index) => {
        box.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatPrice(price) {
    return `${price.toFixed(2)}`;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showToast('An error occurred. Please refresh the page if issues persist.');
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function setupAccessibility() {
    // Keyboard navigation for buttons
    document.querySelectorAll('button, .nav-btns a').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management for modals
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    function trapFocus(element) {
        const focusable = element.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    // Apply focus trap to modals
    const modals = document.querySelectorAll('.form-overlay, .search-bar');
    modals.forEach(modal => {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.classList.contains('active')) {
                    trapFocus(mutation.target);
                    // Focus first input when modal opens
                    const firstInput = mutation.target.querySelector('input');
                    if (firstInput) {
                        setTimeout(() => firstInput.focus(), 100);
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    });
}

// ===== LOCAL STORAGE MANAGEMENT =====
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn('LocalStorage not available:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.warn('Error reading from localStorage:', e);
        return null;
    }
}

// ===== CART PERSISTENCE =====
function saveCartToStorage() {
    saveToLocalStorage('coffeeShopCart', {
        count: cartCount,
        timestamp: Date.now()
    });
}

function loadCartFromStorage() {
    const savedCart = getFromLocalStorage('coffeeShopCart');
    if (savedCart && savedCart.count) {
        cartCount = savedCart.count;
        updateCartDisplay();
    }
}

// ===== THEME MANAGEMENT =====
function setupThemeToggle() {
    const savedTheme = getFromLocalStorage('coffeeShopTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Optional: Add theme toggle button functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            saveToLocalStorage('coffeeShopTheme', newTheme);
        });
    }
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                const value = input.value.trim();
                
                // Remove previous error styling
                input.classList.remove('error');
                
                // Validate based on input type
                if (!value) {
                    isValid = false;
                    input.classList.add('error');
                    showToast(`${input.placeholder || 'Field'} is required`);
                } else if (input.type === 'email' && !validateEmail(value)) {
                    isValid = false;
                    input.classList.add('error');
                    showToast('Please enter a valid email address');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Real-time validation feedback
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else if (this.type === 'email' && this.value && !validateEmail(this.value)) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    });
}

// ===== PROGRESSIVE WEB APP FEATURES =====
function setupPWA() {
    // Register service worker if available
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Handle install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button if you have one
        const installBtn = document.querySelector('.install-btn');
        if (installBtn) {
            installBtn.style.display = 'block';
            installBtn.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                });
            });
        }
    });
}

// ===== ANALYTICS AND TRACKING =====
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// ===== ENHANCED INITIALIZATION =====
function enhancedInitialization() {
    // Load cart from storage
    loadCartFromStorage();
    
    // Setup accessibility features
    setupAccessibility();
    
    // Setup theme management
    setupThemeToggle();
    
    // Setup form validation
    setupFormValidation();
    
    // Setup PWA features
    setupPWA();
    
    // Setup lazy loading
    lazyLoadImages();
    
    // Track page load
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
}

// ===== CART ENHANCEMENTS =====
function enhanceCartFunctionality() {
    // Update addToCart to save to storage
    const originalAddToCart = addToCart;
    window.addToCart = function(product) {
        originalAddToCart(product);
        saveCartToStorage();
        
        // Track add to cart event
        trackEvent('add_to_cart', {
            item_name: product.name,
            item_id: product.id,
            price: product.price,
            currency: 'USD'
        });
    };
}

// ===== FINAL INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Run original initialization
    initializeApp();
    
    // Run enhanced features
    enhancedInitialization();
    
    // Enhance cart functionality
    enhanceCartFunctionality();
    
    // Set up periodic cart save
    setInterval(saveCartToStorage, 30000); // Save every 30 seconds
});

// ===== WINDOW EVENTS =====
window.addEventListener('beforeunload', function() {
    saveCartToStorage();
});

// ===== RESIZE HANDLING =====
window.addEventListener('resize', debounce(() => {
    // Handle responsive layout adjustments if needed
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile', isMobile);
    
    // Close mobile menu if switching to desktop
    if (!isMobile) {
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) menuBtn.checked = false;
    }
}, 250));

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        formatPrice,
        sanitizeInput,
        debounce
    };
}