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
  {
    id: "4",
    name: "Database Optimization",
    assignedBy: "Alex Rodriguez",
    deadline: "2024-01-18",
    status: "Pending",
    priority: "High",
    progress: 0,
  },
  {
    id: "5",
    name: "API Documentation Update",
    assignedBy: "Sarah Johnson",
    deadline: "2024-01-22",
    status: "In Progress",
    priority: "Medium",
    progress: 45,
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
  {
    id: "4",
    type: "admin",
    message: "System maintenance scheduled for tomorrow at 2 AM",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "5",
    type: "crown",
    message: "Congratulations! You've earned the 'Streak Master' badge!",
    time: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "task",
    message: "Task deadline reminder: Database Optimization due in 2 days",
    time: "1 day ago",
    read: false,
  },
];

const crownHistory = [
  { date: "2024-01-15", reason: "Task delivered before deadline", crowns: 1 },
  { date: "2024-01-14", reason: "Helped 3 colleagues this week", crowns: 2 },
  { date: "2024-01-12", reason: "Maintaining a 7-day streak", crowns: 1 },
  { date: "2024-01-10", reason: "Excellent code review feedback", crowns: 1 },
  { date: "2024-01-08", reason: "Completed 5 tasks in one day", crowns: 1 },
  { date: "2024-01-05", reason: "Received 5-star feedback", crowns: 1 },
  { date: "2024-01-03", reason: "Team collaboration excellence", crowns: 1 },
  { date: "2024-01-01", reason: "New Year productivity boost", crowns: 1 },
];

const badges = [
  { name: "Early Bird", icon: "🌅", description: "Complete 5 tasks before deadline", unlocked: true },
  { name: "Team Player", icon: "🤝", description: "Help 10 colleagues", unlocked: true },
  { name: "Streak Master", icon: "🔥", description: "Maintain 7-day streak", unlocked: true },
  { name: "Crown Collector", icon: "👑", description: "Earn 50 crowns", unlocked: false },
  { name: "Speed Demon", icon: "⚡", description: "Complete 10 tasks in one day", unlocked: false },
  { name: "Quality Guru", icon: "⭐", description: "Get 5-star feedback", unlocked: false },
  { name: "Problem Solver", icon: "🧩", description: "Solve 20 complex tasks", unlocked: true },
  { name: "Mentor", icon: "🎓", description: "Help 5 new team members", unlocked: false },
  { name: "Innovator", icon: "💡", description: "Suggest 3 improvements", unlocked: true },
  { name: "Reliable", icon: "✅", description: "Complete 100% of assigned tasks", unlocked: false },
];

// Enhanced chat messages
const chatMessages = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "SJ",
    message: "Hey team, anyone available to help with the Q4 report formatting?",
    time: "2 hours ago"
  },
  {
    id: 2,
    author: "Mike Chen",
    avatar: "MC",
    message: "I can help! I have the template from last quarter.",
    time: "1 hour ago"
  },
  {
    id: 3,
    author: "Lisa Wang",
    avatar: "LW",
    message: "Thanks Mike! That would be great.",
    time: "30 minutes ago"
  }
];

// Current user data
const currentUser = {
  name: "Madhava Kumar",
  designation: "Senior Developer",
  department: "Engineering",
  crowns: 35,
  streak: 5,
  efficiency: 85,
  monthlyCrowns: 8,
  monthlyGoal: 10
};

const suggestedTeammates = [
  { name: "Sarah Johnson", department: "Marketing", available: true, expertise: "Content Strategy" },
  { name: "Mike Chen", department: "Sales", available: true, expertise: "Client Relations" },
  { name: "Lisa Wang", department: "Design", available: false, expertise: "UI/UX Design" },
  { name: "Alex Rodriguez", department: "Engineering", available: true, expertise: "Backend Development" },
  { name: "Emma Davis", department: "Product", available: true, expertise: "Product Management" },
  { name: "David Kim", department: "QA", available: false, expertise: "Testing & Quality" },
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

// Initialize DOM elements after page load
function initializeDOMElements() {
  // Re-initialize DOM elements that might not be available immediately
  window.sidebar = document.getElementById('sidebar');
  window.mobileMenuBtn = document.getElementById('mobileMenuBtn');
  window.mobileOverlay = document.getElementById('mobileOverlay');
  window.logoutBtn = document.getElementById('logoutBtn');
  window.filterBtn = document.getElementById('filterBtn');
  window.filterMenu = document.getElementById('filterMenu');
  window.markAllReadBtn = document.getElementById('markAllReadBtn');
  window.helpForm = document.getElementById('helpForm');
  window.themeSelect = document.getElementById('themeSelect');
}

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
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Filter dropdown
  if (filterBtn) {
    filterBtn.addEventListener('click', toggleFilterMenu);
  }
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
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
  }

  // Help form
  if (helpForm) {
    helpForm.addEventListener('submit', handleHelpRequest);
  }

  // Theme selector
  if (themeSelect) {
    themeSelect.addEventListener('change', handleThemeChange);
  }

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
  
  // Update page-specific content
  switch (pageId) {
    case 'tasks':
      renderTasks();
      break;
    case 'datapool':
      renderLeaderboard();
      break;
    case 'notifications':
      renderNotifications();
      break;
    case 'help':
      renderTeammates();
      renderChatMessages();
      break;
    case 'crowns':
      renderCrownStats();
      break;
    case 'settings':
      renderNotificationPreferences();
      // Re-initialize dark mode when settings page is shown
      setTimeout(() => initializeDarkMode(), 100);
      break;
  }
}

// Mobile Menu
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  if (sidebar && mobileOverlay) {
    sidebar.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
  }
}

function closeMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  if (sidebar && mobileOverlay) {
    sidebar.classList.remove('open');
    mobileOverlay.classList.remove('open');
  }
}

// Enhanced functions
function updateStats() {
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const ongoingTasks = tasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  
  const completedTasksElement = document.getElementById('completedTasksCount');
  const ongoingTasksElement = document.getElementById('ongoingTasksCount');
  const pendingTasksElement = document.getElementById('pendingTasksCount');
  const crownsEarnedElement = document.getElementById('crownsEarned');
  const totalCrownsElement = document.getElementById('totalCrowns');
  const monthlyCrownsElement = document.getElementById('monthlyCrowns');
  
  if (completedTasksElement) completedTasksElement.textContent = completedTasks;
  if (ongoingTasksElement) ongoingTasksElement.textContent = ongoingTasks;
  if (pendingTasksElement) pendingTasksElement.textContent = pendingTasks;
  if (crownsEarnedElement) crownsEarnedElement.textContent = currentUser.crowns;
  if (totalCrownsElement) totalCrownsElement.textContent = currentUser.crowns;
  if (monthlyCrownsElement) monthlyCrownsElement.textContent = currentUser.monthlyCrowns;
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good Morning';
  
  if (hour >= 12 && hour < 18) {
    greeting = 'Good Afternoon';
  } else if (hour >= 18) {
    greeting = 'Good Evening';
  }
  
  const welcomeTitle = document.getElementById('welcomeTitle');
  if (welcomeTitle) {
    welcomeTitle.textContent = `${greeting}, ${currentUser.name}! 👋`;
  }
  
  // Update sidebar user name
  const sidebarUserName = document.querySelector('.user-name');
  if (sidebarUserName) {
    sidebarUserName.textContent = currentUser.name.split(' ')[0];
  }
}

function renderCrownHistory() {
  const crownHistoryContainer = document.getElementById('crownHistory');
  if (!crownHistoryContainer) return;

  crownHistoryContainer.innerHTML = crownHistory.map(entry => `
    <div class="crown-entry">
      <div class="crown-entry-info">
        <h4>${entry.reason}</h4>
        <p>${entry.date}</p>
      </div>
      <div class="crown-entry-value">
        <span>+${entry.crowns} 👑</span>
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
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-info">
          <h4>${badge.name}</h4>
          <p>${badge.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderChatMessages() {
  const chatContainer = document.getElementById('chatMessages');
  if (!chatContainer) return;

  chatContainer.innerHTML = chatMessages.map(msg => `
    <div class="chat-message">
      <div class="message-avatar">
        <span>${msg.avatar}</span>
      </div>
      <div class="message-content">
        <p class="message-author">${msg.author}</p>
        <p class="message-text">${msg.message}</p>
        <p class="message-time">${msg.time}</p>
      </div>
    </div>
  `).join('');
}

function sendChatMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value.trim();
  
  if (message) {
    const newMessage = {
      id: chatMessages.length + 1,
      author: currentUser.name,
      avatar: currentUser.name.split(' ').map(n => n[0]).join(''),
      message: message,
      time: 'Just now'
    };
    
    chatMessages.push(newMessage);
    renderChatMessages();
    chatInput.value = '';
    
    // Auto-scroll to bottom
    const chatContainer = document.getElementById('chatMessages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Simulate response after 2 seconds
    setTimeout(() => {
      const responses = [
        "Thanks for the update!",
        "I'll look into that.",
        "Great work!",
        "Let me know if you need anything else.",
        "Perfect timing!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage = {
        id: chatMessages.length + 1,
        author: "Team Bot",
        avatar: "TB",
        message: randomResponse,
        time: 'Just now'
      };
      
      chatMessages.push(responseMessage);
      renderChatMessages();
      
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 2000);
  }
}

function handleDarkModeToggle() {
  const checkbox = document.getElementById('darkModeCheckbox');
  const body = document.body;
  
  if (checkbox && checkbox.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('taskCrown_theme', 'dark');
    showNotification('Dark mode enabled', 'info');
  } else if (checkbox) {
    body.classList.remove('dark-mode');
    localStorage.setItem('taskCrown_theme', 'light');
    showNotification('Light mode enabled', 'info');
  }
}

// Function to set up dark mode toggle event listener
function setupDarkModeToggle() {
  const checkbox = document.getElementById('darkModeCheckbox');
  const toggleContainer = document.getElementById('darkModeToggle');
  
  if (checkbox) {
    // Remove any existing event listeners to prevent duplicates
    checkbox.removeEventListener('change', handleDarkModeToggle);
    // Add the event listener
    checkbox.addEventListener('change', handleDarkModeToggle);
    console.log('Dark mode toggle event listener attached');
  }
  
  // Also add click event to the toggle container as backup
  if (toggleContainer) {
    toggleContainer.removeEventListener('click', handleToggleClick);
    toggleContainer.addEventListener('click', handleToggleClick);
    console.log('Dark mode toggle container click listener attached');
  }
}

// Backup click handler for the toggle container
function handleToggleClick() {
  const checkbox = document.getElementById('darkModeCheckbox');
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    handleDarkModeToggle();
  }
}

function initializeDarkMode() {
  const savedTheme = localStorage.getItem('taskCrown_theme') || 'light';
  
  // Apply theme to body immediately
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  
  // Try to find and update the checkbox
  const checkbox = document.getElementById('darkModeCheckbox');
  if (checkbox) {
    checkbox.checked = savedTheme === 'dark';
  }
  
  // Set up the event listener
  setupDarkModeToggle();
}

function saveSettings() {
  const name = document.getElementById('profileName').value;
  const designation = document.getElementById('profileDesignation').value;
  const department = document.getElementById('profileDepartment').value;
  const email = document.getElementById('profileEmail').value;
  
  // Update current user data
  currentUser.name = name;
  currentUser.designation = designation;
  currentUser.department = department;
  
  // Update display
  updateGreeting();
  
  // Update sidebar user info
  const userNameElement = document.querySelector('.user-name');
  if (userNameElement) {
    userNameElement.textContent = name.split(' ')[0];
  }
  
  // Update profile info
  const profileNameElement = document.querySelector('.profile-name');
  if (profileNameElement) {
    profileNameElement.textContent = name;
  }
  
  const profileRoleElement = document.querySelector('.profile-role');
  if (profileRoleElement) {
    profileRoleElement.textContent = designation;
  }
  
  const profileDepartmentElement = document.querySelector('.profile-department');
  if (profileDepartmentElement) {
    profileDepartmentElement.textContent = department + ' Department';
  }
  
  showNotification('Settings saved successfully!', 'success');
}

// Enhanced event listeners
function setupEnhancedEventListeners() {
  // Chat functionality
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatInput = document.getElementById('chatInput');
  
  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendChatMessage);
  }
  
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
  
  // Dark mode toggle - this is now handled in initializeDarkMode()
  // The event listener is added there to ensure it's properly set up
  
  // Save settings
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', saveSettings);
  }
  
  // Enhanced help form
  const helpForm = document.getElementById('helpForm');
  if (helpForm) {
    helpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const taskSelect = document.getElementById('helpTaskSelect');
      const email = document.getElementById('colleagueEmail');
      const message = document.getElementById('helpMessage');
      
      if (taskSelect.value && email.value && message.value) {
        showNotification('Help request sent successfully!', 'success');
        helpForm.reset();
      } else {
        showNotification('Please fill in all fields', 'error');
      }
    });
  }
  
  // Mark all notifications as read
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
  }
  
  // Filter options
  document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', (e) => {
      const filter = e.target.dataset.filter;
      setFilter(filter);
    });
  });
  
  // Quick action buttons
  document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', handleQuickAction);
  });
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
    task.progress = Math.min(task.progress + 25, 100);
    renderTasks();
    updateStats();
    showNotification(`Started task: ${task.name}`, 'success');
  }
}

function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'Completed';
    task.progress = 100;
    renderTasks();
    updateStats();
    
    // Award crown for completing task
    currentUser.crowns += 1;
    currentUser.monthlyCrowns += 1;
    updateStats();
    
    showNotification(`Completed task: ${task.name} and earned 1 crown! 👑`, 'success');
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
  const filterMenu = document.getElementById('filterMenu');
  const filterBtn = document.getElementById('filterBtn');
  
  if (filterMenu && filterBtn) {
    filterMenu.classList.toggle('open');
    filterBtn.parentElement.classList.toggle('open');
  }
}

function closeFilterMenu() {
  const filterMenu = document.getElementById('filterMenu');
  const filterBtn = document.getElementById('filterBtn');
  
  if (filterMenu && filterBtn) {
    filterMenu.classList.remove('open');
    filterBtn.parentElement.classList.remove('open');
  }
}

function setFilter(filter) {
  currentFilter = filter;
  const filterBtn = document.getElementById('filterBtn');
  if (filterBtn) {
    filterBtn.querySelector('span').textContent = `Filter: ${filter}`;
  }
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
          <span style="font-size: 1.2em;">👑</span>
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
          <span style="font-size: 1.1em;">👑</span>
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
  
  // Update crown stats display
  const totalCrownsElement = document.getElementById('totalCrowns');
  const monthlyCrownsElement = document.getElementById('monthlyCrowns');
  
  if (totalCrownsElement) totalCrownsElement.textContent = currentUser.crowns;
  if (monthlyCrownsElement) monthlyCrownsElement.textContent = currentUser.monthlyCrowns;
}

function renderCrownHistory() {
  const historyContainer = document.getElementById('crownHistory');
  if (!historyContainer) return;

  historyContainer.innerHTML = crownHistory.map(entry => `
    <div class="crown-entry">
      <div class="crown-entry-info">
        <h4>${entry.reason}</h4>
        <p>${entry.date}</p>
      </div>
      <div class="crown-entry-value">
        <span style="font-size: 1.2em;">👑</span>
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
        <span class="badge-icon" style="font-size: 1.5em;">${badge.icon}</span>
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
          <small>${teammate.expertise}</small>
        </div>
      </div>
      <div class="teammate-status">
        <div class="status-indicator ${teammate.available ? 'online' : 'offline'}"></div>
        <button class="btn btn-outline btn-sm" ${!teammate.available ? 'disabled' : ''}>
          ${teammate.available ? 'Invite' : 'Unavailable'}
        </button>
      </div>
    </div>
  `).join('');
}

// Help Request
function handleHelpRequest(e) {
  e.preventDefault();
  
  const taskSelect = document.getElementById('helpTaskSelect');
  const email = document.getElementById('colleagueEmail');
  const message = document.getElementById('helpMessage');
  
  if (!taskSelect.value || !email.value.trim() || !message.value.trim()) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  const selectedTask = tasks.find(t => t.id === taskSelect.value);
  
  showNotification(`Help request sent to ${email.value} for: ${selectedTask.name}`, 'success');
  
  // Reset form
  taskSelect.value = '';
  email.value = '';
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
    reminders: true,
    achievements: true,
  };

  container.innerHTML = Object.entries(preferences).map(([key, value]) => `
    <div class="preference-item">
      <label class="preference-label">${key.charAt(0).toUpperCase() + key.slice(1)} notifications</label>
      <button class="btn ${value ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="togglePreference('${key}')">
        ${value ? 'On' : 'Off'}
      </button>
    </div>
  `).join('');
}

function togglePreference(key) {
  // This would typically update a backend
  const isEnabled = Math.random() > 0.5;
  showNotification(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${isEnabled ? 'enabled' : 'disabled'}`, 'info');
  
  // Update the button text
  const button = event.target;
  if (button) {
    button.textContent = isEnabled ? 'On' : 'Off';
    button.className = `btn ${isEnabled ? 'btn-primary' : 'btn-outline'} btn-sm`;
  }
}

// Theme Management
function handleThemeChange(e) {
  const theme = e.target.value;
  // This would typically update the theme
  showNotification(`Theme changed to ${theme}`, 'info');
}

// Enhanced theme management
function initializeTheme() {
  const savedTheme = localStorage.getItem('taskCrown_theme') || 'light';
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
  }
  
  // Initialize dark mode checkbox
  initializeDarkMode();
}

function applyTheme(theme) {
  const body = document.body;
  const checkbox = document.getElementById('darkModeCheckbox');
  
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    if (checkbox) checkbox.checked = true;
  } else {
    body.classList.remove('dark-mode');
    if (checkbox) checkbox.checked = false;
  }
  
  localStorage.setItem('taskCrown_theme', theme);
}

// Quick Actions
function handleQuickAction(e) {
  const action = e.currentTarget.querySelector('span').textContent;
  
  switch (action) {
    case 'Request Help':
      showPage('help');
      showNotification('Help page opened', 'info');
      break;
    case 'View Leaderboard':
      showPage('datapool');
      showNotification('Leaderboard opened', 'info');
      break;
    case 'New Task Notification':
      showPage('notifications');
      showNotification('Notifications opened', 'info');
      break;
    default:
      showNotification('Action not implemented yet', 'warning');
  }
}

// Logout
function handleLogout() {
  // Clear all local storage
  localStorage.removeItem('taskCrown_loggedIn');
  localStorage.removeItem('taskCrown_role');
  localStorage.removeItem('taskCrown_googleLogin');
  localStorage.removeItem('taskCrown_theme');
  
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
    <span class="notification-message">${message}</span>
    <button class="notification-close">&times;</button>
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
  
  // Add some additional task options
  const additionalTasks = [
    { id: 'q4-report', name: 'Complete Q4 Report' },
    { id: 'marketing-campaign', name: 'Review Marketing Campaign' },
    { id: 'database-optimization', name: 'Database Optimization' },
    { id: 'api-documentation', name: 'API Documentation Update' }
  ];
  
  additionalTasks.forEach(task => {
    const option = document.createElement('option');
    option.value = task.id;
    option.textContent = task.name;
    taskSelect.appendChild(option);
  });
}

// Initialize enhanced features
function initializeEnhancedFeatures() {
  updateStats();
  updateGreeting();
  renderCrownHistory();
  renderBadges();
  renderChatMessages();
  initializeDarkMode(); // This now includes the event listener setup
  initializeTheme();
  setupEnhancedEventListeners();
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  const isLoggedIn = localStorage.getItem('taskCrown_loggedIn');
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }

  // Initialize DOM elements
  initializeDOMElements();
  
  // Initialize all features
  setupEventListeners();
  initializeEnhancedFeatures();
  
  // Show home page by default
  showPage('home');
  
  // Setup clock
  setupClock();
  
  // Populate task select for help form
  populateTaskSelect();
  
  // Initialize all page-specific content
  renderTasks();
  renderLeaderboard();
  renderNotifications();
  renderTeammates();
  renderNotificationPreferences();
  
  // Try to set up dark mode toggle multiple times to ensure it works
  setupDarkModeToggle();
  setTimeout(() => setupDarkModeToggle(), 500);
  setTimeout(() => setupDarkModeToggle(), 1000);
  
  console.log('🎉 TaskCrown Dashboard Enhanced Edition Loaded!');
  console.log('✨ Features: Real-time stats, Chat system, Dark mode, Enhanced crown tracking');
  console.log('🚀 Shortcuts: Press H for help, S for settings, N for notifications');
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