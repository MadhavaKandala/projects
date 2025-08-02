// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginBtn = document.getElementById('loginBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const passwordToggle = document.getElementById('passwordToggle');
const rememberMeCheckbox = document.getElementById('rememberMe');
const forgotPasswordBtn = document.getElementById('forgotPassword');
const roleTabs = document.querySelectorAll('.role-tab');
const roleSubtitle = document.getElementById('roleSubtitle');
const btnText = document.querySelector('.btn-text');

// State management
let selectedRole = 'admin';
let isLoading = false;
let errors = {};

// Role configurations
const roleConfig = {
  admin: {
    email: 'admin@taskcrown.com',
    subtitle: 'Manage your organization',
    demoEmail: 'admin@taskcrown.com',
    demoPassword: 'admin123'
  },
  employee: {
    email: 'employee@company.com',
    subtitle: 'Access your workspace',
    demoEmail: 'employee@taskcrown.com',
    demoPassword: 'employee123'
  },
  personal: {
    email: 'you@example.com',
    subtitle: 'Organize your personal tasks',
    demoEmail: 'personal@taskcrown.com',
    demoPassword: 'personal123'
  }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateRoleUI();
  animateBackgroundBeams();
  
  // Check if user is logged in
  if (localStorage.getItem('taskCrown_loggedIn')) {
    const savedRole = localStorage.getItem('taskCrown_role') || 'admin';
    setSelectedRole(savedRole);
  }
  
  // Focus on email input
  emailInput.focus();
});

// Setup event listeners
function setupEventListeners() {
  // Role tab switching
  roleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const role = tab.dataset.role;
      setSelectedRole(role);
    });
  });

  // Form submission
  loginForm.addEventListener('submit', handleFormSubmit);

  // Forgot password
  forgotPasswordBtn.addEventListener('click', handleForgotPassword);

  // Password toggle
  passwordToggle.addEventListener('click', togglePasswordVisibility);

  // Real-time validation
  emailInput.addEventListener('blur', () => validateEmail());
  passwordInput.addEventListener('blur', () => validatePassword());

  // Clear errors on input
  emailInput.addEventListener('input', () => clearError('email'));
  passwordInput.addEventListener('input', () => clearError('password'));

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Set selected role
function setSelectedRole(role) {
  selectedRole = role;
  
  // Update UI
  roleTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.role === role);
  });
  
  updateRoleUI();
  
  // Save role preference
  localStorage.setItem('taskCrown_role', role);
}

// Update role-specific UI
function updateRoleUI() {
  const config = roleConfig[selectedRole];
  
  // Update subtitle
  roleSubtitle.textContent = config.subtitle;
  
  // Update email placeholder to be more generic
  emailInput.placeholder = 'Enter your email';
  
  // Update button text to be generic
  btnText.textContent = 'Sign In';
  
  // Update form validation
  validateForm();
}

// Form validation
function validateEmail() {
  const email = emailInput.value.trim();
  
  if (!email) {
    setError('email', 'Email is required');
    return false;
  }
  
  if (!/\S+@\S+\.\S+/.test(email)) {
    setError('email', 'Invalid email address');
    return false;
  }
  
  clearError('email');
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  
  if (!password) {
    setError('password', 'Password is required');
    return false;
  }
  
  if (password.length < 6) {
    setError('password', 'Password must be at least 6 characters');
    return false;
  }
  
  clearError('password');
  return true;
}

function validateForm() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  return isEmailValid && isPasswordValid;
}

// Error handling
function setError(field, message) {
  errors[field] = message;
  const errorElement = document.getElementById(`${field}Error`);
  const inputElement = document.getElementById(field);
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  if (inputElement) {
    inputElement.classList.add('error');
  }
}

function clearError(field) {
  delete errors[field];
  const errorElement = document.getElementById(`${field}Error`);
  const inputElement = document.getElementById(field);
  
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  
  if (inputElement) {
    inputElement.classList.remove('error');
  }
}

// Form submission
async function handleFormSubmit(e) {
  e.preventDefault();
  
  if (!validateForm()) {
    shakeForm();
    return;
  }

  if (isLoading) return;

  setLoadingState(true);
  
  const formData = {
    role: selectedRole,
    email: emailInput.value.trim(),
    password: passwordInput.value,
    rememberMe: rememberMeCheckbox.checked
  };

  try {
    const result = await performLogin(formData);
    
    if (result.success) {
      // Show success animation
      document.querySelector('.login-card').classList.add('success');
      
      // Save user preferences
      if (formData.rememberMe) {
        localStorage.setItem('taskCrown_rememberMe', 'true');
        localStorage.setItem('taskCrown_email', formData.email);
      } else {
        localStorage.removeItem('taskCrown_rememberMe');
        localStorage.removeItem('taskCrown_email');
      }
      
      // Set login status
      localStorage.setItem('taskCrown_loggedIn', 'true');
      localStorage.setItem('taskCrown_role', selectedRole);
      
      // Show success message
      showNotification(`Login successful! Redirecting to ${selectedRole} dashboard...`, 'success');
      
      // Redirect based on role
      setTimeout(() => {
        const redirectUrl = getRedirectUrl(selectedRole);
        window.location.href = redirectUrl;
      }, 500);
      
    }
  } catch (error) {
    showNotification(error.message, 'error');
    setLoadingState(false);
  }
}

// Simulate login API call
async function performLogin(formData) {
  // Simulate API delay - reduced for faster demo experience
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Accept any dummy details for demo purposes
  if (formData.email && formData.password) {
    return { success: true, message: 'Login successful' };
  } else {
    throw new Error('Please enter both email and password');
  }
}

// Get redirect URL based on role
function getRedirectUrl(role) {
  if (role === 'personal') {
    return 'personal/personal.html';
  } else if (role === 'employee') {
    return 'employee/employee-dashboard.html';
  } else {
    // Admin role
    return 'admin/index.html';
  }
}



// Forgot password
function handleForgotPassword() {
  showNotification('Password reset functionality would be implemented here', 'info');
}

// Password toggle
function togglePasswordVisibility() {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  
  // Update eye icon
  const eyeIcon = passwordToggle.querySelector('svg');
  if (type === 'text') {
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    `;
  } else {
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  }
}

// Loading state management
function setLoadingState(loading) {
  isLoading = loading;
  
  if (loading) {
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
  } else {
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
    emailInput.disabled = false;
    passwordInput.disabled = false;
  }
}

// Form shake animation
function shakeForm() {
  loginForm.classList.add('shake');
  setTimeout(() => {
    loginForm.classList.remove('shake');
  }, 500);
}

// Background beams animation
function animateBackgroundBeams() {
  const gradients = document.querySelectorAll('linearGradient');
  
  gradients.forEach((gradient, index) => {
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 10;
    
    gradient.animate([
      { x1: "0%", x2: "0%", y1: "0%", y2: "0%" },
      { x1: "100%", x2: "95%", y1: "100%", y2: `${93 + Math.random() * 8}%` }
    ], {
      duration: duration * 1000,
      delay: delay * 1000,
      easing: 'ease-in-out',
      iterations: Infinity
    });
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#fbbf24',
    warning: '#f59e0b'
  };

  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${colors[type] || colors.info};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;

  notification.querySelector('.notification-content').style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  `;

  notification.querySelector('.notification-close').style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);

  // Close button functionality
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  });
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + Enter to submit
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    loginForm.dispatchEvent(new Event('submit'));
  }
  
  // Escape to clear form
  if (e.key === 'Escape') {
    loginForm.reset();
    Object.keys(errors).forEach(field => clearError(field));
  }
  
  // Tab to switch roles
  if (e.key === 'Tab' && e.shiftKey) {
    e.preventDefault();
    const currentIndex = Array.from(roleTabs).findIndex(tab => tab.classList.contains('active'));
    const nextIndex = (currentIndex - 1 + roleTabs.length) % roleTabs.length;
    roleTabs[nextIndex].click();
  }
}

// Auto-fill demo credentials
function autoFillDemoCredentials() {
  const config = roleConfig[selectedRole];
  emailInput.value = config.demoEmail;
  passwordInput.value = config.demoPassword;
  emailInput.focus();
}

// Console welcome message
console.log(`
👑 TaskCrown Advanced Login System
🎯 Role-based authentication with enhanced UI
🔐 Demo Credentials:
   Admin: admin@taskcrown.com / admin123
   Employee: employee@taskcrown.com / employee123
   Personal: personal@taskcrown.com / personal123
⌨️  Shortcuts: Ctrl+Enter (Submit), Escape (Clear), Shift+Tab (Switch Role)
✨ Features: Google Sign-in, Role Switching, Background Beams, Form Validation
`); 