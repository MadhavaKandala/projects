// TaskCrown Admin Portal JavaScript

// Global state
let currentTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
let sidebarOpen = false;
let modalTrigger;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    const workspaceName = localStorage.getItem('taskCrownAdminName');
    if (workspaceName) document.querySelector('.logo small').textContent = workspaceName;
    setupTheme();
    setupSidebar();
    setupNotifications();
    setupModals();
    updateActiveNavigation();
    const modalId = { '#add-employee': 'addEmployeeModal', '#new-task': 'createTaskModal' }[window.location.hash];
    if (modalId) openModal(modalId);
}

// Theme Management
function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Apply current theme
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    // Theme toggle handler
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
    document.querySelectorAll('[data-theme-option]').forEach(button => {
        button.setAttribute('aria-pressed', button.dataset.themeOption === currentTheme);
    });
}

// Sidebar Management
function setupSidebar() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    // Mobile menu button
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleSidebar);
    }
    
    // Sidebar close button
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && sidebarOpen) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeSidebar();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.add('open');
        document.getElementById('mobileMenuBtn').setAttribute('aria-expanded', 'true');
        document.getElementById('sidebarToggle').focus();
    } else {
        closeSidebar();
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = false;
    sidebar.classList.remove('open');
    const button = document.getElementById('mobileMenuBtn');
    button.setAttribute('aria-expanded', 'false');
    if (sidebar.contains(document.activeElement) && button.getClientRects().length) button.focus();
}

// Notifications Management
function setupNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationBtn.setAttribute('aria-expanded', notificationDropdown.classList.toggle('show'));
        });
        
        // Close notifications when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
                notificationBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Modal Management
function setupModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
            if (sidebarOpen) closeSidebar();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modalTrigger = document.activeElement;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', modal.querySelector('.modal-header h3').textContent);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.querySelector('.admin-container').inert = true;
        (modal.querySelector('input:not([type="hidden"]), select') || modal.querySelector('button')).focus();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal?.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.querySelector('.admin-container').inert = false;
        modalTrigger?.focus();
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal.show').forEach(modal => closeModal(modal.id));
}

// Navigation Management
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const active = item.getAttribute('href') === currentPage;
        item.classList.toggle('active', active);
        if (active) item.setAttribute('aria-current', 'page');
        else item.removeAttribute('aria-current');
    });
}

// Form Handling
function handleFormSubmit(formId, callback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            callback(data);
        });
    }
}

// Utility Functions
function showToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span></span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    toast.setAttribute('role', 'status');
    toast.querySelector('.toast-content span').textContent = message;
    
    // Add to page
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function escapeHtml(value) {
    const span = document.createElement('span');
    span.textContent = value ?? '';
    return span.innerHTML.replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function avatarInitials(name) {
    return escapeHtml(name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase());
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateTime(date) {
    return `${formatDate(date)} at ${formatTime(date)}`;
}

// Data Management (Mock data for demo)
const mockData = {
    employees: [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            position: 'Marketing Manager',
            department: 'Marketing',
            performance: 92,
            crowns: 3,
            status: 'active',
            avatar: 'assets/imgs/user1.jpg'
        },
        {
            id: 2,
            name: 'Michael Chen',
            email: 'michael.chen@company.com',
            position: 'Senior Developer',
            department: 'Engineering',
            performance: 88,
            crowns: 5,
            status: 'active',
            avatar: 'assets/imgs/user2.jpg'
        },
        {
            id: 3,
            name: 'Emily Davis',
            email: 'emily.davis@company.com',
            position: 'UX Designer',
            department: 'Design',
            performance: 85,
            crowns: 2,
            status: 'active',
            avatar: 'assets/imgs/user3.jpg'
        }
    ],
    
    tasks: [
        {
            id: 1,
            title: 'Q4 Marketing Campaign',
            description: 'Plan and execute the Q4 marketing campaign',
            priority: 'high',
            status: 'in-progress',
            assignee: 'Sarah Johnson',
            dueDate: '2025-01-15',
            progress: 65
        },
        {
            id: 2,
            title: 'Website Redesign',
            description: 'Redesign the company website',
            priority: 'medium',
            status: 'todo',
            assignee: 'Emily Davis',
            dueDate: '2025-02-01',
            progress: 20
        },
        {
            id: 3,
            title: 'API Integration',
            description: 'Integrate third-party APIs',
            priority: 'high',
            status: 'completed',
            assignee: 'Michael Chen',
            dueDate: '2025-01-05',
            progress: 100
        }
    ],
    
    teams: [
        {
            id: 1,
            name: 'Marketing Team',
            members: 6,
            activeTasks: 8,
            completedTasks: 24,
            performance: 89
        },
        {
            id: 2,
            name: 'Development Team',
            members: 8,
            activeTasks: 12,
            completedTasks: 31,
            performance: 92
        },
        {
            id: 3,
            name: 'Design Team',
            members: 4,
            activeTasks: 5,
            completedTasks: 18,
            performance: 87
        }
    ]
};

// Export functions for use in other pages
window.TaskCrown = {
    openModal,
    closeModal,
    showToast,
    mockData,
    formatDate,
    formatTime,
    formatDateTime
};
