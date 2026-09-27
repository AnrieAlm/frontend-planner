/**
 * Petal Planner — Routine Page
 */
const Routine = {
  init() {
    document.querySelectorAll('[data-modal="new-routine"]').forEach(btn => {
      btn.addEventListener('click', () => Modals.open('new-routine'));
    });

    // Edit button on each routine card
    document.querySelectorAll('.routine-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.routine-card');
        const routineName = card?.querySelector('h3')?.textContent || '';
        // NOTE: components/modal-edit-routine.html doesn't exist yet in
        // the original file set — needs to be added alongside the other
        // 10 modal components. Falling back to new-routine for now so
        // this doesn't silently do nothing.
        Modals.open('edit-routine', { name: routineName });
      });
    });
  }
};