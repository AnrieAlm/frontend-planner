const Routine = {
  init() {
    document.querySelectorAll('[data-modal="new-routine"]').forEach(btn => {
      btn.addEventListener('click', () => Modals.open('new-routine'));
    });
  }
};
