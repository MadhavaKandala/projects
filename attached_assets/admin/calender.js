// Calendar JavaScript

// Calendar data and state
let currentDate = new Date();
let currentView = 'month';
const demoDate = (offset, time) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return `${formatDateForData(date)}T${time}`;
};

const events = [
    {
        id: 1,
        title: 'Team Standup',
        description: 'Daily team standup meeting',
        startDate: demoDate(1, '09:00'),
        endDate: demoDate(1, '09:30'),
        type: 'meeting',
        priority: 'medium',
        location: 'Conference Room A',
        attendees: ['team@company.com']
    },
    {
        id: 2,
        title: 'Q4 Review Deadline',
        description: 'Final submission deadline for Q4 performance reviews',
        startDate: demoDate(4, '17:00'),
        endDate: demoDate(4, '17:00'),
        type: 'deadline',
        priority: 'high',
        location: 'Online',
        attendees: ['all@company.com']
    },
    {
        id: 3,
        title: 'Product Launch Meeting',
        description: 'Final preparations for product launch',
        startDate: demoDate(2, '14:00'),
        endDate: demoDate(2, '16:00'),
        type: 'meeting',
        priority: 'high',
        location: 'Main Conference Room',
        attendees: ['product@company.com', 'marketing@company.com']
    },
    {
        id: 4,
        title: 'Security Training',
        description: 'Mandatory security awareness training',
        startDate: demoDate(9, '10:00'),
        endDate: demoDate(9, '12:00'),
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
    } else {
        renderAgendaView(currentView === 'week' ? getWeekStart(currentDate) : currentDate, currentView === 'week' ? 7 : 1);
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
                            <div class="day-event ${event.type} ${event.priority}" title="${escapeHtml(event.title)}">
                                ${escapeHtml(event.title)}
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

function renderAgendaView(start, days) {
    const grid = document.getElementById('calendarGrid');
    grid.className = 'calendar-grid agenda-view';
    grid.innerHTML = Array.from({ length: days }, (_, index) => {
        const date = new Date(start);
        date.setDate(date.getDate() + index);
        const items = getEventsForDate(date);
        return `<section><h3>${formatDate(date)}</h3>${items.map(renderEventItem).join('') || '<p class="empty-state">No events scheduled.</p>'}</section>`;
    }).join('');
}

// Render upcoming events
function renderUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    if (!container) return;
    
    const upcoming = getUpcomingEvents(Number(document.getElementById('eventRange').value));
    
    container.innerHTML = upcoming.map(renderEventItem).join('') || '<div class="empty-state">No upcoming events.</div>';
}

function renderEventItem(event) {
    return `
        <div class="event-item">
            <div class="event-indicator ${event.type}"></div>
            <div class="event-content">
                <h4 class="event-title">${escapeHtml(event.title)}</h4>
                <p class="event-description">${escapeHtml(event.description)}</p>
                <div class="event-meta">
                    <span class="event-datetime">
                        <i class="fas fa-calendar"></i>
                        ${formatEventDateTime(event.startDate, event.endDate)}
                    </span>
                    ${event.location ? `
                        <span class="event-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${escapeHtml(event.location)}
                        </span>
                    ` : ''}
                </div>
            </div>
            <div class="event-actions">
                <button class="btn-icon" onclick="editEvent(${event.id})" aria-label="Edit Event" title="Edit Event">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon danger" onclick="deleteEvent(${event.id})" aria-label="Delete Event" title="Delete Event">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// Setup calendar controls
function setupCalendarControls() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentView === 'month') {
                currentDate.setDate(1);
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
                currentDate.setDate(1);
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
            viewBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', b === this);
            });
            this.classList.add('active');
            currentView = this.dataset.view;
            renderCalendar();
        });
    });
    document.getElementById('eventRange').addEventListener('change', renderUpcomingEvents);
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
    const existingEvent = events.find(event => String(event.id) === eventData.eventId);
    if (!eventData.title.trim()) return showToast('Enter an event title.', 'warning');
    if (new Date(eventData.endDate) < new Date(eventData.startDate)) return showToast('The event must end after it starts.', 'warning');
    
    const newEvent = {
        id: existingEvent?.id ?? Date.now(),
        title: eventData.title.trim(),
        description: eventData.description,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        type: eventData.type,
        priority: eventData.priority,
        location: eventData.location,
        attendees: eventData.attendees ? eventData.attendees.split(',').map(email => email.trim()) : []
    };
    
    if (existingEvent) Object.assign(existingEvent, newEvent);
    else events.push(newEvent);
    currentDate = new Date(newEvent.startDate);
    renderCalendar();
    renderUpcomingEvents();
    
    closeModal('createEventModal');
    showToast(existingEvent ? 'Event updated.' : 'Event created.', 'success');
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
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
        const form = document.getElementById('createEventForm');
        form.elements.eventId.value = event.id;
        for (const field of ['title', 'description', 'startDate', 'endDate', 'type', 'priority', 'location']) {
            form.elements[field].value = event[field];
        }
        form.elements.attendees.value = event.attendees.join(', ');
        document.querySelector('#createEventModal .modal-header h3').textContent = 'Edit event';
        form.querySelector('[type="submit"]').textContent = 'Save event';
        openModal('createEventModal');
    }
}

function createEvent() {
    const form = document.getElementById('createEventForm');
    form.reset();
    form.elements.eventId.value = '';
    document.querySelector('#createEventModal .modal-header h3').textContent = 'Create event';
    form.querySelector('[type="submit"]').textContent = 'Create event';
    openModal('createEventModal');
}

function deleteEvent(id) {
    const event = events.find(e => e.id === id);
    if (event && confirm(`Are you sure you want to delete "${event.title}"?`)) {
        const index = events.findIndex(e => e.id === id);
        events.splice(index, 1);
        renderCalendar();
        renderUpcomingEvents();
        showToast('Event deleted.', 'success');
    }
}
