// Employee Management JavaScript

// Employee data (mock data for demo)
const employees = [
    {
        id: 1,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        position: 'Marketing Manager',
        department: 'marketing',
        status: 'active',
        performance: 92,
        crowns: 3,
        tasksCompleted: 24,
        avatar: 'assets/imgs/user1.jpg',
        joinDate: '2023-01-15',
        manager: 'CEO'
    },
    {
        id: 2,
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@company.com',
        position: 'Senior Developer',
        department: 'engineering',
        status: 'active',
        performance: 88,
        crowns: 5,
        tasksCompleted: 31,
        avatar: 'assets/imgs/user2.jpg',
        joinDate: '2022-08-20',
        manager: 'Tech Lead'
    },
    {
        id: 3,
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        position: 'UX Designer',
        department: 'design',
        status: 'active',
        performance: 85,
        crowns: 2,
        tasksCompleted: 18,
        avatar: 'assets/imgs/user3.jpg',
        joinDate: '2023-03-10',
        manager: 'Design Lead'
    },
    {
        id: 4,
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@company.com',
        position: 'Sales Representative',
        department: 'sales',
        status: 'on-leave',
        performance: 78,
        crowns: 1,
        tasksCompleted: 15,
        avatar: 'assets/imgs/user4.jpg',
        joinDate: '2023-06-01',
        manager: 'Sales Manager'
    },
    {
        id: 5,
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa.anderson@company.com',
        position: 'HR Specialist',
        department: 'hr',
        status: 'active',
        performance: 91,
        crowns: 4,
        tasksCompleted: 22,
        avatar: 'assets/imgs/user5.jpg',
        joinDate: '2022-11-12',
        manager: 'HR Director'
    },
    {
        id: 6,
        firstName: 'Robert',
        lastName: 'Taylor',
        email: 'robert.taylor@company.com',
        position: 'Frontend Developer',
        department: 'engineering',
        status: 'active',
        performance: 87,
        crowns: 3,
        tasksCompleted: 28,
        avatar: 'assets/imgs/user6.jpg',
        joinDate: '2023-02-28',
        manager: 'Tech Lead'
    }
];

// Initialize employee page
document.addEventListener('DOMContentLoaded', function() {
    renderEmployees(employees);
    setupEmployeeFilters();
    setupEmployeeForms();
});

// Render employee grid
function renderEmployees(employeeList) {
    const grid = document.getElementById('employeeGrid');
    if (!grid) return;
    
    grid.innerHTML = employeeList.map(employee => `
        <div class="employee-card" data-department="${employee.department}" data-status="${employee.status}">
            <div class="employee-header">
                <span class="initial-avatar" aria-hidden="true">${avatarInitials(`${employee.firstName} ${employee.lastName}`)}</span>
                <div class="employee-status">
                    <span class="status-badge ${employee.status}">${formatStatus(employee.status)}</span>
                </div>
            </div>
            
            <div class="employee-info">
                <h3 class="employee-name">${escapeHtml(employee.firstName)} ${escapeHtml(employee.lastName)}</h3>
                <p class="employee-position">${escapeHtml(employee.position)}</p>
                <p class="employee-department">${formatDepartment(employee.department)}</p>
            </div>
            
            <div class="employee-stats">
                <div class="stat-item">
                    <span class="stat-label">Performance</span>
                    <div class="performance-bar">
                        <div class="performance-fill" style="width: ${employee.performance}%"></div>
                    </div>
                    <span class="stat-value">${employee.performance}%</span>
                </div>
                
                <div class="stats-row">
                    <div class="stat-item">
                        <span class="stat-label">Tasks</span>
                        <span class="stat-value">${employee.tasksCompleted}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Crowns</span>
                        <span class="stat-value crown-count">
                            <i class="fas fa-crown"></i>
                            ${employee.crowns}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="employee-actions">
                <button class="btn-icon" onclick="editEmployee(${employee.id})" aria-label="Edit Employee" title="Edit Employee">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="awardCrown(${employee.id})" aria-label="Award Crown" title="Award Crown">
                    <i class="fas fa-crown"></i>
                </button>
                <button class="btn-icon danger" onclick="removeEmployee(${employee.id})" aria-label="Remove Employee" title="Remove Employee">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('') || '<p class="empty-state">No people match these filters.</p>';
}

// Setup filters
function setupEmployeeFilters() {
    const departmentFilter = document.getElementById('departmentFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterEmployees);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterEmployees);
    }
}

// Filter employees
function filterEmployees() {
    const departmentFilter = document.getElementById('departmentFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredEmployees = employees;
    
    if (departmentFilter !== 'all') {
        filteredEmployees = filteredEmployees.filter(emp => emp.department === departmentFilter);
    }
    
    if (statusFilter !== 'all') {
        filteredEmployees = filteredEmployees.filter(emp => emp.status === statusFilter);
    }
    
    renderEmployees(filteredEmployees);
}

// Setup employee forms
function setupEmployeeForms() {
    const addForm = document.getElementById('addEmployeeForm');
    const editForm = document.getElementById('editEmployeeForm');
    
    if (addForm) {
        addForm.addEventListener('submit', handleAddEmployee);
    }
    
    if (editForm) {
        editForm.addEventListener('submit', handleEditEmployee);
    }
}

// Handle add employee
function handleAddEmployee(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeData = Object.fromEntries(formData);
    
    // Create new employee object
    const newEmployee = {
        id: Date.now(),
        firstName: employeeData.firstName.trim(),
        lastName: employeeData.lastName.trim(),
        email: employeeData.email,
        position: employeeData.position,
        department: employeeData.department,
        status: 'active',
        performance: 75,
        crowns: 0,
        tasksCompleted: 0,
        joinDate: employeeData.startDate,
        manager: employeeData.manager
    };
    
    // Add to employees array
    if (!newEmployee.firstName || !newEmployee.lastName) return showToast('Enter a first and last name.', 'warning');
    employees.push(newEmployee);
    
    // Re-render grid
    filterEmployees();
    
    // Close modal and show success message
    closeModal('addEmployeeModal');
    showToast('Employee added.', 'success');
    
    // Reset form
    e.target.reset();
}

// Handle edit employee
function handleEditEmployee(e) {
    e.preventDefault();
    const employee = employees.find(item => String(item.id) === e.target.elements.employeeId.value);
    if (!employee) return;
    employee.status = e.target.elements.status.value;
    filterEmployees();
    closeModal('editEmployeeModal');
    showToast('Employee updated.', 'success');
}

// Employee actions
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        const form = document.getElementById('editEmployeeForm');
        form.elements.employeeId.value = employee.id;
        form.elements.status.value = employee.status;
        openModal('editEmployeeModal');
    }
}

function awardCrown(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        employee.crowns += 1;
        filterEmployees();
        showToast(`Crown awarded to ${employee.firstName} ${employee.lastName}.`, 'success');
    }
}

function removeEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee && confirm(`Are you sure you want to remove ${employee.firstName} ${employee.lastName}?`)) {
        const index = employees.findIndex(emp => emp.id === id);
        employees.splice(index, 1);
        filterEmployees();
        showToast('Employee removed.', 'success');
    }
}

// Export employees
function exportEmployees() {
    const csvContent = generateEmployeeCSV(employees);
    downloadCSV(csvContent, 'employees.csv');
    showToast('Employee data exported!', 'success');
}

// Generate CSV content
function generateEmployeeCSV(employeeList) {
    const headers = ['Name', 'Email', 'Position', 'Department', 'Status', 'Performance', 'Crowns', 'Tasks Completed'];
    const rows = employeeList.map(emp => [
        `${emp.firstName} ${emp.lastName}`,
        emp.email,
        emp.position,
        formatDepartment(emp.department),
        formatStatus(emp.status),
        `${emp.performance}%`,
        emp.crowns,
        emp.tasksCompleted
    ]);
    
    return [headers, ...rows].map(row => row.map(value => {
        let text = String(value);
        if (/^[\s]*[=+@-]/.test(text)) text = `'${text}`;
        return `"${text.replaceAll('"', '""')}"`;
    }).join(',')).join('\n');
}

// Download CSV file
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Utility functions
function formatStatus(status) {
    const statusMap = {
        'active': 'Active',
        'inactive': 'Inactive',
        'on-leave': 'On Leave'
    };
    return statusMap[status] || status;
}

function formatDepartment(department) {
    const deptMap = {
        'engineering': 'Engineering',
        'marketing': 'Marketing',
        'sales': 'Sales',
        'hr': 'Human Resources',
        'design': 'Design'
    };
    return deptMap[department] || department;
}
