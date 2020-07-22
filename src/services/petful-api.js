import config from '../config';

const PetfulApiService = {
  getCats() {
    return fetch(`${config.API_ENDPOINT}/pets/cats/next`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getDogs() {
    return fetch(`${config.API_ENDPOINT}/pets/dogs/next`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getPeople() {
    return fetch(`${config.API_ENDPOINT}/people`).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postPeople(name) {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      header: { 'content-type': 'application/json' },
      body: JSON.stringify(name),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};
export default PetfulApiService;
