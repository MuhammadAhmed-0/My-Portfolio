// ===========================
// Blog Page JavaScript
// ===========================

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Blog Posts Data (same as main script)
const blogPosts = [
    {
        id: 1,
        title: "10 SEO Trends That Will Dominate 2025",
        excerpt: "Stay ahead of the curve with these critical SEO trends that will shape search engine optimization in 2025.",
        category: "seo",
        date: "March 15, 2025",
        readTime: "8 min read",
        icon: "🔍"
    },
    {
        id: 2,
        title: "How to Create High-Converting PPC Campaigns",
        excerpt: "Master the art of PPC advertising with proven strategies to maximize ROI and reduce wasted ad spend.",
        category: "ppc",
        date: "March 12, 2025",
        readTime: "10 min read",
        icon: "💰"
    },
    {
        id: 3,
        title: "Content Marketing Strategy for 2025",
        excerpt: "Build a content marketing strategy that drives engagement, builds authority, and generates qualified leads.",
        category: "content",
        date: "March 10, 2025",
        readTime: "12 min read",
        icon: "📄"
    },
    {
        id: 4,
        title: "Website Speed Optimization Guide",
        excerpt: "Learn how to optimize your website for lightning-fast load times and better user experience.",
        category: "web-dev",
        date: "March 8, 2025",
        readTime: "15 min read",
        icon: "⚡"
    },
    {
        id: 5,
        title: "Local SEO: Complete Guide for Small Businesses",
        excerpt: "Dominate local search results with this comprehensive guide to local SEO strategies and tactics.",
        category: "seo",
        date: "March 5, 2025",
        readTime: "11 min read",
        icon: "📍"
    },
    {
        id: 6,
        title: "The Power of A/B Testing in Digital Marketing",
        excerpt: "Discover how A/B testing can dramatically improve your marketing performance and increase conversions.",
        category: "ppc",
        date: "March 3, 2025",
        readTime: "9 min read",
        icon: "🧪"
    }
];

// Create Blog Card
const createBlogCard = (post, index) => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.setAttribute('data-category', post.category);
    
    card.innerHTML = `
        <div class="blog-image">${post.icon}</div>
        <div class="blog-content">
            <div class="blog-meta">
                <span>${post.date}</span>
                <span>•</span>
                <span>${post.readTime}</span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="./blog-post-${post.id}.html" class="blog-read-more">
                Read More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </a>
        </div>
    `;
    
    return card;
};

// Render All Blog Posts
const renderBlogPosts = (category = 'all') => {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === category);
    
    filteredPosts.forEach((post, index) => {
        const card = createBlogCard(post, index);
        grid.appendChild(card);
        
        // Add animation
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }, 10);
    });
};

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter posts
        const category = btn.getAttribute('data-category');
        renderBlogPosts(category);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
});