/**
 * Petal Planner — Bucket List Page
 */
const Bucketlist = {
  init() {
    this.initCategoryTabs();
    this.initItems();
    this.initDoneToggle();
    this.initRevealAnimation();
    this.initSliders();

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

        const targetId = 'section-' + tab.dataset.category;
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },

  // Each keepsake (.bucket-keepsake) opens the edit modal on click — the
  // modal itself has the "Mark done" button, so the card's click always
  // opens editing rather than toggling done directly. That keeps a
  // single, unambiguous meaning for "click a keepsake."
  initItems() {
    document.querySelectorAll('.bucket-keepsake').forEach(item => {
      item.addEventListener('click', () => {
        Modals.open('bucket-item-edit', { title: item.querySelector('.bucket-title')?.textContent });
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
  },

  // Each keepsake fades/slides in with a small stagger once the page
  // loads. Items already marked .done (the Done shelf's contents) carry
  // .no-animate in the HTML so they just appear in place instantly
  // instead of replaying the reveal on every visit — they were already
  // "done" before this page load, so there's nothing to animate in.
  initRevealAnimation() {
    const items = document.querySelectorAll('.bucket-keepsake');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    items.forEach((item, i) => {
      if (prefersReduced || item.classList.contains('no-animate')) {
        item.classList.add('revealed');
        return;
      }
      setTimeout(() => item.classList.add('revealed'), 120 * i + 100);
    });
  },

  // Horizontal slider arrow controls for each category's keepsake row.
  // Touch devices never see these buttons at all (see the
  // @media (hover: none) rule in bucketlist.css) — direct swipe is the
  // only interaction there. This just makes the mouse/trackpad arrows
  // that ARE visible actually do something.
  initSliders() {
    document.querySelectorAll('.bucket-keepsake-scroll').forEach((wrap) => {
      const row = wrap.querySelector('.bucket-keepsake-row');
      const prevBtn = wrap.querySelector('.bucket-slider-nav.prev');
      const nextBtn = wrap.querySelector('.bucket-slider-nav.next');
      if (!row || !prevBtn || !nextBtn) return;

      // How far one click should move: one card's width plus the gap
      // between cards, measured from the actual first two items rather
      // than hardcoded, so it stays correct if card sizes ever change.
      function stepDistance() {
        const items = row.querySelectorAll('.bucket-keepsake');
        if (items.length < 1) return row.clientWidth * 0.9;
        const first = items[0].getBoundingClientRect();
        if (items.length < 2) return first.width;
        const second = items[1].getBoundingClientRect();
        return second.left - first.left;
      }

      function scrollByStep(direction) {
        row.scrollBy({ left: direction * stepDistance(), behavior: 'smooth' });
      }

      prevBtn.addEventListener('click', (e) => { e.stopPropagation(); scrollByStep(-1); });
      nextBtn.addEventListener('click', (e) => { e.stopPropagation(); scrollByStep(1); });

      // Hide an arrow when there's nothing left in that direction to
      // scroll to, so people don't click a dead button.
      function updateArrowVisibility() {
        const atStart = row.scrollLeft <= 2;
        const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 2;
        prevBtn.style.display = atStart ? 'none' : 'flex';
        nextBtn.style.display = atEnd ? 'none' : 'flex';
      }

      row.addEventListener('scroll', updateArrowVisibility);
      window.addEventListener('resize', updateArrowVisibility);
      updateArrowVisibility();
    });
  }
};
