// Theme utility functions for consistent theming across all pages

// Comprehensive CSS variables for both light and dark themes
const lightThemeVars = {
    // Core Colors - Specified Palette
    '--background': '60 9% 98%', // #fefefc (very light off-white)
    '--foreground': '240 100% 15%', // #08144f (dark navy blue)
    '--primary': '240 100% 15%', // #08144f (dark navy blue)
    '--primary-foreground': '60 9% 98%', // #fefefc (very light off-white)
    '--accent': '199 100% 66%', // #42c4ff (bright cyan/sky blue)
    '--accent-foreground': '240 100% 15%', // #08144f (dark navy blue)
    
    // Surface and Card Colors
    '--surface': '60 9% 98%', // #fefefc
    '--card': '0 0% 100%', // Pure white for cards
    '--card-foreground': '240 100% 15%', // #08144f
    '--card-border': '240 6% 90%',
    
    // Muted Colors
    '--muted': '240 4.8% 95.9%',
    '--muted-foreground': '240 3.8% 46.1%',
    
    // Interactive Elements
    '--border': '240 5.9% 90%',
    '--input': '240 5.9% 90%',
    '--ring': '199 100% 66%', // #42c4ff
    
    // Sidebar Colors
    '--sidebar-background': '60 9% 98%', // #fefefc
    '--sidebar-foreground': '240 100% 15%', // #08144f
    '--sidebar-primary': '199 100% 66%', // #42c4ff
    '--sidebar-primary-foreground': '240 100% 15%', // #08144f
    '--sidebar-accent': '199 100% 95%', // Light cyan
    '--sidebar-accent-foreground': '199 100% 66%', // #42c4ff
    '--sidebar-border': '240 5.9% 90%',
    '--sidebar-ring': '199 100% 66%', // #42c4ff
    
    // Status Colors
    '--success': '142 76% 36%',
    '--success-foreground': '60 9% 98%', // #fefefc
    '--success-light': '142 76% 95%',
    '--warning': '45 93% 47%',
    '--warning-foreground': '240 100% 15%', // #08144f
    '--warning-light': '45 93% 95%',
    '--danger': '0 84% 60%',
    '--danger-foreground': '60 9% 98%', // #fefefc
    '--danger-light': '0 84% 95%',
    
    // Crown/Achievement Colors
    '--crown-gold': '45 100% 65%',
    '--crown-gold-light': '45 100% 95%',
    '--crown-silver': '0 0% 75%',
    '--crown-bronze': '25 75% 60%',
    
    // Gradients
    '--gradient-primary': 'linear-gradient(135deg, #42c4ff, #08144f)',
    '--gradient-crown': 'linear-gradient(135deg, hsl(45 100% 65%), hsl(35 100% 70%))',
    '--gradient-surface': 'linear-gradient(135deg, #fefefc, #f8fafc)',
    
    // Shadows
    '--shadow-soft': '0 2px 8px hsl(240 100% 15% / 0.05)',
    '--shadow-medium': '0 4px 16px hsl(240 100% 15% / 0.1)',
    '--shadow-strong': '0 8px 32px hsl(240 100% 15% / 0.15)',
    '--shadow-crown': '0 4px 20px hsl(45 100% 65% / 0.3)'
};

const darkThemeVars = {
    // Core Colors - Dark Mode Palette
    '--background': '240 10% 3.9%', // Dark background
    '--foreground': '60 9% 98%', // #fefefc (very light off-white)
    '--primary': '199 100% 66%', // #42c4ff (bright cyan/sky blue)
    '--primary-foreground': '240 10% 3.9%', // Dark background
    '--accent': '199 100% 66%', // #42c4ff (bright cyan/sky blue)
    '--accent-foreground': '240 10% 3.9%', // Dark background
    
    // Surface and Card Colors
    '--surface': '240 7% 8%',
    '--card': '240 10% 6%',
    '--card-foreground': '60 9% 98%', // #fefefc
    '--card-border': '240 6% 15%',
    
    // Muted Colors
    '--muted': '240 4.8% 8%',
    '--muted-foreground': '240 3.8% 60%',
    
    // Interactive Elements
    '--border': '240 6% 15%',
    '--input': '240 6% 15%',
    '--ring': '199 100% 66%', // #42c4ff
    
    // Sidebar Colors
    '--sidebar-background': '240 10% 6%',
    '--sidebar-foreground': '60 9% 98%', // #fefefc
    '--sidebar-primary': '199 100% 66%', // #42c4ff
    '--sidebar-primary-foreground': '240 10% 3.9%',
    '--sidebar-accent': '199 100% 20%', // Dark cyan
    '--sidebar-accent-foreground': '199 100% 66%', // #42c4ff
    '--sidebar-border': '240 6% 15%',
    '--sidebar-ring': '199 100% 66%', // #42c4ff
    
    // Status Colors
    '--success': '142 76% 36%',
    '--success-foreground': '60 9% 98%', // #fefefc
    '--success-light': '142 76% 25%',
    '--warning': '45 93% 47%',
    '--warning-foreground': '60 9% 98%', // #fefefc
    '--warning-light': '45 93% 25%',
    '--danger': '0 84% 60%',
    '--danger-foreground': '60 9% 98%', // #fefefc
    '--danger-light': '0 84% 25%',
    
    // Crown/Achievement Colors
    '--crown-gold': '45 100% 65%',
    '--crown-gold-light': '45 100% 25%',
    '--crown-silver': '0 0% 75%',
    '--crown-bronze': '25 75% 60%',
    
    // Gradients
    '--gradient-primary': 'linear-gradient(135deg, #42c4ff, #08144f)',
    '--gradient-crown': 'linear-gradient(135deg, hsl(45 100% 65%), hsl(35 100% 70%))',
    '--gradient-surface': 'linear-gradient(135deg, #1e293b, #334155)',
    
    // Shadows
    '--shadow-soft': '0 2px 8px hsl(60 9% 98% / 0.05)',
    '--shadow-medium': '0 4px 16px hsl(60 9% 98% / 0.1)',
    '--shadow-strong': '0 8px 32px hsl(60 9% 98% / 0.15)',
    '--shadow-crown': '0 4px 20px hsl(45 100% 65% / 0.3)'
};

// Apply theme variables to document root
function applyThemeVariables(theme) {
    const root = document.documentElement;
    const vars = theme === 'dark' ? darkThemeVars : lightThemeVars;
    
    Object.entries(vars).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
}

// Apply theme based on saved preference
function applyThemeFromStorage() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme === 'dark' ? 'dark' : 'light';
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    applyThemeVariables(theme);
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
    
    applyThemeVariables(newTheme);
    
    // Update theme toggle button if it exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = newTheme === 'dark';
    }
    
    // Update dark mode checkbox if it exists
    const darkModeCheckbox = document.getElementById('dark-mode');
    if (darkModeCheckbox) {
        darkModeCheckbox.checked = newTheme === 'dark';
    }
    
    return newTheme;
}

// Force refresh all elements that might need theme updates
function refreshThemeElements() {
    // Trigger a small reflow to ensure all elements update
    document.body.offsetHeight;
    
    // Update any custom elements that might need manual refresh
    const cards = document.querySelectorAll('.card, .dashboard-card, .stat-card, .task-card, .quick-action, .message-content, .settings-section, .chat-container');
    cards.forEach(card => {
        card.style.transition = 'none';
        setTimeout(() => {
            card.style.transition = '';
        }, 10);
    });
    
    // Update gradients and backgrounds
    const gradientElements = document.querySelectorAll('.user-profile, .logo, .brand-name, .ai-avatar, .message-avatar');
    gradientElements.forEach(element => {
        element.style.transition = 'none';
        setTimeout(() => {
            element.style.transition = '';
        }, 10);
    });
}

// Enhanced theme application with element refresh
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    applyThemeVariables(theme);
    refreshThemeElements();
}

// Apply theme on page load
document.addEventListener('DOMContentLoaded', function() {
    applyThemeFromStorage();
    
    // Set up theme toggle button if it exists
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');
        themeToggle.checked = currentTheme === 'dark';
        
        themeToggle.addEventListener('change', function() {
            toggleTheme();
        });
    }
    
    // Set up dark mode checkbox if it exists
    const darkModeCheckbox = document.getElementById('dark-mode');
    if (darkModeCheckbox) {
        const currentTheme = localStorage.getItem('theme');
        darkModeCheckbox.checked = currentTheme === 'dark';
        
        darkModeCheckbox.addEventListener('change', function() {
            toggleTheme();
        });
    }
});

// Apply theme immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyThemeFromStorage);
} else {
    applyThemeFromStorage();
}

// Export functions for global use
window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
window.applyThemeFromStorage = applyThemeFromStorage; 