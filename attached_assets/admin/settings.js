const nameForm = document.getElementById('workspaceForm');
const nameInput = document.getElementById('workspaceName');
const themeOptions = document.querySelectorAll('[data-theme-option]');

nameInput.value = localStorage.getItem('taskCrownAdminName') || nameInput.value;

nameForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
        showToast('Enter a workspace name.', 'warning');
        return;
    }
    localStorage.setItem('taskCrownAdminName', name);
    document.querySelector('.logo small').textContent = name;
    showToast('Workspace name saved.', 'success');
});

themeOptions.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.themeOption !== currentTheme) toggleTheme();
}));
