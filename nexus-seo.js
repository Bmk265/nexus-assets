/**
 * NEXUS BLOGGER FRAMEWORK - SEO Optimizer
 * Version 1.0
 * Copyright © 2026 Nexus Framework
 */

(function() {
  'use strict';

  // ============================================
  // SEO MANAGER
  // ============================================
  class SEOManager {
    constructor() {
      this.init();
    }

    init() {
      this.generateMetaTags();
      this.generateOpenGraphTags();
      this.generateTwitterCards();
      this.generateCanonicalURL();
      this.generateKeywords();
      this.setupRobotsMeta();
      this.setupViewport();
      this.setupThemeColor();
    }

    // ============================================
    // META TAGS
    // ============================================
    generateMetaTags() {
      // Title
      const title = document.querySelector('title');
      if (title) {
        this.setMetaTag('og:title', title.textContent);
        this.setMetaTag('twitter:title', title.textContent);
      }

      // Description
      const description = this.getMetaContent('description');
      if (description) {
        this.setMetaTag('og:description', description);
        this.setMetaTag('twitter:description', description);
      }

      // Author
      const author = this.getMetaContent('author');
      if (author) {
        this.setMetaTag('article:author', author);
      }

      // Keywords
      const keywords = this.getMetaContent('keywords');
      if (keywords) {
        this.setMetaTag('news_keywords', keywords);
      }
    }

    // ============================================
    // OPEN GRAPH TAGS
    // ============================================
    generateOpenGraphTags() {
      // Base properties
      this.setMetaTag('og:type', 'website');
      this.setMetaTag('og:site_name', 'NEXUS Framework');
      this.setMetaTag('og:url', window.location.href);
      this.setMetaTag('og:locale', 'en_US');

      // Image
      const image = this.getMetaContent('og:image') || 
                    this.getMetaContent('twitter:image') ||
                    '/assets/images/default-og-image.jpg';
      this.setMetaTag('og:image', image);
      this.setMetaTag('og:image:width', '1200');
      this.setMetaTag('og:image:height', '630');

      // Article specific
      if (document.querySelector('.nexus-post')) {
        this.setMetaTag('og:type', 'article');
        this.setMetaTag('article:published_time', this.getMetaContent('article:published_time'));
        this.setMetaTag('article:modified_time', this.getMetaContent('article:modified_time'));
        this.setMetaTag('article:section', this.getMetaContent('article:section'));
        this.setMetaTag('article:tag', this.getMetaContent('article:tag'));
      }
    }

    // ============================================
    // TWITTER CARDS
    // ============================================
    generateTwitterCards() {
      this.setMetaTag('twitter:card', 'summary_large_image');
      this.setMetaTag('twitter:site', '@nexusframework');
      this.setMetaTag('twitter:creator', '@nexusframework');
      
      const image = this.getMetaContent('twitter:image') || this.getMetaContent('og:image');
      if (image) {
        this.setMetaTag('twitter:image', image);
      }
    }

    // ============================================
    // CANONICAL URL
    // ============================================
    generateCanonicalURL() {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = window.location.href.split('?')[0]; // Remove query parameters
        document.head.appendChild(link);
      }
    }

    // ============================================
    // KEYWORDS
    // ============================================
    generateKeywords() {
      // Add keywords based on page content
      const categories = document.querySelectorAll('.nexus-post-category');
      const tags = document.querySelectorAll('.nexus-post-tag');
      const keywords = [];

      categories.forEach(cat => keywords.push(cat.textContent.trim()));
      tags.forEach(tag => keywords.push(tag.textContent.trim()));

      if (keywords.length > 0) {
        this.setMetaTag('keywords', keywords.join(', '));
      }
    }

    // ============================================
    // ROBOTS META
    // ============================================
    setupRobotsMeta() {
      let robots = this.getMetaContent('robots');
      if (!robots) {
        robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
        this.setMetaTag('robots', robots);
      }

      // Set Google-specific directives
      this.setMetaTag('google', 'notranslate');
    }

    // ============================================
    // VIEWPORT
    // ============================================
    setupViewport() {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
        document.head.appendChild(meta);
      }
    }

    // ============================================
    // THEME COLOR
    // ============================================
    setupThemeColor() {
      // Add theme color meta for mobile browsers
      this.setMetaTag('theme-color', '#6C63FF');
      
      // Add apple-specific meta tags
      this.setMetaTag('apple-mobile-web-app-capable', 'yes');
      this.setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
      this.setMetaTag('apple-mobile-web-app-title', 'NEXUS');
    }

    // ============================================
    // HELPER METHODS
    // ============================================
    getMetaContent(name) {
      const meta = document.querySelector(`meta[name="${name}"]`) ||
                    document.querySelector(`meta[property="${name}"]`);
      return meta ? meta.getAttribute('content') : null;
    }

    setMetaTag(name, content) {
      if (!content) return;

      let meta = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`);

      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('article:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    }

    removeMetaTag(name) {
      const meta = document.querySelector(`meta[name="${name}"]`) ||
                   document.querySelector(`meta[property="${name}"]`);
      if (meta) {
        meta.remove();
      }
    }
  }

  // ============================================
  // INITIALIZE
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    new SEOManager();
  });

})();