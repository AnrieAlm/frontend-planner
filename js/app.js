/**
 * Petal Planner — Main App Bootstrap
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadComponents();
    await loadPages();
    App.init();
  } catch (err) {
    console.error('Failed to load app:', err);
    document.body.innerHTML =
      '<p style="padding:24px;font-family:sans-serif;">' +
      'Something didn\'t load right. Try refreshing — if this keeps happening, ' +
      'make sure you\'re running a local server (not opening index.html directly).' +
      '</p>';
  }
});

const App = {
  init() {
    EmojiIcons.apply();
    Navigation.init();
    Auth.init();
    Today.init();
    Routine.init();
    Notes.init();
    Calendar.init();
    Habits.init();
    Grocery.init();
    Bucketlist.init();
    Settings.init();
    Modals.init();
    SineadAI.init();
  }
};

/** Fetch and inject HTML partials (sidebar, bottom nav) */
async function loadComponents() {
  const sidebar = document.getElementById('sidebar');
  const bottomNav = document.getElementById('bottom-nav');

  if (sidebar) {
    const res = await fetch('components/sidebar.html');
    sidebar.innerHTML = await res.text();
    NavIcons.apply(sidebar);
  }
  if (bottomNav) {
    const res = await fetch('components/bottom-nav.html');
    bottomNav.innerHTML = await res.text();
    NavIcons.apply(bottomNav);
  }
}

/** Fetch and inject each page's HTML into its <section> */
async function loadPages() {
  const pages = [
    'today', 'routine', 'notes', 'calendar',
    'habits', 'grocery', 'bucketlist', 'settings'
  ];

  for (const name of pages) {
    const el = document.getElementById(`page-${name}`);
    if (el) {
      const res = await fetch(`pages/${name}.html`);
      el.innerHTML = await res.text();
    }
  }

  // Auth page loads separately since it lives outside #app-shell
  const authContainer = document.getElementById('auth-container');
  if (authContainer) {
    const res = await fetch('pages/auth.html');
    authContainer.innerHTML = await res.text();
  }
}