// Dynamic Website Utilities - Real-time data and interactive features

class DynamicWebsite {
    constructor() {
        this.data = {
            user: null,
            tasks: [],
            team: [],
            notifications: [],
            analytics: {},
            settings: {}
        };
        this.websocket = null;
        this.updateInterval = null;
        this.eventListeners = new Map();
        this.init();
    }

    // Initialize dynamic features
    init() {
        this.loadUserData();
        this.setupRealTimeUpdates();
        this.setupEventListeners();
        this.initializeDynamicComponents();
        this.startAutoRefresh();
    }

    // Load user data from localStorage or API
    loadUserData() {
        const savedUser = localStorage.getItem('userData');
        if (savedUser) {
            this.data.user = JSON.parse(savedUser);
        } else {
            // Default user data
            this.data.user = {
                id: 1,
                name: 'Madhava Sharma',
                email: 'madhava.sharma@company.com',
                role: 'Senior Developer',
                avatar: '👨‍💻',
                crownCount: 247,
                level: 'Gold',
                department: 'Engineering',
                status: 'online',
                lastActive: new Date().toISOString()
            };
            this.saveUserData();
        }

        // Load other data
        this.loadTasks();
        this.loadTeamData();
        this.loadNotifications();
        this.loadAnalytics();
        this.loadSettings();
    }

    // Save user data to localStorage
    saveUserData() {
        localStorage.setItem('userData', JSON.stringify(this.data.user));
    }

    // Load tasks data
    loadTasks() {
        const savedTasks = localStorage.getItem('tasksData');
        if (savedTasks) {
            this.data.tasks = JSON.parse(savedTasks);
        } else {
            // Default tasks data
            this.data.tasks = [
                {
                    id: 'TC-101',
                    title: 'Implement User Authentication',
                    description: 'Create secure login system with JWT tokens',
                    status: 'in-progress',
                    priority: 'high',
                    assignee: 'Madhava Sharma',
                    dueDate: '2024-02-15',
                    loggedTime: 8,
                    subtasks: [
                        { id: 1, title: 'Design login UI', completed: true },
                        { id: 2, title: 'Implement JWT logic', completed: true },
                        { id: 3, title: 'Add password reset', completed: false }
                    ]
                },
                {
                    id: 'TC-102',
                    title: 'Database Optimization',
                    description: 'Optimize database queries for better performance',
                    status: 'todo',
                    priority: 'medium',
                    assignee: 'Sarah Johnson',
                    dueDate: '2024-02-20',
                    loggedTime: 0,
                    subtasks: [
                        { id: 1, title: 'Analyze slow queries', completed: false },
                        { id: 2, title: 'Add indexes', completed: false },
                        { id: 3, title: 'Test performance', completed: false }
                    ]
                },
                {
                    id: 'TC-103',
                    title: 'API Documentation',
                    description: 'Create comprehensive API documentation',
                    status: 'done',
                    priority: 'low',
                    assignee: 'Mike Chen',
                    dueDate: '2024-02-10',
                    loggedTime: 12,
                    subtasks: [
                        { id: 1, title: 'Write endpoint docs', completed: true },
                        { id: 2, title: 'Add examples', completed: true },
                        { id: 3, title: 'Review and publish', completed: true }
                    ]
                },
                {
                    id: 'TC-104',
                    title: 'Mobile App Testing',
                    description: 'Comprehensive testing of mobile application',
                    status: 'todo',
                    priority: 'high',
                    assignee: 'Madhava Sharma',
                    dueDate: '2024-02-25',
                    loggedTime: 0,
                    subtasks: [
                        { id: 1, title: 'Unit tests', completed: false },
                        { id: 2, title: 'Integration tests', completed: false },
                        { id: 3, title: 'UI/UX testing', completed: false }
                    ]
                }
            ];
            this.saveTasks();
        }
    }

    // Save tasks data
    saveTasks() {
        localStorage.setItem('tasksData', JSON.stringify(this.data.tasks));
    }

    // Load team data
    loadTeamData() {
        const savedTeam = localStorage.getItem('teamData');
        if (savedTeam) {
            this.data.team = JSON.parse(savedTeam);
        } else {
            // Default team data
            this.data.team = [
                {
                    id: 1,
                    name: 'Madhava Sharma',
                    role: 'Senior Developer',
                    avatar: '👨‍💻',
                    department: 'Engineering',
                    status: 'online',
                    crownCount: 247,
                    level: 'Gold',
                    currentProject: 'TaskCrown Platform',
                    lastActive: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Sarah Johnson',
                    role: 'Frontend Developer',
                    avatar: '👩‍💻',
                    department: 'Engineering',
                    status: 'online',
                    crownCount: 189,
                    level: 'Silver',
                    currentProject: 'UI Components',
                    lastActive: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'Mike Chen',
                    role: 'Backend Developer',
                    avatar: '👨‍💻',
                    department: 'Engineering',
                    status: 'offline',
                    crownCount: 156,
                    level: 'Silver',
                    currentProject: 'API Development',
                    lastActive: new Date(Date.now() - 3600000).toISOString()
                },
                {
                    id: 4,
                    name: 'Emily Davis',
                    role: 'UI/UX Designer',
                    avatar: '👩‍🎨',
                    department: 'Design',
                    status: 'leave',
                    crownCount: 98,
                    level: 'Bronze',
                    currentProject: 'Design System',
                    lastActive: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 5,
                    name: 'Alex Rodriguez',
                    role: 'Product Manager',
                    avatar: '👨‍💼',
                    department: 'Product',
                    status: 'online',
                    crownCount: 312,
                    level: 'Gold',
                    currentProject: 'Feature Planning',
                    lastActive: new Date().toISOString()
                }
            ];
            this.saveTeamData();
        }
    }

    // Save team data
    saveTeamData() {
        localStorage.setItem('teamData', JSON.stringify(this.data.team));
    }

    // Load notifications
    loadNotifications() {
        const savedNotifications = localStorage.getItem('notificationsData');
        if (savedNotifications) {
            this.data.notifications = JSON.parse(savedNotifications);
        } else {
            // Default notifications
            this.data.notifications = [
                {
                    id: 1,
                    type: 'task',
                    title: 'New Task Assigned',
                    message: 'You have been assigned to "Mobile App Testing"',
                    timestamp: new Date().toISOString(),
                    read: false,
                    priority: 'high'
                },
                {
                    id: 2,
                    type: 'team',
                    title: 'Team Update',
                    message: 'Sarah Johnson joined the project',
                    timestamp: new Date(Date.now() - 1800000).toISOString(),
                    read: false,
                    priority: 'medium'
                },
                {
                    id: 3,
                    type: 'achievement',
                    title: 'Crown Earned!',
                    message: 'You earned 5 crowns for completing "API Documentation"',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    read: true,
                    priority: 'low'
                }
            ];
            this.saveNotifications();
        }
    }

    // Save notifications
    saveNotifications() {
        localStorage.setItem('notificationsData', JSON.stringify(this.data.notifications));
    }

    // Load analytics data
    loadAnalytics() {
        const savedAnalytics = localStorage.getItem('analyticsData');
        if (savedAnalytics) {
            this.data.analytics = JSON.parse(savedAnalytics);
        } else {
            // Default analytics data
            this.data.analytics = {
                productivity: {
                    daily: [85, 92, 78, 95, 88, 91, 87],
                    weekly: [89, 92, 85, 88, 91, 87, 90],
                    monthly: [87, 89, 91, 88, 92, 85, 90, 87, 89, 91, 88, 92]
                },
                tasks: {
                    completed: 45,
                    inProgress: 12,
                    pending: 8,
                    total: 65
                },
                crowns: {
                    earned: 247,
                    thisWeek: 15,
                    thisMonth: 52,
                    rank: 2
                },
                timeTracking: {
                    totalHours: 168,
                    thisWeek: 42,
                    averagePerDay: 8.4
                }
            };
            this.saveAnalytics();
        }
    }

    // Save analytics data
    saveAnalytics() {
        localStorage.setItem('analyticsData', JSON.stringify(this.data.analytics));
    }

    // Load settings
    loadSettings() {
        const savedSettings = localStorage.getItem('settingsData');
        if (savedSettings) {
            this.data.settings = JSON.parse(savedSettings);
        } else {
            // Default settings
            this.data.settings = {
                theme: 'light',
                notifications: {
                    email: true,
                    push: true,
                    taskReminders: true
                },
                privacy: {
                    profileVisibility: true,
                    activityStatus: true,
                    twoFactor: false
                },
                display: {
                    compactMode: false,
                    showAvatars: true,
                    autoRefresh: true
                }
            };
            this.saveSettings();
        }
    }

    // Save settings
    saveSettings() {
        localStorage.setItem('settingsData', JSON.stringify(this.data.settings));
    }

    // Setup real-time updates
    setupRealTimeUpdates() {
        // Simulate WebSocket connection
        this.websocket = {
            send: (data) => {
                console.log('WebSocket message sent:', data);
                // Simulate server response
                setTimeout(() => {
                    this.handleServerMessage(data);
                }, 100);
            }
        };

        // Update user status periodically
        setInterval(() => {
            this.updateUserStatus();
        }, 30000); // Every 30 seconds
    }

    // Handle server messages
    handleServerMessage(message) {
        try {
            const data = typeof message === 'string' ? JSON.parse(message) : message;
            
            switch (data.type) {
                case 'task_update':
                    this.updateTask(data.task);
                    break;
                case 'notification':
                    this.addNotification(data.notification);
                    break;
                case 'team_status':
                    this.updateTeamMemberStatus(data.memberId, data.status);
                    break;
                case 'analytics_update':
                    this.updateAnalytics(data.analytics);
                    break;
            }
        } catch (error) {
            console.error('Error handling server message:', error);
        }
    }

    // Update task
    updateTask(taskData) {
        const taskIndex = this.data.tasks.findIndex(task => task.id === taskData.id);
        if (taskIndex !== -1) {
            this.data.tasks[taskIndex] = { ...this.data.tasks[taskIndex], ...taskData };
            this.saveTasks();
            this.triggerEvent('taskUpdated', taskData);
        }
    }

    // Add notification
    addNotification(notification) {
        notification.id = Date.now();
        notification.timestamp = new Date().toISOString();
        notification.read = false;
        
        this.data.notifications.unshift(notification);
        this.saveNotifications();
        this.triggerEvent('notificationAdded', notification);
        
        // Show toast notification
        this.showToast(notification.title, notification.message, notification.type);
    }

    // Update team member status
    updateTeamMemberStatus(memberId, status) {
        const member = this.data.team.find(m => m.id === memberId);
        if (member) {
            member.status = status;
            member.lastActive = new Date().toISOString();
            this.saveTeamData();
            this.triggerEvent('teamStatusUpdated', { memberId, status });
        }
    }

    // Update analytics
    updateAnalytics(analyticsData) {
        this.data.analytics = { ...this.data.analytics, ...analyticsData };
        this.saveAnalytics();
        this.triggerEvent('analyticsUpdated', analyticsData);
    }

    // Update user status
    updateUserStatus() {
        if (this.data.user) {
            this.data.user.lastActive = new Date().toISOString();
            this.saveUserData();
            
            // Send status update to server
            this.websocket.send({
                type: 'status_update',
                userId: this.data.user.id,
                status: this.data.user.status,
                timestamp: this.data.user.lastActive
            });
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Listen for page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.data.user.status = 'away';
            } else {
                this.data.user.status = 'online';
            }
            this.updateUserStatus();
        });

        // Listen for window focus/blur
        window.addEventListener('focus', () => {
            this.data.user.status = 'online';
            this.updateUserStatus();
        });

        window.addEventListener('blur', () => {
            this.data.user.status = 'away';
            this.updateUserStatus();
        });

        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.showToast('Connection Restored', 'You are back online', 'success');
            this.reconnectWebSocket();
        });

        window.addEventListener('offline', () => {
            this.showToast('Connection Lost', 'You are offline', 'warning');
        });
    }

    // Initialize dynamic components
    initializeDynamicComponents() {
        // Initialize dynamic navigation
        this.initializeDynamicNavigation();
        
        // Initialize real-time counters
        this.initializeCounters();
        
        // Initialize auto-refresh components
        this.initializeAutoRefresh();
        
        // Initialize interactive elements
        this.initializeInteractiveElements();
    }

    // Initialize dynamic navigation
    initializeDynamicNavigation() {
        // Update active navigation item
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.getAttribute('href') === currentPath || 
                (currentPath === '/' && item.getAttribute('href') === '#')) {
                item.classList.add('active');
            }
        });

        // Add navigation click handlers
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Remove active class from all items
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Track navigation
                this.trackEvent('navigation', {
                    from: window.location.pathname,
                    to: item.getAttribute('href')
                });
            });
        });
    }

    // Initialize counters
    initializeCounters() {
        // Animate counters on page load
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    // Initialize auto-refresh
    initializeAutoRefresh() {
        if (this.data.settings.display.autoRefresh) {
            this.updateInterval = setInterval(() => {
                this.refreshPageData();
            }, 30000); // Refresh every 30 seconds
        }
    }

    // Initialize interactive elements
    initializeInteractiveElements() {
        // Add hover effects to cards
        document.querySelectorAll('.card, .dashboard-card, .stat-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = 'var(--shadow-medium)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--shadow-soft)';
            });
        });

        // Add click effects to buttons
        document.querySelectorAll('.btn, .button').forEach(button => {
            button.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Refresh page data
    refreshPageData() {
        // Update task counts
        this.updateTaskCounts();
        
        // Update team status
        this.updateTeamStatus();
        
        // Update notifications
        this.updateNotifications();
        
        // Update analytics
        this.updateAnalyticsDisplay();
    }

    // Update task counts
    updateTaskCounts() {
        const todoCount = this.data.tasks.filter(task => task.status === 'todo').length;
        const inProgressCount = this.data.tasks.filter(task => task.status === 'in-progress').length;
        const doneCount = this.data.tasks.filter(task => task.status === 'done').length;
        
        // Update counters if they exist
        const todoCounter = document.querySelector('[data-counter="todo"]');
        const inProgressCounter = document.querySelector('[data-counter="in-progress"]');
        const doneCounter = document.querySelector('[data-counter="done"]');
        
        if (todoCounter) todoCounter.textContent = todoCount;
        if (inProgressCounter) inProgressCounter.textContent = inProgressCount;
        if (doneCounter) doneCounter.textContent = doneCount;
    }

    // Update team status
    updateTeamStatus() {
        this.data.team.forEach(member => {
            // Simulate status changes
            if (Math.random() < 0.1) { // 10% chance of status change
                const statuses = ['online', 'offline', 'away'];
                member.status = statuses[Math.floor(Math.random() * statuses.length)];
                member.lastActive = new Date().toISOString();
            }
        });
        this.saveTeamData();
    }

    // Update notifications
    updateNotifications() {
        // Add random notifications occasionally
        if (Math.random() < 0.05) { // 5% chance
            const notifications = [
                {
                    type: 'task',
                    title: 'Task Deadline Approaching',
                    message: 'You have tasks due soon',
                    priority: 'medium'
                },
                {
                    type: 'team',
                    title: 'Team Activity',
                    message: 'New team member joined',
                    priority: 'low'
                }
            ];
            
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            this.addNotification(randomNotification);
        }
    }

    // Update analytics display
    updateAnalyticsDisplay() {
        // Update productivity charts
        this.updateProductivityChart();
        
        // Update crown count
        this.updateCrownCount();
    }

    // Update productivity chart
    updateProductivityChart() {
        const chartElement = document.querySelector('.productivity-chart');
        if (chartElement) {
            // Simulate new productivity data
            const newValue = Math.floor(Math.random() * 20) + 80; // 80-100
            this.data.analytics.productivity.daily.push(newValue);
            this.data.analytics.productivity.daily.shift();
            this.saveAnalytics();
            
            // Trigger chart update event
            this.triggerEvent('chartUpdated', this.data.analytics.productivity);
        }
    }

    // Update crown count
    updateCrownCount() {
        if (this.data.user) {
            // Simulate crown earning
            if (Math.random() < 0.1) { // 10% chance
                this.data.user.crownCount += Math.floor(Math.random() * 5) + 1;
                this.saveUserData();
                
                // Update crown display
                const crownDisplay = document.querySelector('.crown-count');
                if (crownDisplay) {
                    crownDisplay.textContent = this.data.user.crownCount;
                }
            }
        }
    }

    // Start auto refresh
    startAutoRefresh() {
        if (this.data.settings.display.autoRefresh) {
            setInterval(() => {
                this.refreshPageData();
            }, 30000);
        }
    }

    // Show toast notification
    showToast(title, message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-header">
                <strong>${title}</strong>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="toast-body">${message}</div>
        `;
        
        // Add toast styles if not already present
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: hsl(var(--card));
                    border: 1px solid hsl(var(--border));
                    border-radius: var(--radius);
                    padding: 1rem;
                    box-shadow: var(--shadow-medium);
                    z-index: 10000;
                    max-width: 300px;
                    animation: slideInRight 0.3s ease-out;
                }
                
                .toast-success {
                    border-left: 4px solid hsl(var(--success));
                }
                
                .toast-warning {
                    border-left: 4px solid hsl(var(--warning));
                }
                
                .toast-error {
                    border-left: 4px solid hsl(var(--danger));
                }
                
                .toast-info {
                    border-left: 4px solid hsl(var(--primary));
                }
                
                .toast-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                
                .toast-close {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: hsl(var(--muted-foreground));
                }
                
                .toast-body {
                    font-size: 0.875rem;
                    color: hsl(var(--muted-foreground));
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }

    // Track events
    trackEvent(eventName, data) {
        const eventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            user: this.data.user?.id,
            data: data
        };
        
        // Save to localStorage for analytics
        const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
        events.push(eventData);
        localStorage.setItem('analytics_events', JSON.stringify(events));
        
        // Send to server (simulated)
        this.websocket.send({
            type: 'analytics_event',
            data: eventData
        });
    }

    // Trigger custom events
    triggerEvent(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }

    // Reconnect WebSocket
    reconnectWebSocket() {
        if (this.websocket) {
            this.websocket.send({
                type: 'reconnect',
                userId: this.data.user?.id
            });
        }
    }

    // Get user data
    getUser() {
        return this.data.user;
    }

    // Get tasks
    getTasks() {
        return this.data.tasks;
    }

    // Get team
    getTeam() {
        return this.data.team;
    }

    // Get notifications
    getNotifications() {
        return this.data.notifications;
    }

    // Get analytics
    getAnalytics() {
        return this.data.analytics;
    }

    // Get settings
    getSettings() {
        return this.data.settings;
    }

    // Update setting
    updateSetting(category, key, value) {
        if (!this.data.settings[category]) {
            this.data.settings[category] = {};
        }
        this.data.settings[category][key] = value;
        this.saveSettings();
        this.triggerEvent('settingUpdated', { category, key, value });
    }

    // Add task
    addTask(task) {
        task.id = 'TC-' + (this.data.tasks.length + 101);
        task.timestamp = new Date().toISOString();
        this.data.tasks.push(task);
        this.saveTasks();
        this.triggerEvent('taskAdded', task);
        return task;
    }

    // Update task status
    updateTaskStatus(taskId, status) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
            task.lastUpdated = new Date().toISOString();
            this.saveTasks();
            this.triggerEvent('taskStatusUpdated', { taskId, status });
            
            // Add notification
            this.addNotification({
                type: 'task',
                title: 'Task Status Updated',
                message: `Task "${task.title}" moved to ${status}`,
                priority: 'medium'
            });
        }
    }

    // Mark notification as read
    markNotificationAsRead(notificationId) {
        const notification = this.data.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.triggerEvent('notificationRead', notificationId);
        }
    }

    // Clear all notifications
    clearAllNotifications() {
        this.data.notifications = [];
        this.saveNotifications();
        this.triggerEvent('notificationsCleared');
    }
}

// Initialize dynamic website
window.dynamicWebsite = new DynamicWebsite();

// Export for use in other files
window.DynamicWebsite = DynamicWebsite; 