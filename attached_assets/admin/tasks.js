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
    const priority = document.getElementById('priorityFilter').value;
    const assignee = document.getElementById('assigneeFilter').value;
    const visibleTasks = tasks.filter(task =>
        (priority === 'all' || task.priority === priority) &&
        (assignee === 'all' || task.assignee === getAssigneeName(assignee))
    );
    if (currentView === 'kanban') {
        renderKanbanView(visibleTasks);
    } else {
        renderListView(visibleTasks);
    }
}

// Render kanban board
function renderKanbanView(visibleTasks) {
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
        'todo': visibleTasks.filter(task => task.status === 'todo'),
        'in-progress': visibleTasks.filter(task => task.status === 'in-progress'),
        'review': visibleTasks.filter(task => task.status === 'review'),
        'completed': visibleTasks.filter(task => task.status === 'completed')
    };
    
    // Render tasks in each column
    Object.keys(tasksByStatus).forEach(status => {
        const container = document.getElementById(getContainerId(status));
        if (container) {
            container.innerHTML = tasksByStatus[status].map(createTaskCard).join('') || '<p class="empty-state">No tasks here.</p>';
        }
    });
    
    // Update task counts
    updateTaskCounts(tasksByStatus);
}

// Render list view
function renderListView(visibleTasks) {
    const tableBody = document.getElementById('taskTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = visibleTasks.map(task => `
        <tr class="task-row" data-task-id="${task.id}">
            <td>
                <div class="task-title-cell">
                    <h4>${escapeHtml(task.title)}</h4>
                    <p class="task-description">${escapeHtml(task.description)}</p>
                    <div class="task-tags">
                        ${task.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                </div>
            </td>
            <td>
                <div class="assignee-cell">
                    <span class="initial-avatar" aria-hidden="true">${avatarInitials(task.assignee)}</span>
                    <span>${escapeHtml(task.assignee)}</span>
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
    `).join('') || '<tr><td colspan="7" class="empty-state">No tasks match these filters.</td></tr>';
}

// Create task card for kanban view
function createTaskCard(task) {
    return `
        <div class="task-card" data-task-id="${task.id}">
            <div class="task-header">
                <span class="priority-badge ${task.priority}">${formatPriority(task.priority)}</span>
                <div class="task-actions">
                    <button class="btn-icon small" onclick="editTask(${task.id})" aria-label="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon small" onclick="deleteTask(${task.id})" aria-label="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <h4 class="task-title">${escapeHtml(task.title)}</h4>
            <p class="task-description">${escapeHtml(task.description)}</p>
            
            <div class="task-tags">
                ${task.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
            
            <div class="task-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${task.progress}%"></div>
                </div>
                <span class="progress-text">${task.progress}%</span>
            </div>
            
            <div class="task-footer">
                <div class="task-assignee">
                    <span class="initial-avatar" aria-hidden="true">${avatarInitials(task.assignee)}</span>
                    <span>${escapeHtml(task.assignee)}</span>
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
        priorityFilter.addEventListener('change', renderTasks);
    }
    
    if (assigneeFilter) {
        assigneeFilter.addEventListener('change', renderTasks);
    }
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
    const existingTask = tasks.find(task => String(task.id) === taskData.taskId);
    
    // Create new task object
    const newTask = {
        id: existingTask?.id ?? Date.now(),
        title: taskData.title.trim(),
        description: taskData.description,
        priority: taskData.priority,
        status: taskData.status,
        assignee: getAssigneeName(taskData.assignee),
        dueDate: taskData.dueDate,
        progress: taskData.status === 'completed' ? 100 : Math.min(existingTask?.progress ?? 0, 99),
        estimatedHours: parseInt(taskData.estimatedHours) || 0,
        tags: taskData.tags ? taskData.tags.split(',').map(tag => tag.trim()) : []
    };
    
    // Add to tasks array
    if (!newTask.title) return showToast('Enter a task title.', 'warning');
    if (existingTask) Object.assign(existingTask, newTask);
    else tasks.push(newTask);
    
    // Re-render
    renderTasks();
    
    // Close modal and show success message
    closeModal('createTaskModal');
    showToast(existingTask ? 'Task updated.' : 'Task created.', 'success');
    
    // Reset form
    e.target.reset();
}

// Task actions
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const form = document.getElementById('createTaskForm');
    form.elements.taskId.value = task.id;
    for (const field of ['title', 'description', 'priority', 'status', 'dueDate', 'estimatedHours']) {
        form.elements[field].value = task[field] ?? '';
    }
    form.elements.assignee.value = task.assignee.toLowerCase().replaceAll(' ', '-');
    form.elements.tags.value = task.tags.join(', ');
    document.querySelector('#createTaskModal .modal-header h3').textContent = 'Edit task';
    form.querySelector('[type="submit"]').textContent = 'Save task';
    openModal('createTaskModal');
}

function createTask() {
    const form = document.getElementById('createTaskForm');
    form.reset();
    form.elements.taskId.value = '';
    document.querySelector('#createTaskModal .modal-header h3').textContent = 'Create Task';
    form.querySelector('[type="submit"]').textContent = 'Create Task';
    openModal('createTaskModal');
}

function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task && confirm(`Are you sure you want to delete "${task.title}"?`)) {
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        renderTasks();
        showToast('Task deleted.', 'success');
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
    if (!dateString) return 'No due date';
    const date = new Date(`${dateString}T00:00:00`);
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
