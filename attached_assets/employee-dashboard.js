// Mock Data
const mockTasks = [
  {
    id: "1",
    name: "Complete Q4 Report",
    assignedBy: "Sarah Johnson",
    deadline: "2024-01-15",
    status: "In Progress",
    priority: "High",
    progress: 75,
  },
  {
    id: "2",
    name: "Review Marketing Campaign",
    assignedBy: "Mike Chen",
    deadline: "2024-01-20",
    status: "Pending",
    priority: "Medium",
    progress: 0,
  },
  {
    id: "3",
    name: "Update Documentation",
    assignedBy: "Lisa Wang",
    deadline: "2024-01-18",
    status: "Completed",
    priority: "Low",
    progress: 100,
  },
];

const mockEmployees = [
  { id: "1", name: "Alex Thompson", department: "Engineering", crowns: 45, completedTasks: 28, rank: 1 },
  { id: "2", name: "Sarah Johnson", department: "Marketing", crowns: 42, completedTasks: 25, rank: 2 },
  { id: "3", name: "Mike Chen", department: "Sales", crowns: 38, completedTasks: 22, rank: 3 },
  { id: "4", name: "Lisa Wang", department: "Design", crowns: 35, completedTasks: 20, rank: 4 },
  { id: "5", name: "John Doe", department: "HR", crowns: 32, completedTasks: 18, rank: 5 },
];

const mockNotifications = [
  {
    id: "1",
    type: "task",
    message: "New task assigned: Complete Q4 Report",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "crown",
    message: "You earned a crown for completing tasks on time!",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "help",
    message: "Sarah Johnson requested help on Marketing Campaign",
    time: "3 days ago",
    read: true,
  },
];

const crownHistory = [
  { week: "Week 1", crowns: 8, reason: "Completed all tasks on time" },
  { week: "Week 2", crowns: 12, reason: "Helped 3 colleagues" },
  { week: "Week 3", crowns: 10, reason: "Maintained 7-day streak" },
  { week: "Week 4", crowns: 15, reason: "Exceeded performance targets" },
];

const badges = [
  { name: "Speed Demon", description: "Complete 10 tasks in one day", unlocked: true },
  { name: "Team Player", description: "Help 5 colleagues in a week", unlocked: true },
  { name: "Streak Master", description: "Maintain 30-day streak", unlocked: false },
  { name: "Crown Collector", description: "Earn 100 crowns", unlocked: false },
];

const suggestedTeammates = [
  { name: "Sarah Johnson", department: "Marketing", available: true },
  { name: "Mike Chen", department: "Sales", available: true },
  { name: "Lisa Wang", department: "Design", available: false },
];

// State Management
let currentPage = 'home';
let currentFilter = 'All';
let notifications = [...mockNotifications];
let tasks = [...mockTasks];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const logoutBtn = document.getElementById('logoutBtn');
const filterBtn = document.getElementById('filterBtn');
const filterMenu = document.getElementById('filterMenu');
const markAllReadBtn = document.getElementById('markAllReadBtn');
const helpForm = document.getElementById('helpForm');
const themeSelect = document.getElementById('themeSelect');

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
  // Check authentication
  if (!localStorage.getItem('taskCrown_loggedIn')) {
    window.location.href = 'login.html';
    return;
  }

  setupEventListeners();
  updateGreeting();
  renderTasks();
  renderLeaderboard();
  renderCrownStats();
  renderNotifications();
  renderTeammates();
  renderNotificationPreferences();
  setupClock();
  
  // Set initial page
  showPage('home');
});

// Setup event listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const page = e.currentTarget.dataset.page;
      showPage(page);
    });
  });

  // Mobile menu
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  // Logout
  logoutBtn.addEventListener('click', handleLogout);

  // Filter dropdown
  filterBtn.addEventListener('click', toggleFilterMenu);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown')) {
      closeFilterMenu();
    }
  });

  // Filter options
  document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const filter = e.target.dataset.filter;
      setFilter(filter);
    });
  });

  // Mark all notifications as read
  markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);

  // Help form
  helpForm.addEventListener('submit', handleHelpRequest);

  // Theme selector
  themeSelect.addEventListener('change', handleThemeChange);

  // Quick action buttons
  document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', handleQuickAction);
  });
}

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const targetPage = document.getElementById(`${pageId}-page`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  const activeLink = document.querySelector(`[data-page="${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  currentPage = pageId;
  closeMobileMenu();
}

// Mobile Menu
function toggleMobileMenu() {
  sidebar.classList.toggle('open');
  mobileOverlay.classList.toggle('open');
}

function closeMobileMenu() {
  sidebar.classList.remove('open');
  mobileOverlay.classList.remove('open');
}

// Greeting Update
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting = 'Good Morning';
  
  if (hour >= 12 && hour < 18) {
    greeting = 'Good Afternoon';
  } else if (hour >= 18) {
    greeting = 'Good Evening';
  }

  const welcomeTitle = document.getElementById('welcomeTitle');
  if (welcomeTitle) {
    welcomeTitle.textContent = `${greeting}, Madhava! 👋`;
  }
}

// Clock Setup
function setupClock() {
  updateGreeting();
  setInterval(updateGreeting, 60000); // Update every minute
}

// Tasks Management
function renderTasks() {
  const tableBody = document.getElementById('tasksTableBody');
  if (!tableBody) return;

  const filteredTasks = currentFilter === 'All' ? tasks : tasks.filter(task => task.status === currentFilter);

  tableBody.innerHTML = filteredTasks.map(task => `
    <tr>
      <td class="font-medium">${task.name}</td>
      <td>${task.assignedBy}</td>
      <td>${task.deadline}</td>
      <td>
        <span class="status-badge ${task.status.toLowerCase().replace(' ', '-')}">
          ${task.status}
        </span>
      </td>
      <td class="priority-${task.priority.toLowerCase()}">${task.priority}</td>
      <td>
        <div class="flex items-center gap-2">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${task.progress}%"></div>
          </div>
          <span class="text-sm">${task.progress}%</span>
        </div>
      </td>
      <td>
        <div class="task-actions">
          ${task.status === 'Pending' ? `
            <button class="task-action-btn" onclick="startTask('${task.id}')" title="Start Task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5,3 19,12 5,21 5,3"/>
              </svg>
            </button>
          ` : ''}
          ${task.status !== 'Completed' ? `
            <button class="task-action-btn" onclick="completeTask('${task.id}')" title="Complete Task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </button>
          ` : ''}
          <button class="task-action-btn" onclick="requestHelp('${task.id}')" title="Request Help">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Task Actions
function startTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'In Progress';
    renderTasks();
    showNotification(`Started task: ${task.name}`, 'success');
  }
}

function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'Completed';
    task.progress = 100;
    renderTasks();
    showNotification(`Completed task: ${task.name}`, 'success');
  }
}

function requestHelp(taskId) {
  showPage('help');
  const taskSelect = document.getElementById('helpTaskSelect');
  if (taskSelect) {
    taskSelect.value = taskId;
  }
  showNotification('Help request form opened', 'info');
}

// Filter Management
function toggleFilterMenu() {
  filterMenu.classList.toggle('open');
  filterBtn.parentElement.classList.toggle('open');
}

function closeFilterMenu() {
  filterMenu.classList.remove('open');
  filterBtn.parentElement.classList.remove('open');
}

function setFilter(filter) {
  currentFilter = filter;
  filterBtn.querySelector('span').textContent = `Filter: ${filter}`;
  closeFilterMenu();
  renderTasks();
}

// Leaderboard
function renderLeaderboard() {
  renderTop3();
  renderFullLeaderboard();
}

function renderTop3() {
  const topContainer = document.getElementById('leaderboardTop');
  if (!topContainer) return;

  topContainer.innerHTML = mockEmployees.slice(0, 3).map((employee, index) => `
    <div class="leaderboard-card ${index === 0 ? 'top' : ''}">
      <div class="rank-icon">${getRankIcon(employee.rank)}</div>
      <h3 class="leaderboard-name">${employee.name}</h3>
      <p class="leaderboard-department">${employee.department}</p>
      <div class="leaderboard-stats">
        <div class="crown-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span class="font-bold">${employee.crowns}</span>
        </div>
        <p class="text-sm">${employee.completedTasks} tasks completed</p>
      </div>
    </div>
  `).join('');
}

function renderFullLeaderboard() {
  const tableBody = document.getElementById('leaderboardTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = mockEmployees.map(employee => `
    <tr>
      <td class="text-center text-lg">${getRankIcon(employee.rank)}</td>
      <td class="font-medium">${employee.name}</td>
      <td>${employee.department}</td>
      <td>
        <div class="crown-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          ${employee.crowns}
        </div>
      </td>
      <td>${employee.completedTasks}</td>
    </tr>
  `).join('');
}

function getRankIcon(rank) {
  switch (rank) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return rank.toString();
  }
}

// Crown Stats
function renderCrownStats() {
  renderCrownHistory();
  renderBadges();
}

function renderCrownHistory() {
  const historyContainer = document.getElementById('crownHistory');
  if (!historyContainer) return;

  historyContainer.innerHTML = crownHistory.map(entry => `
    <div class="crown-entry">
      <div class="crown-entry-info">
        <h4>${entry.week}</h4>
        <p>${entry.reason}</p>
      </div>
      <div class="crown-entry-value">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span class="font-bold">+${entry.crowns}</span>
      </div>
    </div>
  `).join('');
}

function renderBadges() {
  const badgesContainer = document.getElementById('badgesGrid');
  if (!badgesContainer) return;

  badgesContainer.innerHTML = badges.map(badge => `
    <div class="badge-item ${badge.unlocked ? 'unlocked' : 'locked'}">
      <div class="badge-content">
        <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <div class="badge-info">
          <h4>${badge.name}</h4>
          <p>${badge.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Notifications
function renderNotifications() {
  const notificationsContainer = document.getElementById('notificationsList');
  if (!notificationsContainer) return;

  notificationsContainer.innerHTML = notifications.map(notification => `
    <div class="notification-item ${!notification.read ? 'unread' : ''}" onclick="markNotificationAsRead('${notification.id}')">
      <div class="notification-content">
        <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${getNotificationIcon(notification.type)}
        </svg>
        <div class="notification-text">
          <p class="notification-message">${notification.message}</p>
          <p class="notification-time">${notification.time}</p>
        </div>
        ${!notification.read ? '<div class="notification-dot"></div>' : ''}
      </div>
    </div>
  `).join('');
}

function getNotificationIcon(type) {
  switch (type) {
    case "task": return '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>';
    case "crown": return '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';
    case "help": return '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>';
    case "admin": return '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>';
    default: return '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>';
  }
}

function markNotificationAsRead(id) {
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
    renderNotifications();
  }
}

function markAllNotificationsAsRead() {
  notifications.forEach(notification => {
    notification.read = true;
  });
  renderNotifications();
  showNotification('All notifications marked as read', 'success');
}

// Teammates
function renderTeammates() {
  const teammatesContainer = document.getElementById('teammatesList');
  if (!teammatesContainer) return;

  teammatesContainer.innerHTML = suggestedTeammates.map(teammate => `
    <div class="teammate-item">
      <div class="teammate-info">
        <div class="teammate-avatar">${teammate.name.split(' ').map(n => n[0]).join('')}</div>
        <div class="teammate-details">
          <h4>${teammate.name}</h4>
          <p>${teammate.department}</p>
        </div>
      </div>
      <div class="teammate-status">
        <div class="status-indicator ${teammate.available ? 'online' : 'offline'}"></div>
        <button class="btn btn-outline btn-sm" ${!teammate.available ? 'disabled' : ''}>
          Invite
        </button>
      </div>
    </div>
  `).join('');
}

// Help Request
function handleHelpRequest(e) {
  e.preventDefault();
  
  const taskSelect = document.getElementById('helpTaskSelect');
  const message = document.getElementById('helpMessage');
  
  if (!taskSelect.value || !message.value.trim()) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  const selectedTask = tasks.find(t => t.id === taskSelect.value);
  
  showNotification(`Help request sent for: ${selectedTask.name}`, 'success');
  
  // Reset form
  taskSelect.value = '';
  message.value = '';
}

// Notification Preferences
function renderNotificationPreferences() {
  const container = document.getElementById('notificationPreferences');
  if (!container) return;

  const preferences = {
    tasks: true,
    crowns: true,
    help: false,
    admin: true,
  };

  container.innerHTML = Object.entries(preferences).map(([key, value]) => `
    <div class="preference-item">
      <label class="preference-label">${key} notifications</label>
      <button class="btn ${value ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="togglePreference('${key}')">
        ${value ? 'On' : 'Off'}
      </button>
    </div>
  `).join('');
}

function togglePreference(key) {
  // This would typically update a backend
  showNotification(`${key} notifications ${Math.random() > 0.5 ? 'enabled' : 'disabled'}`, 'info');
}

// Theme Management
function handleThemeChange(e) {
  const theme = e.target.value;
  // This would typically update the theme
  showNotification(`Theme changed to ${theme}`, 'info');
}

// Quick Actions
function handleQuickAction(e) {
  const action = e.currentTarget.querySelector('span').textContent;
  
  switch (action) {
    case 'Request Help':
      showPage('help');
      break;
    case 'View Leaderboard':
      showPage('datapool');
      break;
    case 'New Task Notification':
      showPage('notifications');
      break;
  }
}

// Logout
function handleLogout() {
  localStorage.removeItem('taskCrown_loggedIn');
  localStorage.removeItem('taskCrown_role');
  localStorage.removeItem('taskCrown_googleLogin');
  
  showNotification('Logging out...', 'info');
  
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification-toast');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification-toast notification-${type}`;
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

// Populate task select for help form
function populateTaskSelect() {
  const taskSelect = document.getElementById('helpTaskSelect');
  if (!taskSelect) return;

  // Clear existing options except the first one
  taskSelect.innerHTML = '<option value="">Choose a task...</option>';
  
  // Add task options
  tasks.forEach(task => {
    const option = document.createElement('option');
    option.value = task.id;
    option.textContent = task.name;
    taskSelect.appendChild(option);
  });
}

// Initialize task select when help page is shown
document.addEventListener('DOMContentLoaded', () => {
  populateTaskSelect();
});

// Console welcome message
console.log(`
👑 TaskCrown Employee Dashboard
🎯 Role-based task management with crown system
📊 Features: Task tracking, leaderboard, notifications, help requests
⌨️  Navigation: Use sidebar to switch between pages
✨ Interactive: Click tasks, notifications, and quick actions
🔐 Authentication: Protected routes with login verification
`); 