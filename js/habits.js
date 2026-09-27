/**
 * Petal Planner — Habits Page
 */
const Habits = {
  init() {
    this.initDayToggles();
    // Note: the "Edit" button doesn't need its own listener here —
    // .habit-card already carries data-modal="edit-habit", so
    // Modals.js's global delegated listener opens it automatically,
    // wherever on the card you click.
  },

  // Each day circle should toggle that day's done state. This was
  // previously inert — no way to log a habit as done from this page
  // at all. Since .habit-card has data-modal="edit-habit", clicking a
  // day circle would otherwise also bubble up and open the edit modal —
  // stopPropagation() prevents that.
  initDayToggles() {
    document.querySelectorAll('.habit-day').forEach(day => {
      day.setAttribute('tabindex', '0');
      day.setAttribute('role', 'button');
      day.setAttribute('aria-pressed', day.classList.contains('done') ? 'true' : 'false');

      const toggle = (e) => {
        e.stopPropagation();
        const isDone = day.classList.toggle('done');
        day.setAttribute('aria-pressed', isDone ? 'true' : 'false');
        // TODO: once backend exists, POST /api/habits/{habit_id}/log here
      };

      day.addEventListener('click', toggle);
      day.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle(e);
        }
      });
    });
  }
};