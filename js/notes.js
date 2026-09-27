/**
 * Petal Planner — Notes Page
 */
const Notes = {
  init() {
    this.initFilters();
    this.initNoteCards();

    document.querySelectorAll('[data-modal="new-note"]').forEach(btn => {
      btn.addEventListener('click', () => Modals.open('new-note'));
    });
  },

  initFilters() {
    document.querySelectorAll('.notes-filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.notes-filters button').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        // TODO: once notes come from real data, filter the list here
        // based on btn.textContent (All / Undated / Dated / Urgent / Done)
      });
    });
  },

  initNoteCards() {
    document.querySelectorAll('.note-card[data-modal="edit-note"]').forEach(card => {
      // Make the card keyboard-operable — it's a clickable <div>, not a
      // <button>, so without this a keyboard user can't reach it at all
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');

      card.addEventListener('click', () => Modals.open('edit-note'));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          Modals.open('edit-note');
        }
      });
    });
  }
};