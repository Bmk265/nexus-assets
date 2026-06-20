/**
 * NEXUS BLOGGER FRAMEWORK - Schema Markup
 * Version 1.0
 * Copyright © 2026 Nexus Framework
 */

(function() {
  'use strict';

  // ============================================
  // SCHEMA GENERATOR
  // ============================================
  class SchemaGenerator {
    constructor() {
      this.schemas = [];
      this.init();
    }

    init() {
      // Generate schemas based on page type
      this.generateArticleSchema();
      this.generateBreadcrumbSchema();
      this.generatePersonSchema();
      this.generateOrganizationSchema();
      this.generateRecipeSchema();
      this.generateCourseSchema();
      this.generateProductSchema();
      this.generateFAQSchema();

      // Inject schemas into page
      this.injectSchemas();
    }

    // ============================================
    // ARTICLE SCHEMA
    // ============================================
    generateArticleSchema() {
      const article = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': window.location.href
        },
        'headline': this.getMetaContent('og:title') || document.title,
        'description': this.getMetaContent('description'),
        'image': this.getMetaContent('og:image'),
        'author': {
          '@type': 'Person',
          'name': this.getMetaContent('article:author') || 'NEXUS Blog'
        },
        'datePublished': this.getMetaContent('article:published_time'),
        'dateModified': this.getMetaContent('article:modified_time'),
        'publisher': {
          '@type': 'Organization',
          'name': 'NEXUS Framework',
          'logo': {
            '@type': 'ImageObject',
            'url': '/assets/icons/icon-192.png'
          }
        }
      };

      // Only add if it's a blog post
      if (document.querySelector('.nexus-post')) {
        this.schemas.push(article);
      }
    }

    // ============================================
    // BREADCRUMB SCHEMA
    // ============================================
    generateBreadcrumbSchema() {
      const breadcrumbs = document.querySelectorAll('.nexus-breadcrumbs a');
      if (breadcrumbs.length > 0) {
        const items = [];
        let position = 1;

        breadcrumbs.forEach(crumb => {
          items.push({
            '@type': 'ListItem',
            'position': position++,
            'name': crumb.textContent.trim(),
            'item': crumb.href
          });
        });

        const breadcrumb = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': items
        };

        this.schemas.push(breadcrumb);
      }
    }

    // ============================================
    // PERSON SCHEMA
    // ============================================
    generatePersonSchema() {
      const authorElement = document.querySelector('.nexus-author');
      if (authorElement) {
        const person = {
          '@context': 'https://schema.org',
          '@type': 'Person',
          'name': authorElement.querySelector('.nexus-author-name')?.textContent,
          'description': authorElement.querySelector('.nexus-author-bio')?.textContent,
          'image': authorElement.querySelector('.nexus-author-image')?.src
        };

        this.schemas.push(person);
      }
    }

    // ============================================
    // ORGANIZATION SCHEMA
    // ============================================
    generateOrganizationSchema() {
      const organization = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'NEXUS Framework',
        'url': window.location.origin,
        'logo': '/assets/icons/icon-192.png',
        'sameAs': [
          'https://twitter.com/nexusframework',
          'https://github.com/nexusframework',
          'https://facebook.com/nexusframework'
        ]
      };

      this.schemas.push(organization);
    }

    // ============================================
    // RECIPE SCHEMA
    // ============================================
    generateRecipeSchema() {
      const recipeElement = document.querySelector('.nexus-recipe');
      if (recipeElement) {
        const recipe = {
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          'name': recipeElement.querySelector('.nexus-recipe-title')?.textContent,
          'description': recipeElement.querySelector('.nexus-recipe-description')?.textContent,
          'image': recipeElement.querySelector('.nexus-recipe-image')?.src,
          'author': {
            '@type': 'Person',
            'name': recipeElement.querySelector('.nexus-recipe-author')?.textContent
          },
          'prepTime': recipeElement.querySelector('.nexus-recipe-prep-time')?.textContent,
          'cookTime': recipeElement.querySelector('.nexus-recipe-cook-time')?.textContent,
          'totalTime': recipeElement.querySelector('.nexus-recipe-total-time')?.textContent,
          'recipeYield': recipeElement.querySelector('.nexus-recipe-yield')?.textContent,
          'recipeCategory': recipeElement.querySelector('.nexus-recipe-category')?.textContent,
          'recipeCuisine': recipeElement.querySelector('.nexus-recipe-cuisine')?.textContent,
          'nutrition': {
            '@type': 'NutritionInformation',
            'calories': recipeElement.querySelector('.nexus-recipe-calories')?.textContent,
            'carbohydrateContent': recipeElement.querySelector('.nexus-recipe-carbs')?.textContent,
            'proteinContent': recipeElement.querySelector('.nexus-recipe-protein')?.textContent,
            'fatContent': recipeElement.querySelector('.nexus-recipe-fat')?.textContent
          },
          'ingredients': this.getIngredients(recipeElement),
          'instructions': this.getInstructions(recipeElement)
        };

        this.schemas.push(recipe);
      }
    }

    getIngredients(element) {
      const ingredients = [];
      element.querySelectorAll('.nexus-recipe-ingredient').forEach(ing => {
        ingredients.push(ing.textContent.trim());
      });
      return ingredients;
    }

    getInstructions(element) {
      const instructions = [];
      element.querySelectorAll('.nexus-recipe-instruction').forEach((inst, index) => {
        instructions.push({
          '@type': 'HowToStep',
          'position': index + 1,
          'text': inst.textContent.trim()
        });
      });
      return instructions;
    }

    // ============================================
    // COURSE SCHEMA
    // ============================================
    generateCourseSchema() {
      const courseElement = document.querySelector('.nexus-course');
      if (courseElement) {
        const course = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          'name': courseElement.querySelector('.nexus-course-title')?.textContent,
          'description': courseElement.querySelector('.nexus-course-description')?.textContent,
          'provider': {
            '@type': 'Organization',
            'name': 'NEXUS Framework',
            'sameAs': window.location.origin
          },
          'courseCode': courseElement.querySelector('.nexus-course-code')?.textContent,
          'numberOfCredits': courseElement.querySelector('.nexus-course-credits')?.textContent,
          'educationalCredentialAwarded': courseElement.querySelector('.nexus-course-certificate')?.textContent
        };

        this.schemas.push(course);
      }
    }

    // ============================================
    // PRODUCT SCHEMA
    // ============================================
    generateProductSchema() {
      const productElement = document.querySelector('.nexus-product');
      if (productElement) {
        const product = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': productElement.querySelector('.nexus-product-title')?.textContent,
          'description': productElement.querySelector('.nexus-product-description')?.textContent,
          'image': productElement.querySelector('.nexus-product-image')?.src,
          'sku': productElement.querySelector('.nexus-product-sku')?.textContent,
          'brand': {
            '@type': 'Brand',
            'name': productElement.querySelector('.nexus-product-brand')?.textContent
          },
          'offers': {
            '@type': 'Offer',
            'price': productElement.querySelector('.nexus-product-price')?.textContent,
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': window.location.href
          },
          'aggregateRating': this.getRating(productElement)
        };

        this.schemas.push(product);
      }
    }

    getRating(element) {
      const ratingElement = element.querySelector('.nexus-product-rating');
      if (ratingElement) {
        return {
          '@type': 'AggregateRating',
          'ratingValue': ratingElement.querySelector('.nexus-rating-value')?.textContent,
          'reviewCount': ratingElement.querySelector('.nexus-rating-count')?.textContent
        };
      }
      return null;
    }

    // ============================================
    // FAQ SCHEMA
    // ============================================
    generateFAQSchema() {
      const faqElements = document.querySelectorAll('.nexus-faq-item');
      if (faqElements.length > 0) {
        const questions = [];
        faqElements.forEach(item => {
          questions.push({
            '@type': 'Question',
            'name': item.querySelector('.nexus-faq-question')?.textContent,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.querySelector('.nexus-faq-answer')?.textContent
            }
          });
        });

        const faq = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': questions
        };

        this.schemas.push(faq);
      }
    }

    // ============================================
    // HELPER METHODS
    // ============================================
    getMetaContent(property) {
      const meta = document.querySelector(`meta[property="${property}"]`) ||
                    document.querySelector(`meta[name="${property}"]`);
      return meta ? meta.getAttribute('content') : null;
    }

    // ============================================
    // INJECT SCHEMAS
    // ============================================
    injectSchemas() {
      if (this.schemas.length === 0) return;

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(this.schemas.length === 1 ? this.schemas[0] : this.schemas);
      document.head.appendChild(script);
    }
  }

  // ============================================
  // INITIALIZE
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    new SchemaGenerator();
  });

})();