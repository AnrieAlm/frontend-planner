/**
 * Petal Planner — Today Page
 */
const Today = {
  init() {
    const briefingBtn = document.querySelector('.btn-briefing');
    briefingBtn?.addEventListener('click', () => {
      SineadAI.playBriefing();
    });

    // Desktop floating play button — lives in index.html directly since
    // it's visible on every page, not just Today's own content, but the
    // action is identical so it's wired right here alongside it.
    document.getElementById('global-play-fab')?.addEventListener('click', () => {
      SineadAI.playBriefing();
    });

    this.initNudgeActions();
    this.initCarryOverActions();
    this.initDatePicked();
  },

  // Sinéad's proactive nudge ("Add chicken to grocery list?")
  initNudgeActions() {
    document.querySelectorAll('.nudge-actions button').forEach(btn => {
      btn.addEventListener('click', () => {
        const nudge = btn.closest('.sinead-nudge');
        // data-action is more reliable than matching button text —
        // add data-action="accept" / data-action="dismiss" in the HTML
        const action = btn.dataset.action || (btn.textContent.trim() === 'Add it' ? 'accept' : 'dismiss');

        if (action === 'accept') {
          Grocery.addItem('Chicken');
        }
        this.removeWithFade(nudge);
      });
    });
  },

  // "From yesterday" unfinished item — Move to today / New date / Let it go
  initCarryOverActions() {
    document.querySelectorAll('.carry-over-actions button').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.carry-over-item');
        const label = btn.textContent.trim();

        if (label === 'Move to today') {
          // TODO: once backend exists, this sets the note's date to today
          this.removeWithFade(item);
        } else if (label === 'New date') {
          Modals.open('pick-date', { sourceEl: item });
        } else if (label === 'Let it go') {
          this.removeWithFade(item);
        }
      });
    });
  },

  // Fired by Modals when "Set date" is clicked inside modal-pick-date.
  // Only acts when the modal was opened from a carry-over item (see
  // initCarryOverActions above) — picking a new date resolves that
  // item the same way "Move to today"/"Let it go" already do.
  initDatePicked() {
    document.addEventListener('petal:date-picked', (e) => {
      const { sourceEl } = e.detail;
      if (sourceEl?.classList.contains('carry-over-item')) {
        this.removeWithFade(sourceEl);
      }
    });
  },

  // Removes an element after a brief fade, and moves focus somewhere
  // sensible so keyboard users aren't left stranded on a removed element
  removeWithFade(el) {
    if (!el) return;
    const next = el.nextElementSibling || el.previousElementSibling || el.parentElement;
    el.style.transition = 'opacity 0.2s ease';
    el.style.opacity = '0';
    setTimeout(() => {
      el.remove();
      next?.focus?.();
    }, 200);
  }
};