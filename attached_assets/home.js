// Utility function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
});

// Pricing Toggle Functionality
let isMonthly = true;
const pricingToggle = document.getElementById('pricingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const yearlyLabel = document.getElementById('yearlyLabel');

const prices = {
  starter: { monthly: 0, yearly: 0 },
  team: { monthly: 25, yearly: 20 },
  enterprise: { monthly: 'Custom', yearly: 'Custom' }
};

function updatePricing() {
  const starterPrice = document.getElementById('starterPrice');
  const teamPrice = document.getElementById('proPrice'); // Still using proPrice ID for Team plan
  const enterprisePrice = document.getElementById('teamPrice'); // Still using teamPrice ID for Enterprise plan

  if (isMonthly) {
    starterPrice.textContent = `$${prices.starter.monthly}`;
    teamPrice.textContent = `$${prices.team.monthly}`;
    enterprisePrice.textContent = prices.enterprise.monthly;
    
    monthlyLabel.classList.add('active');
    yearlyLabel.classList.remove('active');
  } else {
    starterPrice.textContent = `$${prices.starter.yearly}`;
    teamPrice.textContent = `$${prices.team.yearly}`;
    enterprisePrice.textContent = prices.enterprise.yearly;
    
    monthlyLabel.classList.remove('active');
    yearlyLabel.classList.add('active');
  }
}

if (pricingToggle) {
  pricingToggle.addEventListener('change', (e) => {
    isMonthly = !e.target.checked;
    updatePricing();
    
    // Add confetti effect when switching to yearly
    if (!isMonthly) {
      createConfetti();
    }
  });
}

// Confetti effect
function createConfetti() {
  const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
      { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: 3000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => {
      document.body.removeChild(confetti);
    };
  }
}

// Modal Functionality
const demoBtn = document.getElementById('demoBtn');
const demoModal = document.getElementById('demoModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const demoVideo = document.getElementById('demoVideo');

function openModal() {
  demoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  demoModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (demoBtn) {
  demoBtn.addEventListener('click', openModal);
}

if (demoVideo) {
  demoVideo.addEventListener('click', openModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && demoModal.classList.contains('active')) {
    closeModal();
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Number animation for pricing
function animateNumber(element, start, end, duration = 1000) {
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = `$${current}`;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

// Enhanced hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Enhanced hover effects for testimonial cards
document.querySelectorAll('.testimonial-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px) scale(1.01)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Enhanced hover effects for pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (!card.classList.contains('popular')) {
      card.style.transform = 'translateY(-4px) scale(1.02)';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('popular')) {
      card.style.transform = 'translateY(0) scale(1)';
    }
  });
});

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Scroll-based animations and effects
}, 16)); // ~60fps

// Initialize tooltips for interactive elements
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = element.dataset.tooltip;
      tooltip.style.position = 'absolute';
      tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '0.5rem 0.75rem';
      tooltip.style.borderRadius = '0.375rem';
      tooltip.style.fontSize = '0.875rem';
      tooltip.style.zIndex = '1000';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.whiteSpace = 'nowrap';
      
      document.body.appendChild(tooltip);
      
      const rect = element.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
      
      element.tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', () => {
      if (element.tooltip) {
        element.tooltip.remove();
        element.tooltip = null;
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updatePricing();
  initTooltips();
  
  // Add loading animation
  document.body.classList.add('loaded');
});

// Add loading animation styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
`;
document.head.appendChild(loadingStyle);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
  // Handle keyboard navigation for interactive elements
  if (e.key === 'Enter' || e.key === ' ') {
    const target = e.target;
    if (target.classList.contains('btn') || target.classList.contains('pricing-card')) {
      e.preventDefault();
      target.click();
    }
  }
});

// Focus management for modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

// Apply focus trap to modal
if (demoModal) {
  trapFocus(demoModal);
}

// Error handling for failed image loads
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    e.target.style.display = 'none';
    console.warn('Failed to load image:', e.target.src);
  }
}, true);

// Console welcome message
console.log(`
🎉 Welcome to Task Crown!
🚀 Built with modern web technologies
💡 Check out our features and start your productivity journey!
`); 