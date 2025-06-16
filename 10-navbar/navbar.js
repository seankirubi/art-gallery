class DynamicNavbar {
            constructor(config = {}) {
                this.config = {
                    containerId: 'navbar-container',
                    siteName: 'YourSite',
                    logoIcon: 'Y',
                    navItems: [
                        { text: 'Home', href: '#home', active: true },
                        { text: 'About', href: '#about' },
                        { text: 'Services', href: '#services' },
                        { text: 'Portfolio', href: '#portfolio' },
                        { text: 'Contact', href: '#contact' }
                    ],
                    ...config
                };
                this.isMenuOpen = false;
                this.init();
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
                            <a href="#home" class="nav-logo">
                                
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
                const navMenu = document.getElementById('nav-menu');
                const navOverlay = document.getElementById('nav-overlay');
                const navClose = document.getElementById('nav-close');
                const navLinks = document.querySelectorAll('[data-nav-link]');

                // Toggle mobile menu
                navToggle?.addEventListener('click', () => {
                    this.toggleMobileMenu();
                });

                // Close menu with close button
                navClose?.addEventListener('click', () => {
                    this.toggleMobileMenu();
                });

                // Close menu when clicking on overlay
                navOverlay?.addEventListener('click', () => {
                    if (this.isMenuOpen) {
                        this.toggleMobileMenu();
                    }
                });

                // Close menu when clicking on a link (mobile)
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth <= 768 && this.isMenuOpen) {
                            this.toggleMobileMenu();
                        }
                        this.setActiveLink(link);
                    });
                });

                // Handle window resize
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 768 && this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                });

                // Handle escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isMenuOpen) {
                        this.toggleMobileMenu();
                    }
                });

                // Add scroll effect to navbar
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
                
                // Prevent body scroll when menu is open
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
                
                // Restore body scroll
                document.body.style.overflow = '';
            }

            setActiveLink(activeLink) {
                // Remove active class from all links
                document.querySelectorAll('[data-nav-link]').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to clicked link
                activeLink.classList.add('active');
            }

            addScrollEffect() {
                let lastScrollTop = 0;
                const navbar = document.getElementById('navbar');

                window.addEventListener('scroll', () => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Only change opacity on scroll, no box shadow
                    if (scrollTop > 50) {
                        navbar.style.background = ' rgba(0, 0, 0, 0.382)';
                    } else {
                        navbar.style.background = ' rgb(0, 0, 0)';
                    }

                    lastScrollTop = scrollTop;
                });
            }

            // Public method to update navigation items
            updateNavItems(newItems) {
                this.config.navItems = newItems;
                this.insertNavbar();
                this.bindEvents();
            }

            // Public method to update site name
            updateSiteName(newName) {
                this.config.siteName = newName;
                this.insertNavbar();
                this.bindEvents();
            }

            init() {
                // Wait for DOM to be ready
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => {
                        this.insertNavbar();
                        this.bindEvents();
                    });
                } else {
                    this.insertNavbar();
                    this.bindEvents();
                }
            }
        }

        // Initialize the navbar
        const navbar = new DynamicNavbar({
            siteName: 'ArtGallery',
            logoIcon: 'A',
            navItems: [
                { text: 'Home', href: '../1-homepage/index.html', active: true },
                { text: 'Explore', href: '../2-explorepage/index.html' },
                { text: 'Exhibitions', href: '../6-exhibitions/index.html' },
                { text: 'Artists', href: '../4-artists-page/index.html' },
                { text: 'About', href: '../7-about.html/about.html' },
                { text: 'Collections', href: '../9-collections/index.html' }
            ]
        });

        // Example of updating navbar dynamically
        setTimeout(() => {
            console.log('Navbar initialized! You can update it using:');
            console.log('navbar.updateSiteName("New Name")');
            console.log('navbar.updateNavItems([...new items])');
        }, 1000);