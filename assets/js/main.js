/**
* Template Name: DevFolio
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
      
      // Store isotope instance globally for pagination
      window.initIsotope = initIsotope;
      
      // Initialize pagination after isotope is ready
      setTimeout(() => {
        initPortfolioPagination();
      }, 100);
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        // Don't arrange isotope here, let pagination handle it
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Portfolio Pagination
   */
  function initPortfolioPagination() {
    const itemsPerPage = 6;
    let currentPage = 1;
    let currentFilter = '*';
    let portfolioItems = [];
    let filteredItems = [];

    const portfolioContainer = document.querySelector('.isotope-container');
    const paginationContainer = document.querySelector('#pagination');
    
    if (!portfolioContainer || !paginationContainer) return;

    function updatePortfolioItems() {
      portfolioItems = Array.from(portfolioContainer.querySelectorAll('.portfolio-item'));
    }

    function filterItems(filter) {
      currentFilter = filter;
      currentPage = 1;
      
      if (filter === '*') {
        filteredItems = portfolioItems;
      } else {
        filteredItems = portfolioItems.filter(item => item.classList.contains(filter.replace('.', '')));
      }
      
      updatePagination();
      showCurrentPage();
    }

    function showCurrentPage() {
      // Hide all items first
      portfolioItems.forEach(item => {
        item.style.display = 'none';
        item.classList.add('hidden-by-pagination');
      });

      // Calculate start and end indices
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      // Show items for current page
      const itemsToShow = filteredItems.slice(startIndex, endIndex);
      itemsToShow.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('hidden-by-pagination');
      });

      // Force isotope to recalculate layout
      if (window.initIsotope) {
        // First destroy and recreate isotope
        window.initIsotope.destroy();
        
        setTimeout(() => {
          // Reinitialize isotope with only visible items
          window.initIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item:not(.hidden-by-pagination)',
            layoutMode: 'masonry',
            filter: '*',
            sortBy: 'original-order'
          });
          
          // Trigger AOS animation refresh
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }, 50);
      }
    }

    function updatePagination() {
      const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
      
      if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
      }
      
      paginationContainer.style.display = 'flex';
      
      // Clear existing pagination
      paginationContainer.innerHTML = '';
      
      // Previous button
      const prevBtn = document.createElement('a');
      prevBtn.textContent = 'Previous';
      prevBtn.id = 'prev';
      prevBtn.style.display = currentPage === 1 ? 'none' : 'inline-block';
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          showCurrentPage();
          updatePagination();
        }
      });
      paginationContainer.appendChild(prevBtn);

      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.classList.add('page-link');
        pageLink.dataset.page = i;
        
        if (i === currentPage) {
          pageLink.classList.add('active');
        }
        
        pageLink.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage = i;
          showCurrentPage();
          updatePagination();
        });
        
        paginationContainer.appendChild(pageLink);
      }

      // Next button
      const nextBtn = document.createElement('a');
      nextBtn.textContent = 'Next';
      nextBtn.id = 'next';
      nextBtn.style.display = currentPage === totalPages ? 'none' : 'inline-block';
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          showCurrentPage();
          updatePagination();
        }
      });
      paginationContainer.appendChild(nextBtn);
    }

    // Initialize
    updatePortfolioItems();
    filterItems('*');

    // Listen for filter changes
    document.querySelectorAll('.portfolio-filters li').forEach(filterBtn => {
      filterBtn.addEventListener('click', () => {
        const filter = filterBtn.getAttribute('data-filter');
        filterItems(filter);
      });
    });
  }

  /**
   * Certificates Carousel
   */
  function initCertificatesCarousel() {
    const carousel = document.getElementById('certificatesCarousel');
    const prevBtn = document.getElementById('certPrev');
    const nextBtn = document.getElementById('certNext');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 310; // Certificate item width + gap
    
    // Next button functionality
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });
    
    // Auto-hide/show navigation buttons based on scroll position
    function updateNavButtons() {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      
      prevBtn.style.opacity = carousel.scrollLeft <= 0 ? '0.5' : '1';
      nextBtn.style.opacity = carousel.scrollLeft >= maxScroll ? '0.5' : '1';
      
      prevBtn.disabled = carousel.scrollLeft <= 0;
      nextBtn.disabled = carousel.scrollLeft >= maxScroll;
    }
    
    // Update button states on scroll
    carousel.addEventListener('scroll', updateNavButtons);
    window.addEventListener('resize', updateNavButtons);
    
    // Initial button state
    updateNavButtons();
    
    // Touch/swipe support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
    });
    
    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
    
    // Initialize certificates carousel
    initCertificatesCarousel();
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();