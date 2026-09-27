/**
 * Petal Planner — Settings Page (theme picker lives here)
 */
const Settings = {
  STORAGE_KEY: 'petal-planner-theme',

  init() {
    this.initTheme();
    this.initDangerZone();
  },

  // ===== Theme picker: Cottagecore / Midnight Garden =====
  initTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY) || 'cottagecore';
    this.applyTheme(saved);
    this.updatePickerUI(saved);

    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.theme; // "cottagecore" | "midnight"
        this.applyTheme(choice);
        this.updatePickerUI(choice);
        localStorage.setItem(this.STORAGE_KEY, choice);
      });
    });
  },

  applyTheme(choice) {
    const html = document.documentElement;
    if (choice === 'midnight') {
      html.setAttribute('data-theme', 'midnight');
    } else {
      html.removeAttribute('data-theme'); // Cottagecore is the unconditional default
    }
  },

  updatePickerUI(activeChoice) {
    document.querySelectorAll('.theme-option').forEach(btn => {
      const isActive = btn.dataset.theme === activeChoice;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  },

  // ===== Sign out / delete account =====
  initDangerZone() {
    const deleteBtn = document.querySelector('[data-modal="delete-account"]');
    deleteBtn?.addEventListener('click', () => Modals.open('delete-account'));

    const signoutBtn = document.querySelector('.btn-signout');
    signoutBtn?.addEventListener('click', () => {
      document.getElementById('app-shell').classList.add('hidden');
      document.getElementById('auth-screen').classList.remove('hidden');
    });
  }
};