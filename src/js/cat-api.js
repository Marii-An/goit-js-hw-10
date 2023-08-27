import axios from 'axios';
const URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_jBfm0dLH8be72Pn8st9BDXMF1RiWQtwC5yYD3p9DXU6pHEAtl9tcWjR3BM5Dbjmk';
const headers = {
  'x-api-key': API_KEY,
};

function fetchBreeds() {
  return axios
    .get(`${URL}`, { headers })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&include_breeds=true&limit=1`,
      { headers }
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Помилка запиту:', error.message);
    });
}

export { fetchBreeds, fetchCatByBreed };
