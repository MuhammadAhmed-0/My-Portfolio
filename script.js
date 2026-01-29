// ===========================
// Navigation Scroll Effect
// ===========================
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

// ===========================
// Hero Stats Counter Animation
// ===========================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Trigger counter animation when visible
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// ===========================
// Scroll Animations (AOS)
// ===========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
};

animateOnScroll();

// ===========================
// Case Studies Data
// ===========================
const caseStudies = [
  {
    title: "101% Organic Traffic Growth for B2B AI SaaS",
    category: "SEO",
    description: "Increased organic traffic by 101% for a B2B AI SaaS client using a focused SEO strategy.",
    result: "101% traffic growth",
    image: "assets/casestudies/Seo-1.webp",
    alt: "SEO case study: 101% increase in organic traffic for a B2B AI SaaS client",
    loading: "lazy"
  },
  {
    title: "90% Organic Growth for Website Builder SaaS",
    category: "SEO",
    description: "Achieved a 90% increase in organic traffic for a website building SaaS through SEO optimization.",
    result: "90% traffic increase",
    image: "assets/casestudies/Seo-2.webp",
    alt: "SEO case study: 90% increase in organic traffic for a website builder SaaS client",
    loading: "lazy"
  },
  {
    title: "85% Organic Growth for Oral Care E-commerce",
    category: "SEO",
    description: "Drove 85% organic traffic growth for an oral care niche e-commerce store using SEO strategy.",
    result: "85% traffic growth",
    image: "assets/casestudies/Seo-3.webp",
    alt: "SEO case study: 85% increase in organic traffic for an oral care e-commerce store",
    loading: "lazy"
  },
  {
    title: "67% Organic Traffic Increase for Skincare Brand",
    category: "SEO",
    description: "Increased organic traffic by 67% for a skincare niche e-commerce store using SEO best practices.",
    result: "67% traffic growth",
    image: "assets/casestudies/Seo-4.webp",
    alt: "SEO case study: 67% increase in organic traffic for a skincare e-commerce store",
    loading: "lazy"
  },
  {
    title: "89% Organic Growth for Real Estate Website",
    category: "SEO",
    description: "Improved organic traffic by 89% for a real estate client through SEO-focused optimization.",
    result: "89% traffic increase",
    image: "assets/casestudies/Seo-5.webp",
    alt: "SEO case study: 89% increase in organic traffic for a real estate website",
    loading: "lazy"
  },
  {
    title: "76% Organic Growth for Local Plumbing Business",
    category: "SEO",
    description: "Achieved 76% organic traffic growth for a local plumbing business using local SEO strategy.",
    result: "76% traffic growth",
    image: "assets/casestudies/Seo-6.webp",
    alt: "SEO case study: 76% increase in organic traffic for a local plumbing business",
    loading: "lazy"
  },
  {
    title: "Lead Generation via Facebook Ads for Flooring Business",
    category: "Facebook Ads",
    description: "Maximized lead generation for a flooring business using Facebook Ads campaigns.",
    result: "Consistent lead growth",
    image: "assets/casestudies/fb-ads1.webp",
    alt: "Facebook Ads case study: lead generation campaign for a flooring business",
    loading: "lazy"
  },
  {
    title: "5.02 ROAS for SaaS Company via Facebook Ads",
    category: "Facebook Ads",
    description: "Achieved a 5.02 ROAS for a SaaS company through optimized Facebook Ads strategy.",
    result: "5.02 ROAS",
    image: "assets/casestudies/fb-ads2.webp",
    alt: "Facebook Ads case study: 5.02 ROAS achieved for a SaaS company",
    loading: "lazy"
  },
  {
    title: "Scaling High-AOV E-commerce with Facebook Ads",
    category: "Facebook Ads",
    description: "Scaled a high-AOV e-commerce store using Facebook Ads with optimized targeting and creatives.",
    result: "Scalable paid growth",
    image: "assets/casestudies/fb-ads3.webp",
    alt: "Facebook Ads case study: scaling a high-AOV e-commerce store with paid social",
    loading: "lazy"
  },
  {
    title: "33.74% ROAS Growth for Roofing Company",
    category: "Google Ads",
    description: "Generated a 33.74% ROAS for a roofing business using targeted Google Ads campaigns.",
    result: "33.74% ROAS",
    image: "assets/casestudies/google-ads-1.webp",
    alt: "Google Ads case study: 33.74% ROAS for a roofing company campaign",
    loading: "lazy"
  },
  {
    title: "Google Ads Optimization: 34% Cost Reduction",
    category: "Google Ads",
    description: "Increased leads by 7% while reducing Google Ads costs by 34% for a local business.",
    result: "34% lower ad cost",
    image: "assets/casestudies/google-ads-2.webp",
    alt: "Google Ads case study: reduced costs by 34% while increasing leads by 7% for a local business",
    loading: "lazy"
  },
  {
    title: "41% Lead Increase in 30 Days (Education)",
    category: "Google Ads",
    description: "Achieved a 41% increase in leads within 30 days for an education provider using Google Ads.",
    result: "41% more leads",
    image: "assets/casestudies/google-ads-3.webp",
    alt: "Google Ads case study: 41% increase in leads in 30 days for an education provider",
    loading: "lazy"
  }
];

// Render Case Studies
// ===============================
// Case Studies Toggle Functionality
// ===============================

const caseStudiesGrid = document.getElementById("caseStudiesGrid");
const toggleCaseStudiesBtn = document.getElementById("toggleCaseStudies");

const INITIAL_COUNT = 3;
let showAll = false;

function renderCaseStudies() {
  caseStudiesGrid.innerHTML = "";

  const studiesToShow = showAll
    ? caseStudies
    : caseStudies.slice(0, INITIAL_COUNT);

  studiesToShow.forEach((study) => {
    const card = document.createElement("div");
    card.className = "case-study-card";

    card.innerHTML = `
      <div class="case-study-image">
        <img 
          src="${study.image}" 
          alt="${study.alt}" 
          loading="lazy" 
          decoding="async"
        />
      </div>

      <div class="case-study-content">
        <span class="case-study-category">${study.category}</span>
        <h3 class="case-study-title">${study.title}</h3>
        <p class="case-study-description">${study.description}</p>
        <div class="case-study-result">
          ${study.result}
        </div>
      </div>
    `;

    caseStudiesGrid.appendChild(card);
  });

  // Update button text
  toggleCaseStudiesBtn.textContent = showAll
    ? "Show Less"
    : "View All Case Studies";
}

// Button click
toggleCaseStudiesBtn.addEventListener("click", () => {
  showAll = !showAll;
  renderCaseStudies();

  // Smooth scroll back when collapsing
  if (!showAll) {
    document
      .getElementById("case-studies")
      .scrollIntoView({ behavior: "smooth" });
  }
});

// Initial render
renderCaseStudies();

// ===============================
// Certifications: Slider + Modal
// ===============================

const certificates = [
  {
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google",
    image: "assets/certification/Foundation of Digital Marketing and Ecommerce BY Google_page.jpg",
    alt: "Foundations of Digital Marketing and E-commerce certificate by Google",
    loading: "lazy"
  },
  {
    title: "Digital Advertising 101",
    issuer: "SEMrush",
    image: "assets/certification/Digital Advertising 101 by semrush_page-0001-min-min.jpg",
    alt: "Digital Advertising 101 certificate by SEMrush",
    loading: "lazy"
  },
  {
    title: "Digital Marketing Strategy",
    issuer: "Simplilearn",
    image: "assets/certification/Digital_Marketing_Strategy.jpg",
    alt: "Digital Marketing Strategy certificate by Simplilearn",
    loading: "lazy"
  },
  {
    title: "Introduction to Cognitive Project Management in AI (CPMAI)™",
    issuer: "PMI",
    image: "assets/certification/Introduction to Cognitive Project Management in AI (CPMAI)™.jpg",
    alt: "Introduction to Cognitive Project Management in AI (CPMAI) certificate by PMI",
    loading: "lazy"
  },
  {
    title: "Project Management",
    issuer: "Oxford Home Study Center",
    image: "assets/certification/Project Management By Oxford Home Study Centre_page-0001-min-min.jpg",
    alt: "Project Management certificate by Oxford Home Study Center",
    loading: "lazy"
  },
  {
    title: "Attract and Engage Customers with Digital Marketing",
    issuer: "Google",
    image: "assets/certification/Attract and Engage Customers with Digital Marketing_page-0001-min-min.jpg",
    alt: "Attract and Engage Customers with Digital Marketing certificate by Google",
    loading: "lazy"
  },
  {
    title: "Agile Scrum Master",
    issuer: "Simplilearn",
    image: "assets/certification/Agile_Scrum_Master.jpg",
    alt: "Agile Scrum Master certificate by Simplilearn",
    loading: "lazy"
  },
  {
    title: "AI For Everyone",
    issuer: "Coursera",
    image: "assets/certification/ai-for-everyone.jpg",
    alt: "AI For Everyone certificate by Coursera",
    loading: "lazy"
  },
  {
    title: "From Likes to Leads: Interact with Customers Online",
    issuer: "Google",
    image: "assets/certification/Interect with customer, Social media Certificate_page-0001-min-min.jpg",
    alt: "From Likes to Leads certificate by Google",
    loading: "lazy"
  },
  {
    title: "The Fundamental of Digital Marketing",
    issuer: "Google Garage",
    image: "assets/certification/Digital marketing certificate_page.jpg",
    alt: "The Fundamental of Digital Marketing certificate by Google Garage",
    loading: "lazy"
  },
  {
    title: "Email Marketing (Increase Sales with Email)",
    issuer: "Udemy",
    image: "assets/certification/Email Marketing. Increase Sales With Email Marketing!_page-0001-min-min.jpg",
    alt: "Email Marketing certificate by Udemy",
    loading: "lazy"
  },
  {
    title: "Digital Marketing (Short Course)",
    issuer: "Oxford Home Study Center",
    image: "assets/certification/oxford_digital_marketing_short_course_page-0001-min-min.jpg",
    alt: "Digital Marketing short course certificate by Oxford Home Study Center",
    loading: "lazy"
  },
  {
    title: "Google Search Campaign",
    issuer: "Great Learning Academy",
    image: "assets/certification/Google search ads_page.jpg",
    alt: "Google Search Campaign certificate by Great Learning Academy",
    loading: "lazy"
  }
];

const certificatesCarousel = document.getElementById("certificatesCarousel");
const certPrev = document.getElementById("certPrev");
const certNext = document.getElementById("certNext");

function renderCertificates() {
  if (!certificatesCarousel) return;

  certificatesCarousel.innerHTML = "";

  certificates.forEach((cert) => {
    const item = document.createElement("div");
    item.className = "certificate-item";

    item.innerHTML = `
      <a href="${cert.image}"
         class="glightbox certificate-link"
         data-gallery="certificates"
         data-title="${cert.title} — ${cert.issuer}">
        <img src="${cert.image}" alt="${cert.alt}" loading="${cert.loading}" decoding="async">
      </a>
      <h4>${cert.title}</h4>
      <p>${cert.issuer}</p>
    `;

    certificatesCarousel.appendChild(item);
  });

  // Initialize / re-init lightbox after render
  GLightbox({
    selector: '.glightbox[data-gallery="certificates"]',
    touchNavigation: true,
    loop: true,
    zoomable: true,
    closeButton: true
  });
}

// Slider buttons (left/right move)
certPrev?.addEventListener("click", () => {
  certificatesCarousel.scrollBy({ left: -420, behavior: "smooth" });
});

certNext?.addEventListener("click", () => {
  certificatesCarousel.scrollBy({ left: 420, behavior: "smooth" });
});

// Call once on load
renderCertificates();
// ===========================
// Blog Posts Data
// ===========================
const blogPosts = [
    {
        id: 1,
        title: "10 SEO Trends That Will Dominate 2025",
        excerpt: "Stay ahead of the curve with these critical SEO trends that will shape search engine optimization in 2025.",
        category: "SEO",
        date: "March 15, 2025",
        readTime: "8 min read",
        icon: "🔍"
    },
    {
        id: 2,
        title: "How to Create High-Converting PPC Campaigns",
        excerpt: "Master the art of PPC advertising with proven strategies to maximize ROI and reduce wasted ad spend.",
        category: "PPC",
        date: "March 12, 2025",
        readTime: "10 min read",
        icon: "💰"
    },
    {
        id: 3,
        title: "Content Marketing Strategy for 2025",
        excerpt: "Build a content marketing strategy that drives engagement, builds authority, and generates qualified leads.",
        category: "Content",
        date: "March 10, 2025",
        readTime: "12 min read",
        icon: "📄"
    },
    {
        id: 4,
        title: "Website Speed Optimization Guide",
        excerpt: "Learn how to optimize your website for lightning-fast load times and better user experience.",
        category: "Web Dev",
        date: "March 8, 2025",
        readTime: "15 min read",
        icon: "⚡"
    },
    {
        id: 5,
        title: "Local SEO: Complete Guide for Small Businesses",
        excerpt: "Dominate local search results with this comprehensive guide to local SEO strategies and tactics.",
        category: "SEO",
        date: "March 5, 2025",
        readTime: "11 min read",
        icon: "📍"
    },
    {
        id: 6,
        title: "The Power of A/B Testing in Digital Marketing",
        excerpt: "Discover how A/B testing can dramatically improve your marketing performance and increase conversions.",
        category: "PPC",
        date: "March 3, 2025",
        readTime: "9 min read",
        icon: "🧪"
    }
];

// Render Blog Preview (Homepage)
const renderBlogPreview = () => {
    const grid = document.getElementById('blogPreviewGrid');
    if (!grid) return;
    
    // Show only first 3 posts on homepage
    blogPosts.slice(0, 3).forEach((post, index) => {
        const card = createBlogCard(post, index);
        grid.appendChild(card);
    });
    
    animateOnScroll();
};

// Create Blog Card Helper
const createBlogCard = (post, index) => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index % 3) * 100);
    
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

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    alert('Thank you for your message! I will get back to you within 24 hours.');
  });
}
// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Initialize Everything
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    renderCaseStudies();
    renderBlogPreview();
});