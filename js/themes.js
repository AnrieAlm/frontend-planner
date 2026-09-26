const Themes = {
  init() {
    const savedTheme = localStorage.getItem('petal-theme') || 'cottage';
    this.applyTheme(savedTheme);
    document.querySelectorAll('[data-theme-select]').forEach(el => {
      el.addEventListener('click', () => {
        const theme = el.dataset.themeSelect;
        this.applyTheme(theme);
        localStorage.setItem('petal-theme', theme);
      });
    });
  },
  applyTheme(themeName) {
    document.body.removeAttribute('data-theme');
    if (themeName !== 'cottage') {
      document.body.setAttribute('data-theme', themeName);
    }
    document.querySelectorAll('[data-theme-select]').forEach(el => {
      el.classList.toggle('active', el.dataset.themeSelect === themeName);
    });
    document.querySelectorAll('.theme-card').forEach(card => {
      card.classList.toggle('active', card.dataset.themeSelect === themeName);
    });
  }
};
