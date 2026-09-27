/**
 * Petal Planner — Page Navigation
 */
const Navigation = {
  init() {
    // Sidebar links + bottom nav items both use [data-page]
    document.querySelectorAll('[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.goTo(link.dataset.page);
      });
    });
  },

  goTo(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
      p.classList.add('hidden');
      p.classList.remove('active');
    });

    // Show target page
    const target = document.getElementById(`page-${pageName}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('active');
    }

    // Update active state on every nav link that points at this page
    // (sidebar link AND bottom-nav item both get updated, since both
    // use the same [data-page] attribute)
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