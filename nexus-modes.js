/**
 * NEXUS BLOGGER FRAMEWORK - Mode System
 * Version 1.0
 * Copyright © 2026 Nexus Framework
 */

(function() {
  'use strict';

  // ============================================
  // MODE CONFIGURATIONS
  // ============================================
  const MODES = {
    recipe: {
      name: 'Recipe',
      icon: '🍳',
      accent: '#E67E22',
      gradient: 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
      typography: { heading: 'Georgia, serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'right'
    },
    education: {
      name: 'Education',
      icon: '📚',
      accent: '#2980B9',
      gradient: 'linear-gradient(135deg, #2980B9 0%, #3498DB 100%)',
      typography: { heading: 'Poppins, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    news: {
      name: 'News',
      icon: '📰',
      accent: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
      typography: { heading: 'Merriweather, serif', body: 'Inter, sans-serif' },
      layout: 'list',
      sidebar: 'right'
    },
    magazine: {
      name: 'Magazine',
      icon: '📖',
      accent: '#8E44AD',
      gradient: 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)',
      typography: { heading: 'Playfair Display, serif', body: 'Inter, sans-serif' },
      layout: 'grid-4',
      sidebar: 'right'
    },
    business: {
      name: 'Business',
      icon: '💼',
      accent: '#16A085',
      gradient: 'linear-gradient(135deg, #16A085 0%, #1ABC9C 100%)',
      typography: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    corporate: {
      name: 'Corporate',
      icon: '🏢',
      accent: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #4A6A8A 100%)',
      typography: { heading: 'Roboto, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'left'
    },
    portfolio: {
      name: 'Portfolio',
      icon: '🎨',
      accent: '#8E44AD',
      gradient: 'linear-gradient(135deg, #8E44AD 0%, #D35400 100%)',
      typography: { heading: 'Montserrat, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'none'
    },
    photography: {
      name: 'Photography',
      icon: '📷',
      accent: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #7F8C8D 100%)',
      typography: { heading: 'Cinzel, serif', body: 'Inter, sans-serif' },
      layout: 'grid-4',
      sidebar: 'none'
    },
    fitness: {
      name: 'Fitness',
      icon: '💪',
      accent: '#E74C3C',
      gradient: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
      typography: { heading: 'Oswald, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    gym: {
      name: 'Gym',
      icon: '🏋️',
      accent: '#D35400',
      gradient: 'linear-gradient(135deg, #D35400 0%, #E67E22 100%)',
      typography: { heading: 'Anton, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    travel: {
      name: 'Travel',
      icon: '✈️',
      accent: '#3498DB',
      gradient: 'linear-gradient(135deg, #3498DB 0%, #2ECC71 100%)',
      typography: { heading: 'Raleway, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'right'
    },
    food: {
      name: 'Food',
      icon: '🍽️',
      accent: '#E67E22',
      gradient: 'linear-gradient(135deg, #E67E22 0%, #E74C3C 100%)',
      typography: { heading: 'Playfair Display, serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    personal: {
      name: 'Personal Blog',
      icon: '✍️',
      accent: '#9B59B6',
      gradient: 'linear-gradient(135deg, #9B59B6 0%, #E74C3C 100%)',
      typography: { heading: 'Merriweather, serif', body: 'Inter, sans-serif' },
      layout: 'single',
      sidebar: 'right'
    },
    technology: {
      name: 'Technology',
      icon: '💻',
      accent: '#3498DB',
      gradient: 'linear-gradient(135deg, #3498DB 0%, #2ECC71 100%)',
      typography: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'right'
    },
    ai: {
      name: 'AI',
      icon: '🤖',
      accent: '#6C63FF',
      gradient: 'linear-gradient(135deg, #6C63FF 0%, #00D2FF 100%)',
      typography: { heading: 'Space Grotesk, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'left'
    },
    medical: {
      name: 'Medical',
      icon: '🏥',
      accent: '#1ABC9C',
      gradient: 'linear-gradient(135deg, #1ABC9C 0%, #2ECC71 100%)',
      typography: { heading: 'Nunito, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    realEstate: {
      name: 'Real Estate',
      icon: '🏠',
      accent: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #E67E22 100%)',
      typography: { heading: 'Montserrat, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'right'
    },
    law: {
      name: 'Law Firm',
      icon: '⚖️',
      accent: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #8E44AD 100%)',
      typography: { heading: 'Cinzel, serif', body: 'Inter, sans-serif' },
      layout: 'single',
      sidebar: 'right'
    },
    restaurant: {
      name: 'Restaurant',
      icon: '🍴',
      accent: '#E67E22',
      gradient: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
      typography: { heading: 'Playfair Display, serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    hotel: {
      name: 'Hotel',
      icon: '🏨',
      accent: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #D4AF37 100%)',
      typography: { heading: 'Cinzel, serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    ecommerce: {
      name: 'E-commerce',
      icon: '🛒',
      accent: '#E74C3C',
      gradient: 'linear-gradient(135deg, #E74C3C 0%, #F39C12 100%)',
      typography: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-4',
      sidebar: 'left'
    },
    digital: {
      name: 'Digital Products',
      icon: '📦',
      accent: '#6C63FF',
      gradient: 'linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%)',
      typography: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'right'
    },
    course: {
      name: 'Course Website',
      icon: '🎓',
      accent: '#2980B9',
      gradient: 'linear-gradient(135deg, #2980B9 0%, #8E44AD 100%)',
      typography: { heading: 'Poppins, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    landing: {
      name: 'Landing Page',
      icon: '🚀',
      accent: '#6C63FF',
      gradient: 'linear-gradient(135deg, #6C63FF 0%, #4ECDC4 100%)',
      typography: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      layout: 'single',
      sidebar: 'none'
    },
    startup: {
      name: 'Startup',
      icon: '🌟',
      accent: '#6C63FF',
      gradient: 'linear-gradient(135deg, #6C63FF 0%, #FF6B6B 100%)',
      typography: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    agency: {
      name: 'Agency',
      icon: '🏛️',
      accent: '#3498DB',
      gradient: 'linear-gradient(135deg, #3498DB 0%, #2ECC71 100%)',
      typography: { heading: 'Montserrat, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'right'
    },
    ngo: {
      name: 'NGO',
      icon: '🌍',
      accent: '#2ECC71',
      gradient: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)',
      typography: { heading: 'Nunito, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    fashion: {
      name: 'Fashion',
      icon: '👗',
      accent: '#E74C3C',
      gradient: 'linear-gradient(135deg, #E74C3C 0%, #F39C12 100%)',
      typography: { heading: 'Playfair Display, serif', body: 'Inter, sans-serif' },
      layout: 'grid-4',
      sidebar: 'right'
    },
    beauty: {
      name: 'Beauty',
      icon: '💄',
      accent: '#E91E63',
      gradient: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
      typography: { heading: 'Montserrat, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'right'
    },
    gaming: {
      name: 'Gaming',
      icon: '🎮',
      accent: '#6C63FF',
      gradient: 'linear-gradient(135deg, #6C63FF 0%, #00D2FF 100%)',
      typography: { heading: 'Orbitron, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-3',
      sidebar: 'left'
    },
    crypto: {
      name: 'Crypto',
      icon: '₿',
      accent: '#F7931A',
      gradient: 'linear-gradient(135deg, #F7931A 0%, #6C63FF 100%)',
      typography: { heading: 'Space Grotesk, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    },
    finance: {
      name: 'Finance',
      icon: '💰',
      accent: '#2C3E50',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #27AE60 100%)',
      typography: { heading: 'Inter, sans-serif', body: 'Inter, sans-serif' },
      layout: 'grid-2',
      sidebar: 'right'
    }
  };

  // ============================================
  // MODE MANAGER
  // ============================================
  class ModeManager {
    constructor() {
      this.currentMode = 'default';
      this.init();
    }

    init() {
      // Get stored preference
      const stored = localStorage.getItem('nexus_mode');
      if (stored && MODES[stored]) {
        this.setMode(stored);
      }
      
      // Listen for mode changes from admin
      this.setupAdminListener();
    }

    setMode(modeId) {
      if (!MODES[modeId]) {
        console.warn(`Mode "${modeId}" not found`);
        return;
      }
      
      const mode = MODES[modeId];
      const html = document.documentElement;
      
      // Set data attribute
      html.setAttribute('data-mode', modeId);
      
      // Update CSS variables
      html.style.setProperty('--nexus-primary', mode.accent);
      html.style.setProperty('--nexus-gradient', mode.gradient);
      
      // Update layout
      const content = document.querySelector('.nexus-main-content');
      if (content) {
        content.className = `nexus-main-content nexus-layout-${mode.layout}`;
      }
      
      // Update sidebar
      const sidebar = document.querySelector('.nexus-sidebar');
      if (sidebar) {
        if (mode.sidebar === 'none') {
          sidebar.style.display = 'none';
        } else {
          sidebar.style.display = '';
          sidebar.className = `nexus-sidebar nexus-sidebar-${mode.sidebar}`;
        }
      }
      
      // Store preference
      localStorage.setItem('nexus_mode', modeId);
      this.currentMode = modeId;
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('nexusModeChange', {
        detail: { modeId, mode }
      }));
      
      console.log(`Mode switched to: ${mode.name}`);
    }

    getCurrentMode() {
      return this.currentMode;
    }

    getAvailableModes() {
      return Object.keys(MODES).map(id => ({
        id,
        ...MODES[id]
      }));
    }

    setupAdminListener() {
      // Listen for admin panel mode changes
      window.addEventListener('nexusAdminModeChange', (e) => {
        this.setMode(e.detail.modeId);
      });
    }
  }

  // ============================================
  // MODE SWITCHER WIDGET
  // ============================================
  class ModeSwitcher {
    constructor() {
      this.manager = new ModeManager();
      this.init();
    }

    init() {
      const switcher = document.querySelector('.nexus-mode-switcher');
      if (!switcher) return;
      
      const select = document.createElement('select');
      select.className = 'nexus-mode-select';
      select.innerHTML = '<option value="">Select Mode</option>';
      
      this.manager.getAvailableModes().forEach(mode => {
        const option = document.createElement('option');
        option.value = mode.id;
        option.textContent = `${mode.icon} ${mode.name}`;
        if (mode.id === this.manager.getCurrentMode()) {
          option.selected = true;
        }
        select.appendChild(option);
      });
      
      select.addEventListener('change', (e) => {
        if (e.target.value) {
          this.manager.setMode(e.target.value);
        }
      });
      
      switcher.appendChild(select);
    }
  }

  // ============================================
  // EXPOSE TO GLOBAL SCOPE
  // ============================================
  window.NexusModes = {
    MODES,
    ModeManager,
    ModeSwitcher
  };

  // Auto-initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    new ModeSwitcher();
  });

})();