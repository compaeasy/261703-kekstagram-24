import { createPictures } from './data.js';
import { renderPictures } from './picture.js';
import { addOpenHandler } from './big-picture.js';
import { initForm } from './form.js';

const pictures = createPictures();

renderPictures(pictures);
addOpenHandler(pictures);
initForm();
