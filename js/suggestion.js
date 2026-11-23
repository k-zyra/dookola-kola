export function initSuggestionForm() {
  const suggestionForm = document.querySelector('#suggestionForm');
  const formStatus = document.querySelector('#formStatus');
  const anonymousCheckbox = document.querySelector('#anonymous');

  if (!suggestionForm || !formStatus) return;

  suggestionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = 'Dziękujemy! Twój pomysł został zapisany.';
    suggestionForm.reset();

    if (anonymousCheckbox) anonymousCheckbox.checked = true;

    window.setTimeout(() => {
      formStatus.textContent = '';
    }, 5000);
  });
}
