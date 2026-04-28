import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.9,
  animationSpeed: 500,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          <div class="info-wrapper">
            <p class="tag-title">Likes <span class="tag-value">${likes}</span></p>
            <p class="tag-title">Views <span class="tag-value">${views}</span></p>
            <p class="tag-title">Comments <span class="tag-value">${comments}</span></p>
            <p class="tag-title">Downloads <span class="tag-value">${downloads}</span></p>
          </div>
        </a>
      </li>
    `
    )
    .join('');

  galleryEl.innerHTML = markup;

  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}
