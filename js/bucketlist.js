/**
 * Petal Planner — Bucket List Page
 */
const Bucketlist = {
  init() {
    this.initCategoryTabs();
    this.initItems();
    this.initDoneToggle();

    document.querySelectorAll('[data-modal="bucket-item"]').forEach(btn => {
      btn.addEventListener('click', () => Modals.open('bucket-item'));
    });
  },

  // Tabs filter which .bucket-section is visible. All sections show by
  // default (matches the current mock HTML, which lists all four in a
  // row) — clicking a tab scrolls to and highlights that section, since
  // this is a single scrollable page rather than separate tab panels.
  initCategoryTabs() {
    document.querySelectorAll('.bucket-cat').forEach(tab => {
      tab.setAttribute('tabindex', '0');
      tab.setAttribute('role', 'button');

      const activate = () => {
        document.querySelectorAll('.bucket-cat').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetId = 'section-' + tab.classList[1]?.replace('cat-', '');
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      tab.addEventListener('click', activate);
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  },

  initItems() {
    document.querySelectorAll('.bucket-item').forEach(item => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');

      const open = () => Modals.open('bucket-item-edit', { title: item.querySelector('strong')?.textContent });
      item.addEventListener('click', open);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  },

  // "Collapsible Done shelf" from Section 7 — styled in css/bucketlist.css
  // (.bucket-done-toggle) but had no toggle behaviour at all yet
  initDoneToggle() {
    document.querySelectorAll('.bucket-done-toggle').forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
      const shelf = toggle.nextElementSibling;
      shelf?.classList.add('hidden');

      toggle.addEventListener('click', () => {
        const expanded = toggle.classList.toggle('expanded');
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        shelf?.classList.toggle('hidden', !expanded);
      });
    });
  }
};