/**
 * Petal Planner — Modal System
 */
const Modals = {
  overlay: null,
  content: null,
  lastFocused: null,

  init() {
    this.overlay = document.getElementById('modal-overlay');
    this.content = document.getElementById('modal-content');

    // Close on overlay click (clicking the dark backdrop, not the sheet itself)
    this.overlay?.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Close on the ✕ button, wherever it appears in the loaded modal HTML
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-modal]')) this.close();
    });

    // Escape closes the modal — required by the original design system
    // spec ("Keyboard: Escape closes modal") but never implemented
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
        this.close();
      }
    });

    // Delegated open triggers — anything with data-modal="name" opens
    // that modal. This is what makes .habit-card, .bucket-item, etc.
    // work without each page's JS needing its own listener.
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal]');
      if (trigger) this.open(trigger.dataset.modal);
    });
  },

  // data is optional — e.g. Modals.open('edit-routine', { name: 'Morning weekday' })
  // lets the caller pass context the modal template can use once it's
  // wired to real data. For now it's accepted but not yet consumed.
  async open(modalName, data = null) {
    this.lastFocused = document.activeElement;

    try {
      const res = await fetch(`components/modal-${modalName}.html`);
      if (!res.ok) throw new Error(`Modal "${modalName}" returned ${res.status}`);

      this.content.innerHTML = await res.text();
      this.overlay.classList.remove('hidden');

      // Focus the first input/select/textarea in the modal — required
      // by the design system's "Focus: inputs focused on modal open"
      // rule, previously not implemented
      const firstField = this.content.querySelector('input, select, textarea, button');
      firstField?.focus();

      this.currentData = data;
    } catch (err) {
      console.error(`Couldn't open modal "${modalName}":`, err);
      console.warn(
        `If this is edit-routine or bucket-item-edit, that component file ` +
        `doesn't exist yet — it was flagged as missing in js/routine.js / js/bucketlist.js.`
      );
    }
  },

  close() {
    this.overlay?.classList.add('hidden');
    if (this.content) this.content.innerHTML = '';
    // Return focus to whatever opened the modal, so keyboard users
    // aren't left stranded on a removed element
    this.lastFocused?.focus?.();
  }
};