const Notes = {
  init() {
    document.querySelectorAll('.notes-filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.notes-filters button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    document.querySelectorAll('.note-card[data-modal="edit-note"]').forEach(card => {
      card.addEventListener('click', () => Modals.open('edit-note'));
    });
    document.querySelectorAll('[data-modal="new-note"]').forEach(btn => {
      btn.addEventListener('click', () => Modals.open('new-note'));
    });
  }
};
