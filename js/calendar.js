const Calendar = {
  init() {
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('today'));
        day.classList.add('today');
      });
    });
  }
};
