const Auth = {
  isSignUp: false,
  init() {
    const form = document.getElementById('auth-form');
    const toggle = document.getElementById('auth-toggle-link');
    const submit = document.getElementById('auth-submit');
    if (!form) return;
    toggle?.addEventListener('click', (e) => {
      e.preventDefault(); this.isSignUp = !this.isSignUp;
      submit.textContent = this.isSignUp ? 'Create account' : 'Sign in';
      toggle.textContent = this.isSignUp ? 'Sign in' : 'Create account';
    });
    form.addEventListener('submit', (e) => { e.preventDefault(); this.login(); });
  },
  login() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app-shell').classList.remove('hidden');
  }
};
