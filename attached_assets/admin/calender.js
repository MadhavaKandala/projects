// Calendar JavaScript

// Calendar data and state
let currentDate = new Date();
let currentView = 'month';

const events = [
    {
        id: 1,
        title: 'Team Standup',
        description: 'Daily team standup meeting',
        startDate: '2025-01-02T09:00:00',
        endDate: '2025-01-02T09:30:00',
        type: 'meeting',
        priority: 'medium',
        location: 'Conference Room A',
        attendees: ['team@company.com']
    },
    {
        id: 2,
        title: 'Q4 Review Deadline',
        description: 'Final submission deadline for Q4 performance reviews',
        startDate: '2025-01-15T17:00:00',
        endDate: '2025-01-15T17:00:00',
        type: 'deadline',
        priority: 'high',
        location: 'Online',
        attendees: ['all@company.com']
    },
    {
        id: 3,
        title: 'Product Launch Meeting',
        description: 'Final preparations for product launch',
        startDate: '2025-01-10T14:00:00',
        endDate: '2025-01-10T16:00:00',
        type: 'meeting',
        priority: 'high',
        location: 'Main Conference Room',
        attendees: ['product@company.com', 'marketing@company.com']
    },
    {
        id: 4,
        title: 'Security Training',
        description: 'Mandatory security awareness training',
        startDate: '2025-01-20T10:00:00',
        endDate: '2025-01-20T12:00:00',
        type: 'training',
        priority: 'medium',
        location: 'Training Room B',
        attendees: ['all@company.com']
    }
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
    renderUpcomingEvents();
    setupCalendarControls();
    setupEventForm();
});

// Render calendar based on current view
function renderCalendar() {
    updateCurrentMonthDisplay();
    
    if (currentView === 'month') {
        renderMonthView();
    } else if (currentView === 'week') {
        renderWeekView();
    } else {
        renderDayView();
    }
}

// Render month view
function renderMonthView() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    
    grid.className = 'calendar-grid month-view';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    let html = '';
    
    // Header row
    html += '<div class="calendar-header">';
    daysOfWeek.forEach(day => {
        html += `<div class="day-header">${day}</div>`;
    });
    html += '</div>';
    
    // Calendar days
    html += '<div class="calendar-body">';
    for (let week = 0; week < 6; week++) {
        html += '<div class="calendar-week">';
        for (let day = 0; day < 7; day++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + (week * 7) + day);
            
            const isCurrentMonth = date.getMonth() === month;
            const isToday = isDateToday(date);
            const dayEvents = getEventsForDate(date);
            
            html += `
                <div class="calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}" 
                     data-date="${formatDateForData(date)}">
                    <div class="day-number">${date.getDate()}</div>
                    <div class="day-events">
                        ${dayEvents.slice(0, 3).map(event => `
                            <div class="day-event ${event.type} ${event.priority}" title="${event.title}">
                                ${event.title}
                            </div>
                        `).join('')}
                        ${dayEvents.length > 3 ? `<div class="more-events">+${dayEvents.length - 3} more</div>` : ''}
                    </div>
                </div>
            `;
        }
        html += '</div>';
    }
    html += '</div>';
    
    grid.innerHTML = html;
}

// Render upcoming events
function renderUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    if (!container) return;
    
    const upcoming = getUpcomingEvents(7); // Next 7 days
    
    container.innerHTML = upcoming.map(event => `
        <div class="event-item">
            <div class="event-indicator ${event.type}"></div>
            <div class="event-content">
                <h4 class="event-title">${event.title}</h4>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <span class="event-datetime">
                        <i class="fas fa-calendar"></i>
                        ${formatEventDateTime(event.startDate, event.endDate)}
                    </span>
                    ${event.location ? `
                        <span class="event-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${event.location}
                        </span>
                    ` : ''}
                </div>
            </div>
            <div class="event-actions">
                <button class="btn-icon" onclick="editEvent(${event.id})" title="Edit Event">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon danger" onclick="deleteEvent(${event.id})" title="Delete Event">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('') || '<div class="no-events">No upcoming events</div>';
}

// Setup calendar controls
function setupCalendarControls() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentView === 'month') {
                currentDate.setMonth(currentDate.getMonth() - 1);
            } else if (currentView === 'week') {
                currentDate.setDate(currentDate.getDate() - 7);
            } else {
                currentDate.setDate(currentDate.getDate() - 1);
            }
            renderCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentView === 'month') {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else if (currentView === 'week') {
                currentDate.setDate(currentDate.getDate() + 7);
            } else {
                currentDate.setDate(currentDate.getDate() + 1);
            }
            renderCalendar();
        });
    }
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            renderCalendar();
        });
    });
}

// Setup event form
function setupEventForm() {
    const form = document.getElementById('createEventForm');
    if (form) {
        form.addEventListener('submit', handleCreateEvent);
    }
}

// Handle create event
function handleCreateEvent(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventData = Object.fromEntries(formData);
    
    const newEvent = {
        id: events.length + 1,
        title: eventData.title,
        description: eventData.description,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        type: eventData.type,
        priority: eventData.priority,
        location: eventData.location,
        attendees: eventData.attendees ? eventData.attendees.split(',').map(email => email.trim()) : []
    };
    
    events.push(newEvent);
    renderCalendar();
    renderUpcomingEvents();
    
    closeModal('createEventModal');
    showToast('Event created successfully!', 'success');
    e.target.reset();
}

// Calendar utility functions
function updateCurrentMonthDisplay() {
    const monthDisplay = document.getElementById('currentMonth');
    if (monthDisplay) {
        if (currentView === 'month') {
            monthDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        } else if (currentView === 'week') {
            const weekStart = getWeekStart(currentDate);
            const weekEnd = getWeekEnd(currentDate);
            monthDisplay.textContent = `${formatDateRange(weekStart, weekEnd)}`;
        } else {
            monthDisplay.textContent = formatDate(currentDate);
        }
    }
}

function getEventsForDate(date) {
    const dateStr = formatDateForData(date);
    return events.filter(event => {
        const eventDate = new Date(event.startDate);
        return formatDateForData(eventDate) === dateStr;
    });
}

function getUpcomingEvents(days) {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    
    return events
        .filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate >= now && eventDate <= future;
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function isDateToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

function formatDateForData(date) {
    return date.toISOString().split('T')[0];
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateRange(start, end) {
    if (start.getMonth() === end.getMonth()) {
        return `${months[start.getMonth()]} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
    } else {
        return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
    }
}

function formatEventDateTime(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
        return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else {
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
}

function getWeekStart(date) {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
}

function getWeekEnd(date) {
    const end = new Date(date);
    end.setDate(date.getDate() - date.getDay() + 6);
    return end;
}

// Calendar actions
function goToToday() {
    currentDate = new Date();
    renderCalendar();
}

function editEvent(id) {
    const event = events.find(e => e.id === id);
    if (event) {
        console.log('Editing event:', event);
        showToast(`Editing event: ${event.title}`, 'info');
    }
}

function deleteEvent(id) {
    const event = events.find(e => e.id === id);
    if (event && confirm(`Are you sure you want to delete "${event.title}"?`)) {
        const index = events.findIndex(e => e.id === id);
        events.splice(index, 1);
        renderCalendar();
        renderUpcomingEvents();
        showToast('Event deleted successfully!', 'success');
    }
}