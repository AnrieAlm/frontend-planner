const Settings = {
  init() {
    const deleteBtn = document.querySelector('[data-modal="delete-account"]');
    deleteBtn?.addEventListener('click', () => Modals.open('delete-account'));
    const signoutBtn = document.querySelector('.btn-signout');
    signoutBtn?.addEventListener('click', () => {
      document.getElementById('app-shell').classList.add('hidden');
      document.getElementById('auth-screen').classList.remove('hidden');
    });
  }
};
