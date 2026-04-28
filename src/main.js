import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      const hits = data.hits;

      if (!hits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#ef4040',
          position: 'topRight',
          messageSize: '16px',
          messageColor: 'white',
        });
        return;
      }

      createGallery(hits);
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong',
      });
    })
    .finally(() => {
      hideLoader();
    });

  event.target.reset();
}
