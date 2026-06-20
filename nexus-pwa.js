/**
 * NEXUS BLOGGER FRAMEWORK - PWA Support
 * Version 1.0
 * Copyright © 2026 Nexus Framework
 */

(function() {
  'use strict';

  // ============================================
  // PWA MANAGER
  // ============================================
  class PWAManager {
    constructor() {
      this.deferredPrompt = null;
      this.isInstalled = false;
      this.init();
    }

    init() {
      // Check if already installed
      this.checkInstallationStatus();
      
      // Listen for install prompt
      this.setupInstallPrompt();
      
      // Register service worker
      this.registerServiceWorker();
      
      // Setup offline detection
      this.setupOfflineDetection();
      
      // Setup update checking
      this.setupUpdateChecking();
    }

    // ============================================
    // INSTALLATION STATUS
    // ============================================
    checkInstallationStatus() {
      // Check if installed on mobile
      if (window.navigator.standalone) {
        this.isInstalled = true;
        console.log('NEXUS: App is installed on iOS');
      }
      
      // Check display mode
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.isInstalled = true;
        console.log('NEXUS: App is installed in standalone mode');
      }
      
      // Dispatch event for UI
      window.dispatchEvent(new CustomEvent('nexusPWAStatus', {
        detail: { isInstalled: this.isInstalled }
      }));
    }

    // ============================================
    // INSTALL PROMPT
    // ============================================
    setupInstallPrompt() {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent default prompt
        e.preventDefault();
        this.deferredPrompt = e;
        
        // Show install button
        this.showInstallButton();
        
        console.log('NEXUS: Install prompt available');
      });
      
      // Listen for app installed
      window.addEventListener('appinstalled', () => {
        this.isInstalled = true;
        this.hideInstallButton();
        console.log('NEXUS: App installed successfully');
        
        // Track installation
        if (typeof gtag !== 'undefined') {
          gtag('event', 'pwa_install', {
            'event_category': 'PWA',
            'event_label': 'Installation'
          });
        }
      });
    }

    // ============================================
    // INSTALLATION UI
    // ============================================
    showInstallButton() {
      const installBtn = document.querySelector('.nexus-install-pwa');
      if (installBtn) {
        installBtn.style.display = 'flex';
        installBtn.addEventListener('click', this.installApp.bind(this));
      }
    }

    hideInstallButton() {
      const installBtn = document.querySelector('.nexus-install-pwa');
      if (installBtn) {
        installBtn.style.display = 'none';
      }
    }

    async installApp() {
      if (!this.deferredPrompt) {
        console.warn('NEXUS: No install prompt available');
        return;
      }
      
      try {
        // Show install prompt
        const result = await this.deferredPrompt.prompt();
        console.log('NEXUS: Install prompt result:', result);
        
        // Wait for user choice
        const choiceResult = await this.deferredPrompt.userChoice;
        console.log('NEXUS: User choice:', choiceResult.outcome);
        
        // Clear deferred prompt
        this.deferredPrompt = null;
        
        // Hide install button
        this.hideInstallButton();
        
        // Track event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'pwa_install_prompt', {
            'event_category': 'PWA',
            'event_label': choiceResult.outcome
          });
        }
      } catch (error) {
        console.error('NEXUS: Install error:', error);
      }
    }

    // ============================================
    // SERVICE WORKER
    // ============================================
    registerServiceWorker() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('NEXUS: ServiceWorker registered:', registration);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              console.log('NEXUS: New service worker found');
              
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('NEXUS: Update available');
                  this.showUpdateNotification();
                }
              });
            });
          })
          .catch((error) => {
            console.error('NEXUS: ServiceWorker registration failed:', error);
          });
      } else {
        console.warn('NEXUS: ServiceWorker not supported');
      }
    }

    // ============================================
    // OFFLINE DETECTION
    // ============================================
    setupOfflineDetection() {
      window.addEventListener('online', () => {
        console.log('NEXUS: Online');
        this.hideOfflineNotification();
        this.syncData();
      });
      
      window.addEventListener('offline', () => {
        console.log('NEXUS: Offline');
        this.showOfflineNotification();
      });
    }

    showOfflineNotification() {
      const notification = document.querySelector('.nexus-offline-notification');
      if (notification) {
        notification.style.display = 'flex';
      }
    }

    hideOfflineNotification() {
      const notification = document.querySelector('.nexus-offline-notification');
      if (notification) {
        notification.style.display = 'none';
      }
    }

    // ============================================
    // UPDATE CHECKING
    // ============================================
    setupUpdateChecking() {
      // Check for updates periodically
      setInterval(() => {
        this.checkForUpdates();
      }, 60 * 60 * 1000); // Every hour
    }

    checkForUpdates() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.update();
        });
      }
    }

    showUpdateNotification() {
      const notification = document.querySelector('.nexus-update-notification');
      if (notification) {
        notification.style.display = 'flex';
        
        const refreshBtn = notification.querySelector('.nexus-update-refresh');
        if (refreshBtn) {
          refreshBtn.addEventListener('click', () => {
            window.location.reload();
          });
        }
      }
    }

    // ============================================
    // DATA SYNC
    // ============================================
    syncData() {
      if (!navigator.onLine) return;
      
      // Check for pending sync items
      this.getPendingSyncItems().then((items) => {
        if (items.length === 0) return;
        
        console.log('NEXUS: Syncing', items.length, 'items');
        
        items.forEach(item => {
          this.syncItem(item);
        });
      });
    }

    async getPendingSyncItems() {
      try {
        const cache = await caches.open('nexus-pending');
        const keys = await cache.keys();
        const items = [];
        
        for (const key of keys) {
          const response = await cache.match(key);
          if (response) {
            const data = await response.json();
            items.push(data);
          }
        }
        
        return items;
      } catch (error) {
        console.error('NEXUS: Error getting pending items:', error);
        return [];
      }
    }

    async syncItem(item) {
      try {
        const response = await fetch(item.url, {
          method: item.method || 'POST',
          headers: item.headers || {},
          body: item.body
        });
        
        if (response.ok) {
          console.log('NEXUS: Synced item:', item);
          
          // Remove from pending cache
          const cache = await caches.open('nexus-pending');
          await cache.delete(item.url);
        }
      } catch (error) {
        console.error('NEXUS: Sync error:', error);
      }
    }

    // ============================================
    // BACKGROUND SYNC
    // ============================================
    async setupBackgroundSync() {
      if ('sync' in navigator.serviceWorker) {
        try {
          const registration = await navigator.serviceWorker.ready;
          await registration.sync.register('nexus-sync');
          console.log('NEXUS: Background sync registered');
        } catch (error) {
          console.error('NEXUS: Background sync error:', error);
        }
      }
    }

    // ============================================
    // PUSH NOTIFICATIONS
    // ============================================
    async setupPushNotifications() {
      if (!('PushManager' in window)) {
        console.warn('NEXUS: Push notifications not supported');
        return;
      }
      
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        
        if (!subscription) {
          console.log('NEXUS: No push subscription found');
          // Request permission and subscribe
          await this.requestPushPermission(registration);
        } else {
          console.log('NEXUS: Push subscription exists');
        }
      } catch (error) {
        console.error('NEXUS: Push notification error:', error);
      }
    }

    async requestPushPermission(registration) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            'BBVa9zRlKZdxRoLt8y_cjGq5ZK6V_8VZzCk2dVbZxvBx5Kk9xNpRyrCXh8v6UqQFvXl2oNfVvY-jJ_F7p2R1wL8' // Replace with your VAPID public key
          )
        });
        
        console.log('NEXUS: Push subscription created:', subscription);
        
        // Send subscription to server
        await this.sendSubscriptionToServer(subscription);
      }
    }

    async sendSubscriptionToServer(subscription) {
      // Send to your server
      console.log('NEXUS: Sending subscription to server:', subscription);
    }

    urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
      
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    // ============================================
    // CLEANUP
    // ============================================
    async clearCache() {
      try {
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames.map(name => {
          // Only delete old versions
          if (name !== 'nexus-framework-v1') {
            return caches.delete(name);
          }
        });
        await Promise.all(deletePromises);
        console.log('NEXUS: Old cache cleared');
      } catch (error) {
        console.error('NEXUS: Cache clear error:', error);
      }
    }

    // ============================================
    // STATUS API
    // ============================================
    getStatus() {
      return {
        isInstalled: this.isInstalled,
        isOnline: navigator.onLine,
        hasServiceWorker: 'serviceWorker' in navigator,
        hasPushNotifications: 'PushManager' in window,
        hasBackgroundSync: 'sync' in navigator.serviceWorker
      };
    }
  }

  // ============================================
  // INITIALIZE
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    window.NexusPWA = new PWAManager();
  });

})();