import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

axios.defaults.headers.common['x-api-key'] =
  'live_jBfm0dLH8be72Pn8st9BDXMF1RiWQtwC5yYD3p9DXU6pHEAtl9tcWjR3BM5Dbjmk';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loaderMessage: document.querySelector('.loader'),
  errorMessage: document.querySelector('.error'),
  catInfoDiv: document.querySelector('.cat-info'),
};

function catSelector() {
  elements.loaderMessage.classList.remove('is-hidden');
  elements.breedSelect.classList.add('is-hidden');
  elements.errorMessage.classList.add('is-hidden');

  fetchBreeds()
    .then(data => {
      const catCard = data
        .map(({ id, name }) => ` <option value="${id}">${name}</option>`)
        .join(' ');

      elements.breedSelect.innerHTML = catCard;

      new SlimSelect({
        select: elements.breedSelect,
      });

      elements.loaderMessage.classList.add('is-hidden');
      elements.breedSelect.classList.remove('is-hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
catSelector();

elements.breedSelect.addEventListener('change', onClick);

function onClick(event) {
  elements.loaderMessage.classList.remove('is-hidden');
  elements.breedSelect.classList.add('is-hidden');

  const selectCatId = event.currentTarget.value;

  fetchCatByBreed(selectCatId)
    .then(data => {
      markupCatCard(data);
      elements.loaderMessage.classList.add('is-hidden');
      elements.breedSelect.classList.remove('is-hidden');
    })
    .catch(error => {
      elements.loaderMessage.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      elements.catInfoDiv.innerHTML = '';
    });
}

function markupCatCard(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catCard = `<img class="cat-img" src="${url}" alt="${name}"> <div class="text-part">
  <h2 class="cat-name">${name}</h2>
  <p class="cat-description">${description}</p>
  <p class="cat-temperament"><span">Temperament:</span> ${temperament}</p>  </div>`;

  elements.catInfoDiv.innerHTML = catCard;
}
