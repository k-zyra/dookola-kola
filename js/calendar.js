export function initCalendar() {
  const calendarGrid = document.querySelector('#calendarGrid');
  const calendarTitle = document.querySelector('#calendarTitle');
  const eventItems = [...document.querySelectorAll('.event-item')];
  const prevMonth = document.querySelector('#prevMonth');
  const nextMonth = document.querySelector('#nextMonth');

  if (!calendarGrid || !calendarTitle) return;

  let visibleMonth = new Date(2026, 11, 1);
  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  function renderCalendar() {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const offset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    calendarTitle.textContent = `${monthNames[month]} ${year}`;
    calendarGrid.innerHTML = '';

    for (let index = 0; index < 42; index += 1) {
      let day;
      let cellMonth = month;
      let cellYear = year;

      if (index < offset) {
        day = daysInPreviousMonth - offset + index + 1;
        cellMonth -= 1;
      } else if (index >= offset + daysInMonth) {
        day = index - offset - daysInMonth + 1;
        cellMonth += 1;
      } else {
        day = index - offset + 1;
      }

      const date = new Date(cellYear, cellMonth, day);
      const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const button = document.createElement('button');

      button.className = 'day';
      button.type = 'button';
      button.setAttribute('role', 'gridcell');
      button.innerHTML = `<span>${day}</span>`;

      if (index < offset || index >= offset + daysInMonth) {
        button.classList.add('muted');
      }
      if (isoDate === '2026-12-12') button.classList.add('today');
      if (eventItems.some((item) => item.dataset.date === isoDate)) {
        button.classList.add('has-event');
      }

      button.addEventListener('click', () => {
        document.querySelectorAll('.day.selected').forEach((cell) => cell.classList.remove('selected'));
        button.classList.add('selected');

        const matchingEvent = eventItems.find((item) => item.dataset.date === isoDate);
        matchingEvent?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      calendarGrid.appendChild(button);
    }
  }

  prevMonth?.addEventListener('click', () => {
    visibleMonth.setMonth(visibleMonth.getMonth() - 1);
    renderCalendar();
  });

  nextMonth?.addEventListener('click', () => {
    visibleMonth.setMonth(visibleMonth.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
}
