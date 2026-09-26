document.addEventListener('DOMContentLoaded', async () => {
  // Load Auth Modal
  const authContainer = document.getElementById('auth-container');
  if (authContainer) {
    const res = await fetch('components/landing-auth-modal.html');
    authContainer.innerHTML = await res.text();
  }

  // Load Footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    const res = await fetch('components/landing-footer.html');
    footerContainer.innerHTML = await res.text();
  }
});

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.style.display = 'flex';
}
