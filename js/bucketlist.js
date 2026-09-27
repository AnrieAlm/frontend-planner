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
  // .bucket-cat is a real <button role="tab"> now, so it's already
  // keyboard-focusable and Enter/Space-activatable with zero JS.
  initCategoryTabs() {
    document.querySelectorAll('.bucket-cat').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.bucket-cat').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // data-category instead of classList[1] — no longer breaks if
        // the category class ever moves position in the class list
        const targetId = 'section-' + tab.dataset.category;
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },

  // .bucket-item is a real <button> now too — same reasoning, no more
  // tabindex/role/keydown needed
  initItems() {
    document.querySelectorAll('.bucket-item').forEach(item => {
      item.addEventListener('click', () => {
        Modals.open('bucket-item-edit', { title: item.querySelector('strong')?.textContent });
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