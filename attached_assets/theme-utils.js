// Theme utility functions for consistent theming across all pages

// Apply theme based on saved preference
function applyThemeFromStorage() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    return newTheme;
}

// Apply theme on page load
document.addEventListener('DOMContentLoaded', function() {
    applyThemeFromStorage();
});

// Apply theme immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyThemeFromStorage);
} else {
    applyThemeFromStorage();
} 