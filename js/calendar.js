/**
 * Petal Planner — Calendar Page
 */
const Calendar = {
  selectedDay: null,

  init() {
    document.querySelectorAll('.calendar-day:not(:empty)').forEach(day => {
      // Keyboard-operable, same reasoning as note cards
      day.setAttribute('tabindex', '0');
      day.setAttribute('role', 'button');
      day.setAttribute('aria-pressed', 'false');

      day.addEventListener('click', () => this.selectDay(day));
      day.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectDay(day);
        }
      });
    });
  },

  // Selecting a day updates which day is highlighted and refreshes the
  // detail panel. aria-current="date" is reserved for the real current
  // date — it's set once, statically, on .today in pages/calendar.html,
  // and this function never touches it. aria-pressed marks selection
  // instead, so today and "the day you clicked" can't collide.
  selectDay(day) {
    document.querySelectorAll('.calendar-day.selected').forEach(d => {
      d.classList.remove('selected');
      d.setAttribute('aria-pressed', 'false');
    });
    day.classList.add('selected');
    day.setAttribute('aria-pressed', 'true');
    this.selectedDay = day.textContent.trim();

    // TODO: once notes/events come from real data, look up this day's
    // events/habits here and rebuild .calendar-day-detail's contents
  }
};