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


    // .note-card is a real <button> now (pages/notes.html), so it's
  // keyboard-focusable and Enter/Space-activatable with zero JS —
  // no more tabindex/role gymnastics, just wire the click
  initNoteCards() {
    document.querySelectorAll('.note-card[data-modal="edit-note"]').forEach(card => {
      card.addEventListener('click', () => Modals.open('edit-note'));
    });

   
  }
};