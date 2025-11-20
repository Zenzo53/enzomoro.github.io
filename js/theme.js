// Theme Toggle: Dark/Light Mode
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    // Apply saved theme on load
    this.applyTheme(this.currentTheme);

    // Setup toggle button listener
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleTheme());
      this.updateToggleButton(toggleButton);
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);

    // Update toggle button if it exists
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      this.updateToggleButton(toggleButton);
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  updateToggleButton(button) {
    const icon = button.querySelector('.theme-icon');
    const text = button.querySelector('.theme-text');

    if (this.currentTheme === 'dark') {
      icon.textContent = '☀️';
      if (text) text.textContent = 'Light';
      button.setAttribute('aria-label', 'Switch to light mode');
    } else {
      icon.textContent = '🌙';
      if (text) text.textContent = 'Dark';
      button.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
