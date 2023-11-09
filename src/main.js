import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { GalleryApi } from './js/galleryApi';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const spinner = document.querySelector('.spinner');

const galleryApi = new GalleryApi();

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', fetchPhotos);

if (galleryApi.query === '') {
  hideButton();
  spinnerOff();
  disableButton();
  galleryList.innerHTML = '';
}

async function onSubmit(event) {
  event.preventDefault();

  galleryApi.query = event.target.elements.query.value;

  if (galleryApi.query === '') {
    hideButton();
    disableButton();
    galleryList.innerHTML = '';
    displayWarningToast('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  galleryList.innerHTML = '';
  galleryApi.resetPage();
  await fetchPhotos();
}

async function fetchPhotos() {
  showButton();
  spinnerOn();
  disableButton();

  try {
    const photo = await galleryApi.fetchPhotos();

    if (photo.totalHits === 0) {
      hideButton();
      displayErrorToast('Sorry, there are no images matching your search query. Please try again.');
    }

    if (galleryApi.page === 2) {
      displaySuccessToast(`Hooray! We found ${photo.totalHits} images.`);
    }

    if ((galleryApi.page - 1) * galleryApi.perPage >= photo.totalHits) {
      hideButton();
      displayInfoToast("We're sorry, but you've reached the end of search results.");
    }

    const markup = createGalleryCard(photo.hits);
    galleryList.insertAdjacentHTML('beforeend', markup);
    const modal = new SimpleLightbox('.gallery a');
  } catch (error) {
    displayErrorToast(`${error.message}`);
  } finally {
    spinnerOff();
    enableButton();
  }
}

function createGalleryCard(photos) {
  return photos.map(({ largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads, }) => {
    return `
    <div class="photo-card">
      <a class="card_link" href="${largeImageURL}">
        <img class="card_img" src="${largeImageURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes<br>${likes}</b>
        </p>
        <p class="info-item">
          <b>Views<br>${views}</b>
        </p>
        <p class="info-item">
          <b>Comments<br>${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads<br>${downloads}</b>
        </p>
      </div>
    </div>`;
  })
}

function showButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideButton() {
  loadMoreBtn.classList.add('is-hidden');
  loadMoreBtn.innerHTML = '';
}

function enableButton() {
  loadMoreBtn.removeAttribute('disabled');
  loadMoreBtn.innerHTML = 'Load more';
}

function disableButton() {
  loadMoreBtn.setAttribute('disabled', 'true');
  loadMoreBtn.innerHTML = 'Loading';
}

function spinnerOn() {
  spinner.classList.remove('is-hidden');
}

function spinnerOff() {
  spinner.classList.add('is-hidden');
}

function displayWarningToast(message) {
  iziToast.warning({
    title: 'Warning',
    message: message,
    position: 'topRight',
    color: 'yellow',
  });
}

function displayErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    color: 'red',
  });
}

function displaySuccessToast(message) {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
    color: 'green',
  });
}

function displayInfoToast(message) {
  iziToast.info({
    title: 'Info',
    message: message,
    position: 'topRight',
    color: 'blue',
  });
}