const calendarGrid = document.querySelector('#calendarGrid');
const calendarTitle = document.querySelector('#calendarTitle');
const eventItems = [...document.querySelectorAll('.event-item')];
let visibleMonth = new Date(2026, 11, 1);

const monthNames = ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];

function renderCalendar() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  calendarTitle.textContent = `${monthNames[month]} ${year}`;
  calendarGrid.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevious = new Date(year, month, 0).getDate();

  for (let i = 0; i < 42; i++) {
    let day;
    let cellMonth = month;
    let cellYear = year;
    if (i < offset) {
      day = daysInPrevious - offset + i + 1;
      cellMonth = month - 1;
    } else if (i >= offset + daysInMonth) {
      day = i - offset - daysInMonth + 1;
      cellMonth = month + 1;
    } else {
      day = i - offset + 1;
    }

    const date = new Date(cellYear, cellMonth, day);
    const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const button = document.createElement('button');
    button.className = 'day';
    button.type = 'button';
    button.setAttribute('role','gridcell');
    button.innerHTML = `<span>${day}</span>`;

    if (i < offset || i >= offset + daysInMonth) button.classList.add('muted');
    if (iso === '2026-12-12') button.classList.add('today');
    if (eventItems.some(item => item.dataset.date === iso)) button.classList.add('has-event');
    button.addEventListener('click', () => {
      document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
      button.classList.add('selected');
      const matchingEvent = eventItems.find(item => item.dataset.date === iso);
      if (matchingEvent) matchingEvent.scrollIntoView({behavior:'smooth', block:'center'});
    });
    calendarGrid.appendChild(button);
  }
}

document.querySelector('#prevMonth').addEventListener('click', () => {visibleMonth.setMonth(visibleMonth.getMonth()-1); renderCalendar();});
document.querySelector('#nextMonth').addEventListener('click', () => {visibleMonth.setMonth(visibleMonth.getMonth()+1); renderCalendar();});
renderCalendar();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const filterButtons = document.querySelectorAll('.gallery-filters button');
const galleryItems = document.querySelectorAll('.gallery-item');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  galleryItems.forEach(item => item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter));
}));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
galleryItems.forEach(item => item.addEventListener('click', () => {
  const image = item.querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = item.dataset.caption;
  lightbox.classList.add('open');
}));
document.querySelector('#closeLightbox').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', event => {if(event.target === lightbox) lightbox.classList.remove('open')});
document.addEventListener('keydown', event => {if(event.key === 'Escape') lightbox.classList.remove('open')});

const suggestionForm = document.querySelector('#suggestionForm');
const formStatus = document.querySelector('#formStatus');
suggestionForm.addEventListener('submit', event => {
  event.preventDefault();
  formStatus.textContent = 'Dziękujemy! Twój pomysł został zapisany.';
  suggestionForm.reset();
  document.querySelector('#anonymous').checked = true;
  setTimeout(() => {formStatus.textContent = '';}, 5000);
});
