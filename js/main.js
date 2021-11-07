import { createPictures } from './data.js';
import { renderPictures } from './picture.js';
import { addOpenHandler } from './big-picture.js';

const pictures = createPictures();

renderPictures(pictures);
addOpenHandler(pictures);
