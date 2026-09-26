document.addEventListener('DOMContentLoaded', async () => {
  await loadComponents();
  await loadPages();
  App.init();
});
const App = {
  init() {
    ThemeSwitcher.init(); ThemeSwitcher.init(); Navigation.init(); Auth.init(); Today.init(); Routine.init(); Notes.init();
    Calendar.init(); Habits.init(); Grocery.init(); Bucketlist.init(); Settings.init(); Modals.init(); SineadAI.init();
  }
};
async function loadComponents() {
  const sidebar = document.getElementById('sidebar');
  const bottomNav = document.getElementById('bottom-nav');
  if (sidebar) { const res = await fetch('components/sidebar.html'); sidebar.innerHTML = await res.text(); }
  if (bottomNav) { const res = await fetch('components/bottom-nav.html'); bottomNav.innerHTML = await res.text(); }
}
async function loadPages() {
  const pages = ['today', 'routine', 'notes', 'calendar', 'habits', 'grocery', 'bucketlist', 'settings'];
  for (const name of pages) {
    const el = document.getElementById(`page-${name}`);
    if (el) { const res = await fetch(`pages/${name}.html`); el.innerHTML = await res.text(); }
  }
  const authContainer = document.getElementById('auth-container');
  if (authContainer) { const res = await fetch('pages/auth.html'); authContainer.innerHTML = await res.text(); }
}
