// Task Management JavaScript

// Task data (mock data for demo)
const tasks = [
    {
        id: 1,
        title: 'Q4 Marketing Campaign',
        description: 'Plan and execute the Q4 marketing campaign for product launch',
        priority: 'high',
        status: 'in-progress',
        assignee: 'Sarah Johnson',
        assigneeAvatar: 'assets/imgs/user1.jpg',
        dueDate: '2025-01-15',
        progress: 65,
        estimatedHours: 40,
        tags: ['marketing', 'campaign', 'Q4']
    },
    {
        id: 2,
        title: 'Website Redesign',
        description: 'Redesign the company website with modern UI/UX',
        priority: 'medium',
        status: 'todo',
        assignee: 'Emily Davis',
        assigneeAvatar: 'assets/imgs/user3.jpg',
        dueDate: '2025-02-01',
        progress: 20,
        estimatedHours: 80,
        tags: ['design', 'website', 'ui/ux']
    },
    {
        id: 3,
        title: 'API Integration',
        description: 'Integrate third-party payment and analytics APIs',
        priority: 'high',
        status: 'completed',
        assignee: 'Michael Chen',
        assigneeAvatar: 'assets/imgs/user2.jpg',
        dueDate: '2025-01-05',
        progress: 100,
        estimatedHours: 24,
        tags: ['development', 'api', 'integration']
    },
    {
        id: 4,
        title: 'Database Optimization',
        description: 'Optimize database queries and improve performance',
        priority: 'medium',
        status: 'review',
        assignee: 'Michael Chen',
        assigneeAvatar: 'assets/imgs/user2.jpg',
        dueDate: '2025-01-20',
        progress: 85,
        estimatedHours: 16,
        tags: ['database', 'optimization', 'performance']
    },
    {
        id: 5,
        title: 'User Testing',
        description: 'Conduct user testing sessions for new features',
        priority: 'low',
        status: 'todo',
        assignee: 'Emily Davis',
        assigneeAvatar: 'assets/imgs/user3.jpg',
        dueDate: '2025-01-25',
        progress: 0,
        estimatedHours: 20,
        tags: ['testing', 'user-research', 'qa']
    },
    {
        id: 6,
        title: 'Security Audit',
        description: 'Perform comprehensive security audit of the application',
        priority: 'high',
        status: 'in-progress',
        assignee: 'Michael Chen',
        assigneeAvatar: 'assets/imgs/user2.jpg',
        dueDate: '2025-01-12',
        progress: 45,
        estimatedHours: 32,
        tags: ['security', 'audit', 'compliance']
    }
];

let currentView = 'kanban';

// Initialize task management page
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
    setupTaskFilters();
    setupViewToggle();
    setupTaskForms();
});

// Render tasks based on current view
function renderTasks() {
    if (currentView === 'kanban') {
        renderKanbanView();
    } else {
        renderListView();
    }
}

// Render kanban board
function renderKanbanView() {
    const todoContainer = document.getElementById('todoTasks');
    const inProgressContainer = document.getElementById('inProgressTasks');
    const reviewContainer = document.getElementById('reviewTasks');
    const completedContainer = document.getElementById('completedTasks');
    
    if (!todoContainer) return;
    
    // Clear containers
    [todoContainer, inProgressContainer, reviewContainer, completedContainer].forEach(container => {
        if (container) container.innerHTML = '';
    });
    
    // Group tasks by status
    const tasksByStatus = {
        'todo': tasks.filter(task => task.status === 'todo'),
        'in-progress': tasks.filter(task => task.status === 'in-progress'),
        'review': tasks.filter(task => task.status === 'review'),
        'completed': tasks.filter(task => task.status === 'completed')
    };
    
    // Render tasks in each column
    Object.keys(tasksByStatus).forEach(status => {
        const container = document.getElementById(getContainerId(status));
        if (container) {
            container.innerHTML = tasksByStatus[status].map(task => createTaskCard(task)).join('');
        }
    });
    
    // Update task counts
    updateTaskCounts(tasksByStatus);
}

// Render list view
function renderListView() {
    const tableBody = document.getElementById('taskTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = tasks.map(task => `
        <tr class="task-row" data-task-id="${task.id}">
            <td>
                <div class="task-title-cell">
                    <h4>${task.title}</h4>
                    <p class="task-description">${task.description}</p>
                    <div class="task-tags">
                        ${task.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </td>
            <td>
                <div class="assignee-cell">
                    <img src="${task.assigneeAvatar}" alt="${task.assignee}" class="assignee-avatar">
                    <span>${task.assignee}</span>
                </div>
            </td>
            <td>
                <span class="priority-badge ${task.priority}">${formatPriority(task.priority)}</span>
            </td>
            <td>
                <span class="status-badge ${task.status}">${formatStatus(task.status)}</span>
            </td>
            <td>
                <span class="due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}">${formatDate(task.dueDate)}</span>
            </td>
            <td>
                <div class="progress-cell">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${task.progress}%"></div>
                    </div>
                    <span class="progress-text">${task.progress}%</span>
                </div>
            </td>
            <td>
                <div class="task-actions">
                    <button class="btn-icon" onclick="editTask(${task.id})" title="Edit Task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteTask(${task.id})" title="Delete Task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Create task card for kanban view
function createTaskCard(task) {
    return `
        <div class="task-card" data-task-id="${task.id}" draggable="true">
            <div class="task-header">
                <span class="priority-badge ${task.priority}">${formatPriority(task.priority)}</span>
                <div class="task-actions">
                    <button class="btn-icon small" onclick="editTask(${task.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon small" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <h4 class="task-title">${task.title}</h4>
            <p class="task-description">${task.description}</p>
            
            <div class="task-tags">
                ${task.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            <div class="task-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${task.progress}%"></div>
                </div>
                <span class="progress-text">${task.progress}%</span>
            </div>
            
            <div class="task-footer">
                <div class="task-assignee">
                    <img src="${task.assigneeAvatar}" alt="${task.assignee}" class="assignee-avatar">
                    <span>${task.assignee}</span>
                </div>
                <div class="task-due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(task.dueDate)}</span>
                </div>
            </div>
        </div>
    `;
}

// Setup filters
function setupTaskFilters() {
    const priorityFilter = document.getElementById('priorityFilter');
    const assigneeFilter = document.getElementById('assigneeFilter');
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', filterTasks);
    }
    
    if (assigneeFilter) {
        assigneeFilter.addEventListener('change', filterTasks);
    }
}

// Filter tasks
function filterTasks() {
    const priorityFilter = document.getElementById('priorityFilter').value;
    const assigneeFilter = document.getElementById('assigneeFilter').value;
    
    // This is a simplified filter - in a real app, you'd filter the tasks array
    console.log('Filtering tasks:', { priorityFilter, assigneeFilter });
    // Re-render with filtered tasks
    renderTasks();
}

// Setup view toggle
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const kanbanBoard = document.getElementById('kanbanBoard');
    const listView = document.getElementById('taskListView');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Switch views
            currentView = view;
            if (view === 'kanban') {
                kanbanBoard.style.display = 'flex';
                listView.style.display = 'none';
            } else {
                kanbanBoard.style.display = 'none';
                listView.style.display = 'block';
            }
            
            renderTasks();
        });
    });
}

// Setup task forms
function setupTaskForms() {
    const createForm = document.getElementById('createTaskForm');
    
    if (createForm) {
        createForm.addEventListener('submit', handleCreateTask);
    }
}

// Handle create task
function handleCreateTask(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const taskData = Object.fromEntries(formData);
    
    // Create new task object
    const newTask = {
        id: tasks.length + 1,
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        status: 'todo',
        assignee: getAssigneeName(taskData.assignee),
        assigneeAvatar: getAssigneeAvatar(taskData.assignee),
        dueDate: taskData.dueDate,
        progress: 0,
        estimatedHours: parseInt(taskData.estimatedHours) || 0,
        tags: taskData.tags ? taskData.tags.split(',').map(tag => tag.trim()) : []
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Re-render
    renderTasks();
    
    // Close modal and show success message
    closeModal('createTaskModal');
    showToast('Task created successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

// Task actions
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        console.log('Editing task:', task);
        // In a real app, you'd populate an edit modal
        showToast(`Editing task: ${task.title}`, 'info');
    }
}

function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task && confirm(`Are you sure you want to delete "${task.title}"?`)) {
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        renderTasks();
        showToast('Task deleted successfully!', 'success');
    }
}

// Utility functions
function getContainerId(status) {
    const statusMap = {
        'todo': 'todoTasks',
        'in-progress': 'inProgressTasks',
        'review': 'reviewTasks',
        'completed': 'completedTasks'
    };
    return statusMap[status];
}

function updateTaskCounts(tasksByStatus) {
    Object.keys(tasksByStatus).forEach(status => {
        const column = document.querySelector(`[data-status="${status}"]`);
        if (column) {
            const countElement = column.querySelector('.task-count');
            if (countElement) {
                countElement.textContent = tasksByStatus[status].length;
            }
        }
    });
}

function formatPriority(priority) {
    const priorityMap = {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High'
    };
    return priorityMap[priority] || priority;
}

function formatStatus(status) {
    const statusMap = {
        'todo': 'To Do',
        'in-progress': 'In Progress',
        'review': 'Review',
        'completed': 'Completed'
    };
    return statusMap[status] || status;
}

function isOverdue(dueDate) {
    return new Date(dueDate) < new Date();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function getAssigneeName(assigneeKey) {
    const assigneeMap = {
        'sarah-johnson': 'Sarah Johnson',
        'michael-chen': 'Michael Chen',
        'emily-davis': 'Emily Davis'
    };
    return assigneeMap[assigneeKey] || 'Unassigned';
}

function getAssigneeAvatar(assigneeKey) {
    const avatarMap = {
        'sarah-johnson': 'assets/imgs/user1.jpg',
        'michael-chen': 'assets/imgs/user2.jpg',
        'emily-davis': 'assets/imgs/user3.jpg'
    };
    return avatarMap[assigneeKey] || 'assets/imgs/default-avatar.jpg';
}