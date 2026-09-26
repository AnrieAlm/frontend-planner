const Habits = {
  init() {
    document.querySelectorAll('.habit-card[data-modal="edit-habit"]').forEach(card => {
      card.querySelector('button')?.addEventListener('click', (e) => {
        e.stopPropagation(); Modals.open('edit-habit');
      });
    });
  }
};
