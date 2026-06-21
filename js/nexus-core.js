/**
 * NEXUS BLOGGER FRAMEWORK - Core JavaScript
 * Version 1.0
 * Copyright © 2026 Nexus Framework
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    headerSticky: true,
    headerTransparent: false,
    headerGlass: true,
    darkMode: true,
    darkModeDefault: false,
    scrollProgress: true,
    backToTop: true,
    smoothScroll: true,
    lazyLoad: true,
    animationEnabled: true,
    notificationBar: true,
    searchEnabled: true,
    megaMenu: true
  };

  // ============================================
  // DOM REFERENCES
  // ============================================
  const DOM = {
    header: document.querySelector('.nexus-header'),
    body: document.body,
    html: document.documentElement,
    hamburger: document.querySelector('.nexus-hamburger'),
    mobileMenu: document.querySelector('.nexus-mobile-menu'),
    themeToggle: document.querySelector('.nexus-theme-toggle'),
    searchToggle: document.querySelector('.nexus-search-toggle'),
    searchOverlay: document.querySelector('.nexus-search-overlay'),
    searchInput: document.querySelector('.nexus-search-overlay input'),
    backToTop: document.querySelector('.nexus-back-to-top'),
    progressBar: document.querySelector('.nexus-reading-progress'),
    notificationBar: document.querySelector('.nexus-notification-bar'),
    notificationClose: document.querySelector('.nexus-notification-close'),
    megaMenus: document.querySelectorAll('.nexus-mega-menu'),
    slider: document.querySelector('.nexus-slider'),
    tabs: document.querySelectorAll('.nexus-tabs'),
    accordions: document.querySelectorAll('.nexus-accordion'),
    loader: document.querySelector('.nexus-loader')
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  const Utils = {
    debounce(fn, delay) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    throttle(fn, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    getPreference(key, defaultValue) {
      try {
        const value = localStorage.getItem(`nexus_${key}`);
        return value !== null ? JSON.parse(value) : defaultValue;
      } catch {
        return defaultValue;
      }
    },

    setPreference(key, value) {
      try {
        localStorage.setItem(`nexus_${key}`, JSON.stringify(value));
      } catch {
        // Ignore storage errors
      }
    },

    prefersDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    isInViewport(element, offset = 0) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight - offset &&
        rect.bottom >= offset
      );
    }
  };

  // ============================================
  // HEADER CONTROLS
  // ============================================
  class Header {
    constructor() {
      this.lastScroll = 0;
      this.init();
    }

    init() {
      if (CONFIG.headerSticky) {
        this.handleScroll = Utils.throttle(this.handleScroll.bind(this), 100);
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize.bind(this));
      }
      
      if (CONFIG.headerGlass) {
        DOM.header.classList.add('nexus-header-glass');
      }
      
      if (CONFIG.headerTransparent) {
        DOM.header.classList.add('nexus-header-transparent');
      }
    }

    handleScroll() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        DOM.header.classList.add('nexus-header-sticky');
      } else {
        DOM.header.classList.remove('nexus-header-sticky');
      }
      
      this.lastScroll = currentScroll;
    }

    handleResize() {
      // Handle responsive header changes
    }

    destroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  // ============================================
  // MOBILE MENU
  // ============================================
  class MobileMenu {
    constructor() {
      this.isOpen = false;
      this.init();
    }

    init() {
      if (!DOM.hamburger || !DOM.mobileMenu) return;
      
      DOM.hamburger.addEventListener('click', this.toggle.bind(this));
      
      // Close on link click
      DOM.mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', this.close.bind(this));
      });
      
      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      this.isOpen = true;
      DOM.hamburger.classList.add('active');
      DOM.mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.isOpen = false;
      DOM.hamburger.classList.remove('active');
      DOM.mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ============================================
  // DARK MODE
  // ============================================
  class DarkMode {
    constructor() {
      this.enabled = CONFIG.darkMode;
      this.isDark = CONFIG.darkModeDefault;
      this.init();
    }

    init() {
      if (!this.enabled) return;
      
      // Check stored preference
      const stored = Utils.getPreference('darkMode', null);
      if (stored !== null) {
        this.isDark = stored;
      } else {
        this.isDark = Utils.prefersDarkMode();
      }
      
      this.apply();
      
      // Setup toggle button
      if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener('click', this.toggle.bind(this));
      }
      
      // Listen for system changes
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (Utils.getPreference('darkMode', null) === null) {
            this.isDark = e.matches;
            this.apply();
          }
        });
    }

    toggle() {
      this.isDark = !this.isDark;
      Utils.setPreference('darkMode', this.isDark);
      this.apply();
    }

    apply() {
      if (this.isDark) {
        DOM.html.setAttribute('data-theme', 'dark');
        if (DOM.themeToggle) {
          DOM.themeToggle.textContent = '☀️';
        }
      } else {
        DOM.html.removeAttribute('data-theme');
        if (DOM.themeToggle) {
          DOM.themeToggle.textContent = '🌙';
        }
      }
    }
  }

  // ============================================
  // SEARCH
  // ============================================
  class Search {
    constructor() {
      this.isOpen = false;
      this.init();
    }

    init() {
      if (!CONFIG.searchEnabled || !DOM.searchToggle || !DOM.searchOverlay) return;
      
      DOM.searchToggle.addEventListener('click', this.toggle.bind(this));
      
      // Close on overlay click
      DOM.searchOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.searchOverlay) {
          this.close();
        }
      });
      
      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
      
      // Auto-focus on open
      const observer = new MutationObserver(() => {
        if (DOM.searchOverlay.classList.contains('open') && DOM.searchInput) {
          setTimeout(() => DOM.searchInput.focus(), 100);
        }
      });
      
      observer.observe(DOM.searchOverlay, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      this.isOpen = true;
      DOM.searchOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.isOpen = false;
      DOM.searchOverlay.classList.remove('open');
      document.body.style.overflow = '';
      if (DOM.searchInput) {
        DOM.searchInput.value = '';
      }
    }
  }

  // ============================================
  // BACK TO TOP
  // ============================================
  class BackToTop {
    constructor() {
      this.init();
    }

    init() {
      if (!CONFIG.backToTop || !DOM.backToTop) return;
      
      this.handleScroll = Utils.throttle(this.handleScroll.bind(this), 200);
      window.addEventListener('scroll', this.handleScroll);
      
      DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    handleScroll() {
      if (window.pageYOffset > 400) {
        DOM.backToTop.classList.add('visible');
      } else {
        DOM.backToTop.classList.remove('visible');
      }
    }
  }

  // ============================================
  // READING PROGRESS
  // ============================================
  class ReadingProgress {
    constructor() {
      this.init();
    }

    init() {
      if (!CONFIG.scrollProgress || !DOM.progressBar) return;
      
      this.handleScroll = Utils.throttle(this.update.bind(this), 50);
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.update.bind(this));
    }

    update() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      DOM.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  // ============================================
  // NOTIFICATION BAR
  // ============================================
  class NotificationBar {
    constructor() {
      this.init();
    }

    init() {
      if (!CONFIG.notificationBar || !DOM.notificationBar) return;
      
      // Check if dismissed
      if (Utils.getPreference('notificationDismissed', false)) {
        DOM.notificationBar.style.display = 'none';
        return;
      }
      
      if (DOM.notificationClose) {
        DOM.notificationClose.addEventListener('click', this.dismiss.bind(this));
      }
    }

    dismiss() {
      DOM.notificationBar.style.display = 'none';
      Utils.setPreference('notificationDismissed', true);
    }
  }

  // ============================================
  // SLIDER
  // ============================================
  class Slider {
    constructor() {
      this.currentSlide = 0;
      this.autoPlay = true;
      this.interval = 5000;
      this.init();
    }

    init() {
      if (!DOM.slider) return;
      
      this.slides = DOM.slider.querySelectorAll('.nexus-slider-slide');
      this.track = DOM.slider.querySelector('.nexus-slider-track');
      this.controls = DOM.slider.querySelectorAll('.nexus-slider-controls button');
      
      if (this.slides.length === 0) return;
      
      this.setupControls();
      this.startAutoPlay();
      
      // Pause on hover
      DOM.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
      DOM.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    setupControls() {
      this.controls.forEach((control, index) => {
        control.addEventListener('click', () => {
          if (index === 0) {
            this.prev();
          } else {
            this.next();
          }
        });
      });
    }

    goTo(index) {
      this.currentSlide = index;
      if (this.currentSlide >= this.slides.length) {
        this.currentSlide = 0;
      } else if (this.currentSlide < 0) {
        this.currentSlide = this.slides.length - 1;
      }
      
      this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }

    next() {
      this.goTo(this.currentSlide + 1);
    }

    prev() {
      this.goTo(this.currentSlide - 1);
    }

    startAutoPlay() {
      if (!this.autoPlay) return;
      this.timer = setInterval(() => this.next(), this.interval);
    }

    stopAutoPlay() {
      clearInterval(this.timer);
    }
  }

  // ============================================
  // TABS
  // ============================================
  class Tabs {
    constructor() {
      this.init();
    }

    init() {
      DOM.tabs.forEach(tabs => {
        const navButtons = tabs.querySelectorAll('.nexus-tabs-nav button');
        const panels = tabs.querySelectorAll('.nexus-tabs-panel');
        
        navButtons.forEach((button, index) => {
          button.addEventListener('click', () => {
            // Update buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update panels
            panels.forEach(panel => panel.classList.remove('active'));
            if (panels[index]) {
              panels[index].classList.add('active');
            }
          });
        });
      });
    }
  }

  // ============================================
  // ACCORDION
  // ============================================
  class Accordion {
    constructor() {
      this.init();
    }

    init() {
      DOM.accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.nexus-accordion-header');
        
        headers.forEach(header => {
          header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = header.classList.contains('active');
            
            // Close all in this accordion
            accordion.querySelectorAll('.nexus-accordion-header').forEach(h => {
              h.classList.remove('active');
              if (h.nextElementSibling) {
                h.nextElementSibling.classList.remove('open');
              }
            });
            
            // Toggle clicked
            if (!isOpen) {
              header.classList.add('active');
              if (body) {
                body.classList.add('open');
              }
            }
          });
        });
      });
    }
  }

  // ============================================
  // PAGE LOADER
  // ============================================
  class PageLoader {
    constructor() {
      this.init();
    }

    init() {
      if (!DOM.loader) return;
      
      window.addEventListener('load', () => {
        setTimeout(() => {
          DOM.loader.classList.add('hidden');
        }, 300);
      });
      
      // Fallback if load event already fired
      if (document.readyState === 'complete') {
        DOM.loader.classList.add('hidden');
      }
    }
  }

  // ============================================
  // LAZY LOADING
  // ============================================
  class LazyLoad {
    constructor() {
      this.init();
    }

    init() {
      if (!CONFIG.lazyLoad) return;
      
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const src = img.dataset.src;
              const srcset = img.dataset.srcset;
              
              if (src) {
                img.src = src;
                img.removeAttribute('data-src');
              }
              
              if (srcset) {
                img.srcset = srcset;
                img.removeAttribute('data-srcset');
              }
              
              img.classList.add('loaded');
              this.observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
          this.observer.observe(img);
        });
      } else {
        // Fallback: load all images immediately
        document.querySelectorAll('img[data-src]').forEach(img => {
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
        });
      }
    }
  }

  // ============================================
  // ANIMATIONS
  // ============================================
  class Animations {
    constructor() {
      this.init();
    }

    init() {
      if (!CONFIG.animationEnabled || Utils.prefersReducedMotion()) return;
      
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target;
              const animation = element.dataset.animation || 'fade-up';
              const delay = element.dataset.delay || 0;
              
              setTimeout(() => {
                element.classList.add(`nexus-animate-${animation}`);
                element.classList.add('nexus-animated');
              }, delay);
              
              this.observer.unobserve(element);
            }
          });
        }, {
          threshold: 0.1
        });
        
        document.querySelectorAll('[data-animation]').forEach(element => {
          this.observer.observe(element);
        });
      }
    }
  }

  // ============================================
  // INITIALIZE ALL MODULES
  // ============================================
  class NexusFramework {
    constructor() {
      this.modules = {};
      this.init();
    }

    init() {
      // Core modules
      this.modules.header = new Header();
      this.modules.mobileMenu = new MobileMenu();
      this.modules.darkMode = new DarkMode();
      this.modules.search = new Search();
      this.modules.backToTop = new BackToTop();
      this.modules.readingProgress = new ReadingProgress();
      this.modules.notificationBar = new NotificationBar();
      this.modules.slider = new Slider();
      this.modules.tabs = new Tabs();
      this.modules.accordion = new Accordion();
      this.modules.pageLoader = new PageLoader();
      this.modules.lazyLoad = new LazyLoad();
      this.modules.animations = new Animations();
      
      console.log('NEXUS Framework initialized successfully!');
    }

    // Public API for external use
    getModule(name) {
      return this.modules[name];
    }

    toggleDarkMode() {
      if (this.modules.darkMode) {
        this.modules.darkMode.toggle();
      }
    }
  }

  // ============================================
  // EXPOSE TO GLOBAL SCOPE
  // ============================================
  window.Nexus = new NexusFramework();

})();