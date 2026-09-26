const ThemeSwitcher = {
  init() {
    const savedTheme = localStorage.getItem('petal-theme') || 'theme-original-pink';
    this.setTheme(savedTheme);
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.addEventListener('click', () => this.setTheme(btn.dataset.theme));
    });
  },
  setTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem('petal-theme', themeName);
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
  }
};
