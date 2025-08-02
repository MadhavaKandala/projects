// TaskCrown Admin Portal JavaScript

// Global state
let currentTheme = localStorage.getItem('theme') || 'light';
let sidebarOpen = false;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupTheme();
    setupSidebar();
    setupNotifications();
    setupModals();
    setupSearch();
    updateActiveNavigation();
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
        if (currentTheme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
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
    } else {
        sidebar.classList.remove('open');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarOpen = false;
    sidebar.classList.remove('open');
}

// Notifications Management
function setupNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });
        
        // Close notifications when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
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
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = '';
}

// Search Functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        if (query.length > 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    }, 300);
}

function showSearchSuggestions(query) {
    // Mock search suggestions
    const suggestions = [
        { type: 'employee', name: 'Sarah Johnson', subtitle: 'Marketing Manager' },
        { type: 'task', name: 'Q4 Campaign Review', subtitle: 'Due in 2 days' },
        { type: 'team', name: 'Development Team', subtitle: '8 members' }
    ].filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.subtitle.toLowerCase().includes(query)
    );
    
    // Create and show suggestions dropdown
    let dropdown = document.querySelector('.search-suggestions');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-suggestions';
        document.querySelector('.search-container').appendChild(dropdown);
    }
    
    dropdown.innerHTML = suggestions.map(item => `
        <div class="search-suggestion" onclick="selectSearchResult('${item.type}', '${item.name}')">
            <div class="suggestion-icon">
                <i class="fas fa-${getSearchIcon(item.type)}"></i>
            </div>
            <div class="suggestion-content">
                <div class="suggestion-name">${item.name}</div>
                <div class="suggestion-subtitle">${item.subtitle}</div>
            </div>
        </div>
    `).join('');
    
    dropdown.style.display = 'block';
}

function hideSearchSuggestions() {
    const dropdown = document.querySelector('.search-suggestions');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
}

function getSearchIcon(type) {
    const icons = {
        employee: 'user',
        task: 'tasks',
        team: 'users'
    };
    return icons[type] || 'search';
}

function selectSearchResult(type, name) {
    console.log('Selected:', type, name);
    hideSearchSuggestions();
    
    // Navigate to appropriate page
    switch(type) {
        case 'employee':
            window.location.href = 'employees.html';
            break;
        case 'task':
            window.location.href = 'tasks.html';
            break;
        case 'team':
            window.location.href = 'employees.html';
            break;
    }
}

function performSearch(query) {
    console.log('Performing search for:', query);
    hideSearchSuggestions();
    // Implement full search functionality
}

// Navigation Management
function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
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
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
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