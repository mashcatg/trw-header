class MobileMenu {
    constructor() {
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Initialize main elements
        this.mobileNav = document.querySelector('.mobile-nav');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mainMenu = document.querySelector('.mobile-menu');
        this.submenus = document.querySelectorAll('.mobile-submenu');
        this.navItems = document.querySelectorAll('.mobile-nav-item');
        this.backButtons = document.querySelectorAll('.mobile-back-btn');
        this.navLinks = document.querySelectorAll('.mobile-nav-link');
        
        // Set initial states
        this.isOpen = false;
        this.currentSubmenu = null;
        this.currentFinalMenu = null;
        
        // Set initial state of the mobile nav
        if (this.mobileNav) {
            this.mobileNav.style.transform = 'translateX(-100%)';
        }

        // Initialize tab elements
        this.tabs = document.querySelectorAll('.mobile-tab');
        this.tabContents = document.querySelectorAll('.mobile-tab-content');

        // State tracking
        this.activeSubmenu = null;
        this.activeTab = null;
    }

    setupEventListeners() {
        // Toggle mobile menu
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMenu();
                this.toggleHamburgerIcon();
                this.toggleHeaderBackground();
                this.toggleLogoInvert();
            });
        }
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.mobileNav.contains(e.target) && !this.mobileToggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Search functionality
        const searchButton = document.getElementById('searchButton');
        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                document.dispatchEvent(new Event('toggleSearch'));
            });
        }

        // Handle navigation items with submenus
        this.navItems.forEach(item => {
            const submenuId = item.dataset.submenu;
            if (submenuId) {
                item.addEventListener('click', () => {
                    const submenu = document.getElementById(submenuId);
                    if (submenu) {
                        this.showSubmenu(submenu);
                    }
                });
            }
        });

        // Handle option clicks for final menus
        document.querySelectorAll('.mobile-option').forEach(option => {
            option.addEventListener('click', () => {
                const finalMenuId = option.dataset.finalMenu;
                const finalMenu = document.getElementById(finalMenuId);
                if (finalMenu) {
                    this.showFinalMenu(finalMenu);
                }
            });
        });

        // Handle back buttons
        this.backButtons.forEach(button => {
            button.addEventListener('click', () => {
                const finalMenu = button.closest('.mobile-final-menu');
                if (finalMenu) {
                    // We're in a final menu, go back to tab content
                    this.hideFinalMenu(finalMenu);
                    return;
                }
                
                const submenu = button.closest('.mobile-submenu');
                if (submenu) {
                    // We're in a submenu, go back to main menu
                    this.hideSubmenu(submenu);
                }
            });
        });

        // Handle tabs
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                const submenu = tab.closest('.mobile-submenu');
                if (submenu && tabId) {
                    this.switchTab(submenu, tabId, tab);
                }
            });
        });

        // Handle direct navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only prevent default if it's a placeholder link
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                // If it's a real link, let it navigate normally
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });

        // Handle contact sidebar
        this.setupContactSidebar();
    }

    toggleMenu() {
        if (!this.isOpen) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
        this.isOpen = !this.isOpen;
    }

    openMenu() {
        // First make the menu visible but maintain its position
        this.mobileNav.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        
        // Trigger the slide-in animation
        requestAnimationFrame(() => {
            this.mobileNav.style.transform = 'translateX(0)';
            this.mobileNav.classList.add('active');
            
            // Animate menu items with stagger
            const items = document.querySelectorAll('.mobile-nav-item, .mobile-nav-link');
            items.forEach((item, index) => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
                item.style.transitionDelay = `${index * 0.05}s`;
            });
        });
    }

    closeMenu() {
        // Trigger the slide-out animation
        this.mobileNav.style.transform = 'translateX(-100%)';
        this.mobileNav.classList.remove('active');
        document.body.style.overflow = '';

        // Hide the menu after animation completes
        setTimeout(() => {
            if (!this.mobileNav.classList.contains('active')) {
                this.mobileNav.style.visibility = 'hidden';
            }
        }, 400);
        
        // Reset all submenus
        this.submenus.forEach(submenu => {
            submenu.style.transform = 'translateX(100%)';
            submenu.style.opacity = '0';
            submenu.style.visibility = 'hidden';
        });

        // Reset main menu
        if (this.mainMenu) {
            this.mainMenu.style.transform = 'translateX(0)';
            this.mainMenu.style.opacity = '1';
            this.mainMenu.style.visibility = 'visible';
        }

        // Reset states
        this.activeSubmenu = null;
        this.activeTab = null;
    }

    showSubmenu(submenu) {
        if (!submenu) return;

        // Hide current submenu if exists
        if (this.currentSubmenu) {
            this.currentSubmenu.style.transform = 'translateX(100%)';
            this.currentSubmenu.style.opacity = '0';
            setTimeout(() => {
                this.currentSubmenu.style.visibility = 'hidden';
            }, 300);
        }

        // Hide main menu with animation
        if (this.mainMenu) {
            this.mainMenu.style.transform = 'translateX(-100%)';
            this.mainMenu.style.opacity = '0';
            setTimeout(() => {
                this.mainMenu.style.visibility = 'hidden';
            }, 300);
        }

        // Reset any previously active submenus
        this.submenus.forEach(sub => {
            if (sub !== submenu) {
                sub.style.transform = 'translateX(100%)';
                sub.style.opacity = '0';
                sub.style.visibility = 'hidden';
                sub.style.display = 'none';
            }
        });

        // Show target submenu
        submenu.style.display = 'block';
        submenu.style.visibility = 'visible';
        requestAnimationFrame(() => {
            submenu.style.transform = 'translateX(0)';
            submenu.style.opacity = '1';
        });

        // Activate first tab if present
        const firstTab = submenu.querySelector('.mobile-tab');
        const firstContent = submenu.querySelector('.mobile-tab-content');
        if (firstTab && firstContent) {
            this.switchTab(submenu, firstTab.dataset.tab, firstTab);
        }

        this.activeSubmenu = submenu;
    }

    hideSubmenu(submenu) {
        if (!submenu) return;

        // Hide submenu
        submenu.style.transform = 'translateX(100%)';
        submenu.style.opacity = '0';
        
        // Show main menu
        if (this.mainMenu) {
            this.mainMenu.style.transform = 'translateX(0)';
            this.mainMenu.style.opacity = '1';
            this.mainMenu.style.visibility = 'visible';
        }

        setTimeout(() => {
            submenu.style.visibility = 'hidden';
            submenu.style.display = 'none';
        }, 300);

        this.activeSubmenu = null;
    }

    switchTab(submenu, tabId, clickedTab) {
        if (!submenu || !tabId || !clickedTab) return;

        // Update tab states
        submenu.querySelectorAll('.mobile-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        clickedTab.classList.add('active');

        // Get current and target content
        const currentContent = submenu.querySelector('.mobile-tab-content.active');
        const targetContent = submenu.querySelector(`[data-tab-content="${tabId}"]`);

        if (!targetContent) return;

        // First, start the exit animation for current content
        if (currentContent) {
            currentContent.classList.remove('active');
            currentContent.style.opacity = '0';
            currentContent.style.transform = 'translateX(-20px)';
        }

        // Then, set up the new content
        setTimeout(() => {
            if (currentContent) {
                currentContent.style.display = 'none';
            }

            // Show new content
            targetContent.style.display = 'block';
            targetContent.style.opacity = '0';
            targetContent.style.transform = 'translateX(20px)';
            
            // Force reflow
            targetContent.offsetHeight;

            // Animate in
            requestAnimationFrame(() => {
                targetContent.classList.add('active');
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateX(0)';
            });
        }, currentContent ? 300 : 0);

        this.activeTab = clickedTab;
    }

    showFinalMenu(finalMenu) {
        if (!finalMenu) return;

        // Store reference to current submenu for back navigation
        this.previousSubmenu = this.activeSubmenu;
        
        const parentSubmenu = finalMenu.closest('.mobile-submenu');
        if (!parentSubmenu) return;

        // Hide the tabs container
        const tabsContainer = parentSubmenu.querySelector('.mobile-tabs-container');
        const activeContent = parentSubmenu.querySelector('.mobile-tab-content.active');

        if (tabsContainer) {
            tabsContainer.style.transform = 'translateX(-20px)';
            tabsContainer.style.opacity = '0';
        }

        if (activeContent) {
            activeContent.style.transform = 'translateX(-20px)';
            activeContent.style.opacity = '0';
        }

        // Show and animate the final menu
        finalMenu.style.display = 'block';
        finalMenu.style.visibility = 'visible';
        finalMenu.style.transform = 'translateX(0)';
        finalMenu.style.opacity = '1';

        // Animate each link individually
        const links = finalMenu.querySelectorAll('.mobile-final-link');
        links.forEach((link, index) => {
            link.style.transform = 'translateX(20px)';
            link.style.opacity = '0';
            
            setTimeout(() => {
                link.style.transform = 'translateX(0)';
                link.style.opacity = '1';
            }, index * 50); // Stagger the animations
        });

        this.activeFinalMenu = finalMenu;
    }

    hideFinalMenu(finalMenu) {
        if (!finalMenu) return;

        const parentSubmenu = finalMenu.closest('.mobile-submenu');
        if (!parentSubmenu) return;

        // Animate out the final menu
        finalMenu.style.transform = 'translateX(100%)';
        finalMenu.style.opacity = '0';
        
        // Show the tabs container and content again
        const tabsContainer = parentSubmenu.querySelector('.mobile-tabs-container');
        const activeContent = parentSubmenu.querySelector('.mobile-tab-content.active');
        const activeTab = parentSubmenu.querySelector('.mobile-tab.active');

        // First make them visible
        if (tabsContainer) {
            tabsContainer.style.visibility = 'visible';
            tabsContainer.style.display = 'flex';
        }

        if (activeContent) {
            activeContent.style.visibility = 'visible';
            activeContent.style.display = 'block';
        }

        // Then animate them in
        requestAnimationFrame(() => {
            if (tabsContainer) {
                tabsContainer.style.transform = 'translateX(0)';
                tabsContainer.style.opacity = '1';
            }

            if (activeContent) {
                activeContent.style.transform = 'translateX(0)';
                activeContent.style.opacity = '1';
            }
        });

        // Hide the final menu after animation
        setTimeout(() => {
            finalMenu.style.visibility = 'hidden';
            finalMenu.style.display = 'none';
        }, 300);

        this.activeFinalMenu = null;
    }

    toggleHamburgerIcon() {
        if (this.mobileToggle) {
            this.mobileToggle.classList.toggle('is-active');
        }
    }

    toggleHeaderBackground() {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('menu-open');
        }
    }

    toggleLogoInvert() {
        const logo = document.querySelector('#siteLogo');
        if (logo) {
            logo.classList.toggle('inverted');
        }
    }

    setupContactSidebar() {
        const contactToggle = document.getElementById('contactToggle');
        const contactSidebar = document.getElementById('contactSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const sidebarClose = document.getElementById('sidebarClose');

        if (contactToggle && contactSidebar && sidebarOverlay && sidebarClose) {
            contactToggle.addEventListener('click', () => {
                contactSidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const closeSidebar = () => {
                contactSidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            };

            sidebarClose.addEventListener('click', closeSidebar);
            sidebarOverlay.addEventListener('click', closeSidebar);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});
