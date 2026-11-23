export function initGallery() {
  const filterButtons = document.querySelectorAll('.gallery-filters button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightboxImage');
  const lightboxCaption = document.querySelector('#lightboxCaption');
  const closeLightbox = document.querySelector('#closeLightbox');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      galleryItems.forEach((item) => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });

  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const image = item.querySelector('img');
      if (!image) return;

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = item.dataset.caption || '';
      lightbox.classList.add('open');
    });
  });

  closeLightbox?.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.classList.remove('open');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') lightbox.classList.remove('open');
  });
}
