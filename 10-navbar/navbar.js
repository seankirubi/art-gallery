class DynamicNavbar {
    constructor(config = {}) {
        this.config = {
            containerId: 'navbar-container',
            siteName: 'YourSite',
            logoIcon: 'Y',
            navItems: [
                { text: 'Home', href: '../1-homepage/index.html', active: false },
                { text: 'Explore', href: '../2-explorepage/index.html', active: false },
                { text: 'Exhibitions', href: '../6-exhibitions/index.html', active: false },
                { text: 'Artists', href: '../4-artists-page/index.html', active: false },
                { text: 'About', href: '../7-about/4-about.html', active: false },
                { text: 'Collections', href: '../9-collections/index.html', active: false }
            ],
            ...config
        };
        this.isMenuOpen = false;
        this.init();
    }

    // Smart URL-based active detection
    setActiveBasedOnURL() {
    const currentPath = window.location.pathname.toLowerCase();

    this.config.navItems.forEach(item => {
        // Create an anchor to resolve the relative URL to an absolute one
        const link = document.createElement('a');
        link.href = item.href;

        // Extract pathname (e.g. /7-about.html/about.html)
        const itemPath = link.pathname.toLowerCase();

        // Set active if the pathname matches exactly
        item.active = itemPath === currentPath;
    });

    // Fallback to Home if nothing matches
    if (!this.config.navItems.some(item => item.active)) {
        const homeItem = this.config.navItems.find(item => item.text === 'Home');
        if (homeItem) homeItem.active = true;
    }
}



    createNavbarHTML() {
        const navItems = this.config.navItems
            .map(item => `
                <li>
                    <a href="${item.href}" class="${item.active ? 'active' : ''}" data-nav-link>
                        ${item.text}
                    </a>
                </li>
            `).join('');

        return `
            <div class="nav-overlay" id="nav-overlay"></div>
            <nav class="navbar" id="navbar">
                <div class="nav-container">
                    <a href="../1-homepage/index.html" class="nav-logo">
                        ${this.config.siteName}
                    </a>
                    <ul class="nav-menu" id="nav-menu">
                        <button class="nav-close" id="nav-close" aria-label="Close menu">✕</button>
                        ${navItems}
                    </ul>
                    <div class="nav-toggle" id="nav-toggle">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </nav>
        `;
    }

    insertNavbar() {
        const container = document.getElementById(this.config.containerId);
        if (!container) {
            console.error(`Container with ID '${this.config.containerId}' not found`);
            return;
        }
        container.innerHTML = this.createNavbarHTML();
    }

    bindEvents() {
        const navToggle = document.getElementById('nav-toggle');
        const navClose = document.getElementById('nav-close');
        const navOverlay = document.getElementById('nav-overlay');
        const navLinks = document.querySelectorAll('[data-nav-link]');

        navToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        navClose?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        navOverlay?.addEventListener('click', () => {
            if (this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768 && this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
                // Note: We don't need setActiveLink here since page will reload
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        });

        this.addScrollEffect();
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        const navOverlay = document.getElementById('nav-overlay');
        
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        const navOverlay = document.getElementById('nav-overlay');
        
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        
        document.body.style.overflow = '';
    }

    addScrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.382)';
            } else {
                navbar.style.background = 'rgb(0, 0, 0)';
            }
        });
    }

    updateNavItems(newItems) {
        this.config.navItems = newItems;
        this.setActiveBasedOnURL();
        this.insertNavbar();
        this.bindEvents();
    }

    updateSiteName(newName) {
        this.config.siteName = newName;
        this.insertNavbar();
        this.bindEvents();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setActiveBasedOnURL();  // Detect current page first
                this.insertNavbar();         // Then insert HTML
                this.bindEvents();           // Finally bind events
            });
        } else {
            this.setActiveBasedOnURL();  // Detect current page first
            this.insertNavbar();         // Then insert HTML
            this.bindEvents();           // Finally bind events
        }
    }
}

// Initialize with the same config on all pages
const navbar = new DynamicNavbar({
    siteName: 'ArtGallery',
    logoIcon: 'A',
    navItems: [
        { text: 'Home', href: '../1-homepage/index.html', active: false },
        { text: 'Explore', href: '../2-explorepage/index.html', active: false },
        { text: 'Exhibitions', href: '../6-exhibitions/index.html', active: false },
        { text: 'Artists', href: '../4-artists-page/index.html', active: false },
        { text: 'About', href: '../7-about/4-about.html', active: false },
        { text: 'Collections', href: '../9-collections/index.html', active: false }
    ]
});