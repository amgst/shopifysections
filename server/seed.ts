import { db } from "./db";
import { sections, installations } from "@shared/schema";

const seedSections = [
  {
    name: 'Hero Banner Pro',
    description: 'A stunning hero section with animated backgrounds, call-to-action buttons, and video backgrounds. Perfect for landing pages and promotional content that converts visitors into customers.',
    category: 'Hero Banners',
    price: '12.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    liquidCode: `<!-- Hero Banner Pro Section -->
<div class="hero-banner-pro" style="background-image: url({{ section.settings.background_image | img_url: '1920x1080' }});">
  <div class="hero-content">
    <h1 class="hero-title">{{ section.settings.title | default: 'Welcome to Our Store' }}</h1>
    <p class="hero-subtitle">{{ section.settings.subtitle | default: 'Discover amazing products' }}</p>
    {% if section.settings.button_text != blank %}
      <a href="{{ section.settings.button_link }}" class="hero-button">{{ section.settings.button_text }}</a>
    {% endif %}
  </div>
</div>

{% schema %}
{
  "name": "Hero Banner Pro",
  "settings": [
    {
      "type": "image_picker",
      "id": "background_image",
      "label": "Background Image"
    },
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Welcome to Our Store"
    },
    {
      "type": "textarea",
      "id": "subtitle",
      "label": "Subtitle",
      "default": "Discover amazing products"
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button Text"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button Link"
    }
  ]
}
{% endschema %}`,
    settingsSchema: null,
    isPopular: true,
    downloads: 1250,
    rating: '4.8',
  },
  {
    name: 'Customer Reviews Widget',
    description: 'Display customer testimonials with star ratings, customer photos, and social proof indicators. Build trust and credibility with authentic customer feedback.',
    category: 'Testimonials',
    price: '0.00',
    isFree: true,
    previewImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    liquidCode: `<!-- Customer Reviews Widget -->
<div class="customer-reviews">
  <h2>{{ section.settings.heading | default: 'What Our Customers Say' }}</h2>
  <div class="reviews-grid">
    {% for block in section.blocks %}
      <div class="review-card">
        {% if block.settings.customer_image %}
          <img src="{{ block.settings.customer_image | img_url: '80x80' }}" alt="{{ block.settings.customer_name }}" class="customer-photo">
        {% endif %}
        <div class="review-content">
          <div class="stars">
            {% for i in (1..5) %}
              <span class="star {% if i <= block.settings.rating %}filled{% endif %}">★</span>
            {% endfor %}
          </div>
          <p class="review-text">{{ block.settings.review_text }}</p>
          <p class="customer-name">{{ block.settings.customer_name }}</p>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Customer Reviews",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "What Our Customers Say"
    }
  ],
  "blocks": [
    {
      "type": "review",
      "name": "Customer Review",
      "settings": [
        {
          "type": "image_picker",
          "id": "customer_image",
          "label": "Customer Photo"
        },
        {
          "type": "text",
          "id": "customer_name",
          "label": "Customer Name"
        },
        {
          "type": "textarea",
          "id": "review_text",
          "label": "Review Text"
        },
        {
          "type": "range",
          "id": "rating",
          "label": "Star Rating",
          "min": 1,
          "max": 5,
          "default": 5
        }
      ]
    }
  ]
}
{% endschema %}`,
    settingsSchema: null,
    isPopular: false,
    downloads: 892,
    rating: '4.6',
  },
  {
    name: 'Product Showcase Grid',
    description: 'Feature your best products with elegant grid layout, hover effects, and quick view functionality. Perfect for highlighting featured collections and bestsellers.',
    category: 'Product Features',
    price: '8.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    liquidCode: `<!-- Product Showcase Grid -->
<div class="product-showcase">
  <h2>{{ section.settings.heading | default: 'Featured Products' }}</h2>
  <div class="products-grid">
    {% for product in collections[section.settings.collection].products limit: section.settings.products_to_show %}
      <div class="product-card">
        <a href="{{ product.url }}">
          <img src="{{ product.featured_image | img_url: '400x400' }}" alt="{{ product.title }}" class="product-image">
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-price">{{ product.price | money }}</p>
          </div>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Product Showcase",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Featured Products"
    },
    {
      "type": "collection",
      "id": "collection",
      "label": "Collection"
    },
    {
      "type": "range",
      "id": "products_to_show",
      "label": "Products to Show",
      "min": 2,
      "max": 12,
      "default": 6
    }
  ]
}
{% endschema %}`,
    settingsSchema: null,
    isPopular: true,
    downloads: 2103,
    rating: '4.9',
  },
  {
    name: 'FAQ Accordion',
    description: 'Interactive FAQ section with smooth accordion animations and search functionality. Help customers find answers quickly and reduce support tickets.',
    category: 'FAQ Sections',
    price: '5.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    liquidCode: `<!-- FAQ Accordion -->
<div class="faq-accordion">
  <h2>{{ section.settings.heading | default: 'Frequently Asked Questions' }}</h2>
  {% if section.settings.enable_search %}
    <input type="text" class="faq-search" placeholder="Search FAQs...">
  {% endif %}
  <div class="faq-list">
    {% for block in section.blocks %}
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">
          {{ block.settings.question }}
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-content">
            {{ block.settings.answer }}
          </div>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "FAQ Accordion",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Section Heading",
      "default": "Frequently Asked Questions"
    },
    {
      "type": "checkbox",
      "id": "enable_search",
      "label": "Enable Search",
      "default": true
    }
  ],
  "blocks": [
    {
      "type": "faq",
      "name": "FAQ Item",
      "settings": [
        {
          "type": "text",
          "id": "question",
          "label": "Question"
        },
        {
          "type": "richtext",
          "id": "answer",
          "label": "Answer"
        }
      ]
    }
  ]
}
{% endschema %}`,
    settingsSchema: null,
    isPopular: false,
    downloads: 567,
    rating: '4.5',
  },
  {
    name: 'Image Gallery Masonry',
    description: 'Beautiful masonry layout gallery with lightbox functionality and image lazy loading. Perfect for showcasing your work, products, or brand story.',
    category: 'Image Galleries',
    price: '9.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    liquidCode: `<!-- Image Gallery Masonry -->
<div class="gallery-masonry">
  <h2>{{ section.settings.heading | default: 'Gallery' }}</h2>
  <div class="masonry-grid">
    {% for block in section.blocks %}
      <div class="gallery-item">
        <img src="{{ block.settings.image | img_url: '600x' }}" alt="{{ block.settings.alt_text }}" class="gallery-image" loading="lazy">
        {% if block.settings.caption %}
          <div class="gallery-caption">{{ block.settings.caption }}</div>
        {% endif %}
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Image Gallery",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Gallery Heading",
      "default": "Gallery"
    }
  ],
  "blocks": [
    {
      "type": "image",
      "name": "Gallery Image",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Image"
        },
        {
          "type": "text",
          "id": "alt_text",
          "label": "Alt Text"
        },
        {
          "type": "text",
          "id": "caption",
          "label": "Caption"
        }
      ]
    }
  ]
}
{% endschema %}`,
    settingsSchema: null,
    isPopular: true,
    downloads: 734,
    rating: '4.7',
  },
  {
    name: 'Newsletter Signup Form',
    description: 'Convert visitors with beautiful newsletter signup forms and email collection widgets. Includes multiple design variants and integration options.',
    category: 'Newsletter Signup',
    price: '0.00',
    isFree: true,
    previewImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    liquidCode: `<!-- Newsletter Signup Form -->
<div class="newsletter-signup">
  <div class="newsletter-content">
    <h2>{{ section.settings.heading | default: 'Stay Updated' }}</h2>
    <p>{{ section.settings.description | default: 'Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.' }}</p>
    <form class="newsletter-form" action="{{ routes.cart_add_url }}" method="post" enctype="multipart/form-data">
      <input type="email" name="contact[email]" placeholder="{{ section.settings.placeholder | default: 'Enter your email' }}" required>
      <button type="submit">{{ section.settings.button_text | default: 'Subscribe' }}</button>
    </form>
  </div>
</div>

{% schema %}
{
  "name": "Newsletter Signup",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Stay Updated"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "default": "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals."
    },
    {
      "type": "text",
      "id": "placeholder",
      "label": "Email Placeholder",
      "default": "Enter your email"
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button Text",
      "default": "Subscribe"
    }
  ]
}
{% endschema %}`,
    settingsSchema: null,
    isPopular: false,
    downloads: 1456,
    rating: '4.4',
  },
];

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data (in order due to foreign key constraints)
    console.log('Clearing existing installations...');
    await db.delete(installations);
    
    console.log('Clearing existing sections...');
    await db.delete(sections);
    
    // Insert seed sections
    console.log('Inserting new sections...');
    await db.insert(sections).values(seedSections);
    
    console.log(`Seeded ${seedSections.length} sections successfully!`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}