const Bucketlist = {
  init() {
    document.querySelectorAll('[data-modal="bucket-item"]').forEach(btn => {
      btn.addEventListener('click', () => Modals.open('bucket-item'));
    });
  }
};
