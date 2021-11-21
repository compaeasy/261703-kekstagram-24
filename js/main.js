import { renderPictures } from './picture.js';
import { addOpenHandler } from './big-picture.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { showError } from './notification.js';
import { showFilters, sortMinPictures } from './sort-pictures.js';

getData((pictures) => {
  renderPictures(pictures);
  addOpenHandler(pictures);
  initForm();
  showFilters();
  sortMinPictures(pictures);
}, (error) => {
  showError(error);
},
);


