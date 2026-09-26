const Today = {
  init() {
    const briefingBtn = document.querySelector('.btn-briefing');
    briefingBtn?.addEventListener('click', () => { SineadAI.playBriefing(); });
    document.querySelectorAll('.nudge-actions button').forEach(btn => {
      btn.addEventListener('click', () => {
        const nudge = btn.closest('.sinead-nudge');
        if (btn.textContent.trim() === 'Add it') { Grocery.addItem('Chicken'); }
        nudge?.remove();
      });
    });
  }
};
