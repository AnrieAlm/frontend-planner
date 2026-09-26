const Grocery = {
  init() {
    document.querySelectorAll('[data-modal="grocery-item"]').forEach(btn => {
      btn.addEventListener('click', () => Modals.open('grocery-item'));
    });
    document.querySelectorAll('.grocery-item input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => { cb.closest('.grocery-item').classList.toggle('checked', cb.checked); });
    });
  },
  addItem(name) {
    const list = document.querySelector('.grocery-list');
    if (!list) return;
    const label = document.createElement('label');
    label.className = 'grocery-item';
    label.innerHTML = `<input type="checkbox" /> ${name}`;
    list.appendChild(label);
  }
};
