const Navigation = {
  init() {
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => { e.preventDefault(); this.goTo(link.dataset.page); });
    });
  },
  goTo(pageName) {
    document.querySelectorAll('.page').forEach(p => { p.classList.add('hidden'); p.classList.remove('active'); });
    const target = document.getElementById(`page-${pageName}`);
    if (target) { target.classList.remove('hidden'); target.classList.add('active'); }
    document.querySelectorAll('[data-page]').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });
  }
};
