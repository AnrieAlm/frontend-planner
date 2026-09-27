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

      day.addEventListener('click', () => this.selectDay(day));
      day.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectDay(day);
        }
      });
    });
  },

  // Selecting a day updates which day is highlighted as "selected" and
  // refreshes the detail panel — it does NOT move .today, which marks
  // the actual current date and should never change on click
  selectDay(day) {
    document.querySelectorAll('.calendar-day.selected').forEach(d => {
      d.classList.remove('selected');
      d.removeAttribute('aria-current');
    });
    day.classList.add('selected');
    day.setAttribute('aria-current', 'date');
    this.selectedDay = day.textContent.trim();

    // TODO: once notes/events come from real data, look up this day's
    // events/habits here and rebuild .calendar-day-detail's contents
  }
};