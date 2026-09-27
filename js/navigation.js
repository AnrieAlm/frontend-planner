/**
 * Petal Planner — Page Navigation
 */
const Navigation = {
  init() {
    // Delegated on document, not bound per-element at startup — this is
    // required because [data-page] links inside components loaded later
    // (like the "More" sheet, fetched on demand) don't exist in the DOM
    // yet when init() runs, so a per-element listener would miss them.
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-page]');
      if (link) {
        e.preventDefault();
        this.goTo(link.dataset.page);
      }
    });
  },

  goTo(pageName) {
    document.querySelectorAll('.page').forEach(p => {
      p.classList.add('hidden');
      p.classList.remove('active');
    });

    const target = document.getElementById(`page-${pageName}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('active');
    }

    document.querySelectorAll('[data-page]').forEach(link => {
      const isActive = link.dataset.page === pageName;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
};