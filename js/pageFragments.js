export async function loadPageFragments() {
  const fragments = document.querySelectorAll('[data-fragment]');

  await Promise.all([...fragments].map(async (placeholder) => {
    const fragmentPath = placeholder.dataset.fragment;

    try {
      const response = await fetch(fragmentPath);
      if (!response.ok) {
        throw new Error(`Nie udało się pobrać: ${fragmentPath}`);
      }

      placeholder.outerHTML = await response.text();
    } catch (error) {
      console.error(error);
      placeholder.innerHTML = '<p>Nie udało się załadować sekcji strony.</p>';
    }
  }));
}
