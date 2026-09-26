const Modals = {
  overlay: null, content: null,
  init() {
    this.overlay = document.getElementById('modal-overlay');
    this.content = document.getElementById('modal-content');
    this.overlay?.addEventListener('click', (e) => { if (e.target === this.overlay) this.close(); });
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-modal]')) this.close();
      const trigger = e.target.closest('[data-modal]');
      if (trigger) this.open(trigger.dataset.modal);
    });
  },
  async open(modalName) {
    try {
      const res = await fetch(`components/modal-${modalName}.html`);
      this.content.innerHTML = await res.text();
      this.overlay.classList.remove('hidden');
    } catch (err) { console.error(`Modal "${modalName}" not found`, err); }
  },
  close() {
    this.overlay?.classList.add('hidden');
    if (this.content) this.content.innerHTML = '';
  }
};
