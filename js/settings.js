/**
 * Petal Planner — Settings Page (theme picker lives here)
 */
const Settings = {
  STORAGE_KEY: 'petal-planner-theme',

  init() {
    this.initTheme();
    this.initDangerZone();
  },

  // ===== Theme picker: Cottagecore / Midnight Garden / System =====
  initTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY) || 'system';
    this.applyTheme(saved, /* save */ false);
    this.updatePickerUI(saved);

    document.querySelectorAll('.theme-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.theme; // "cottagecore" | "midnight" | "system"
        this.applyTheme(choice, /* save */ true);
        this.updatePickerUI(choice);
      });
    });

    // If the user picked "System", keep following OS changes live
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const current = localStorage.getItem(this.STORAGE_KEY) || 'system';
      if (current === 'system') {
        this.applyTheme('system', /* save */ false);
      }
    });
  },

  applyTheme(choice, save) {
    const html = document.documentElement;

    if (choice === 'system') {
      // Let variables.css's @media (prefers-color-scheme: dark) block
      // handle it — that block only fires when NO data-theme attribute
      // is set, so we remove it entirely here
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', choice); // "cottagecore" or "midnight"
    }

    if (save) {
      localStorage.setItem(this.STORAGE_KEY, choice);
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
      // Stand-in for real logout — the actual FastAPI build clears the
      // "token" cookie and redirects to /login server-side; this just
      // swaps screens so the mock is navigable
      document.getElementById('app-shell').classList.add('hidden');
      document.getElementById('auth-screen').classList.remove('hidden');
    });
  }
};