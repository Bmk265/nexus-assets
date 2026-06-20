/**
 * NEXUS BLOGGER FRAMEWORK - Widgets
 * Version 1.0
 * Copyright © 2026 Nexus Framework
 */

(function() {
  'use strict';

  // ============================================
  // COUNTDOWN WIDGET
  // ============================================
  class CountdownWidget {
    constructor() {
      this.widgets = document.querySelectorAll('.nexus-countdown');
      this.init();
    }

    init() {
      this.widgets.forEach(widget => {
        const targetDate = widget.dataset.target;
        if (!targetDate) return;
        
        this.startCountdown(widget, targetDate);
      });
    }

    startCountdown(widget, targetDate) {
      const target = new Date(targetDate).getTime();
      
      const update = () => {
        const now = new Date().getTime();
        const diff = target - now;
        
        if (diff <= 0) {
          widget.innerHTML = '<div class="nexus-countdown-ended">Countdown Ended</div>';
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const items = widget.querySelectorAll('.nexus-countdown-item');
        if (items.length === 4) {
          items[0].querySelector('span:first-child').textContent = String(days).padStart(2, '0');
          items[1].querySelector('span:first-child').textContent = String(hours).padStart(2, '0');
          items[2].querySelector('span:first-child').textContent = String(minutes).padStart(2, '0');
          items[3].querySelector('span:first-child').textContent = String(seconds).padStart(2, '0');
        }
      };
      
      update();
      setInterval(update, 1000);
    }
  }

  // ============================================
  // WEATHER WIDGET
  // ============================================
  class WeatherWidget {
    constructor() {
      this.widgets = document.querySelectorAll('.nexus-weather');
      this.init();
    }

    init() {
      this.widgets.forEach(widget => {
        const location = widget.dataset.location || 'New York';
        this.fetchWeather(widget, location);
      });
    }

    async fetchWeather(widget, location) {
      try {
        // Using free weather API (replace with your key)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=YOUR_API_KEY`
        );
        
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        this.renderWeather(widget, data);
      } catch (error) {
        widget.innerHTML = '<p>Weather data unavailable</p>';
        console.warn('Weather widget error:', error);
      }
    }

    renderWeather(widget, data) {
      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].description;
      const icon = data.weather[0].icon;
      
      widget.innerHTML = `
        <div class="nexus-weather-display">
          <img src="https://openweathermap.org/img/w/${icon}.png" alt="${condition}" />
          <div class="nexus-weather-temp">${temp}°C</div>
          <div class="nexus-weather-condition">${condition}</div>
          <div class="nexus-weather-location">${data.name}</div>
        </div>
      `;
    }
  }

  // ============================================
  // CALCULATOR WIDGET
  // ============================================
  class CalculatorWidget {
    constructor() {
      this.widgets = document.querySelectorAll('.nexus-calculator');
      this.init();
    }

    init() {
      this.widgets.forEach(widget => {
        this.buildCalculator(widget);
      });
    }

    buildCalculator(widget) {
      const display = widget.querySelector('.nexus-calc-display');
      const buttons = widget.querySelectorAll('.nexus-calc-btn');
      
      let currentValue = '0';
      let previousValue = '';
      let operation = null;
      let shouldResetDisplay = false;
      
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const action = button.dataset.action;
          const value = button.dataset.value;
          
          switch (action) {
            case 'number':
              if (shouldResetDisplay || currentValue === '0') {
                currentValue = value;
                shouldResetDisplay = false;
              } else {
                currentValue += value;
              }
              display.textContent = currentValue;
              break;
              
            case 'decimal':
              if (!currentValue.includes('.')) {
                currentValue += '.';
                display.textContent = currentValue;
              }
              break;
              
            case 'operator':
              previousValue = currentValue;
              operation = value;
              shouldResetDisplay = true;
              break;
              
            case 'calculate':
              if (operation && previousValue !== '') {
                const prev = parseFloat(previousValue);
                const current = parseFloat(currentValue);
                let result = 0;
                
                switch (operation) {
                  case '+': result = prev + current; break;
                  case '-': result = prev - current; break;
                  case '*': result = prev * current; break;
                  case '/': result = prev / current; break;
                }
                
                currentValue = String(result);
                display.textContent = currentValue;
                operation = null;
                previousValue = '';
                shouldResetDisplay = true;
              }
              break;
              
            case 'clear':
              currentValue = '0';
              previousValue = '';
              operation = null;
              display.textContent = '0';
              shouldResetDisplay = false;
              break;
              
            case 'backspace':
              if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
              } else {
                currentValue = '0';
              }
              display.textContent = currentValue;
              break;
          }
        });
      });
    }
  }

  // ============================================
  // QUOTE WIDGET
  // ============================================
  class QuoteWidget {
    constructor() {
      this.widgets = document.querySelectorAll('.nexus-quote');
      this.quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The best way to predict the future is to create it.", author: "Peter Drucker" }
      ];
      this.init();
    }

    init() {
      this.widgets.forEach(widget => {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        widget.innerHTML = `
          <blockquote class="nexus-quote-text">"${randomQuote.text}"</blockquote>
          <cite class="nexus-quote-author">— ${randomQuote.author}</cite>
        `;
      });
    }
  }

  // ============================================
  // TABLE OF CONTENTS
  // ============================================
  class TableOfContents {
    constructor() {
      this.widgets = document.querySelectorAll('.nexus-toc');
      this.init();
    }

    init() {
      this.widgets.forEach(toc => {
        const target = document.querySelector(toc.dataset.target || '.nexus-post-content');
        if (!target) return;
        
        const headings = target.querySelectorAll('h2, h3');
        if (headings.length === 0) return;
        
        const list = document.createElement('ul');
        let currentLevel = 0;
        
        headings.forEach((heading, index) => {
          const level = heading.tagName.toLowerCase() === 'h2' ? 1 : 2;
          const id = heading.id || `toc-heading-${index}`;
          heading.id = id;
          
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${id}`;
          a.textContent = heading.textContent;
          a.className = `nexus-toc-level-${level}`;
          
          li.appendChild(a);
          
          if (level > currentLevel) {
            const subList = document.createElement('ul');
            li.appendChild(subList);
            list.appendChild(li);
          } else {
            list.appendChild(li);
          }
          
          currentLevel = level;
        });
        
        toc.appendChild(list);
        
        // Smooth scroll for TOC links
        toc.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      });
    }
  }

  // ============================================
  // CODE HIGHLIGHTER
  // ============================================
  class CodeHighlighter {
    constructor() {
      this.blocks = document.querySelectorAll('.nexus-code-block');
      this.init();
    }

    init() {
      this.blocks.forEach(block => {
        const pre = block.querySelector('pre');
        if (!pre) return;
        
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'nexus-code-block-copy';
        copyBtn.textContent = 'Copy';
        block.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', () => {
          const code = pre.textContent;
          navigator.clipboard.writeText(code).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = 'Copy';
            }, 2000);
          });
        });
      });
    }
  }

  // ============================================
  // INITIALIZE WIDGETS
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    new CountdownWidget();
    new WeatherWidget();
    new CalculatorWidget();
    new QuoteWidget();
    new TableOfContents();
    new CodeHighlighter();
  });

})();