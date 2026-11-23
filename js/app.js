import { initCalendar } from './calendar.js';
import { initNavigation } from './navigation.js';
import { initGallery } from './gallery.js';
import { initSuggestionForm } from './suggestion.js';
import { loadPageFragments } from './pageFragments.js';

await loadPageFragments();

initNavigation();
initCalendar();
initGallery();
initSuggestionForm();
