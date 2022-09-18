import {debounce} from './util.js';
import {createAdMarker, advertGroup} from './map.js';

const RERENDER_DELAY = 500;
const LOW_PRICE_VALUE = 10000;
const HIGH_PRICE_VALUE = 50000;
const SLICE_VALUE = 10;

const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const housingFeaturesElement = mapFiltersElement.querySelector('#housing-features');


function checkType (advert) {
  return advert.offer.type === housingTypeElement.value || housingTypeElement.value === 'any';
}

function checkRooms (advert) {
  return advert.offer.rooms === Number(housingRoomsElement.value) || housingRoomsElement.value === 'any';
}

function checkGuests (advert) {
  return advert.offer.guests === Number(housingGuestsElement.value) || housingGuestsElement.value === 'any';
}

function getPriceTextValue (advert) {
  if (Number(advert.offer.price) <= LOW_PRICE_VALUE) {
    return 'low';
  }
  if (Number(advert.offer.price) >= HIGH_PRICE_VALUE) {
    return 'high';
  }
  if (Number(advert.offer.price) > LOW_PRICE_VALUE && Number(advert.offer.price) <= HIGH_PRICE_VALUE) {
    return 'middle';
  }
}

function checkPrice (advert) {
  return getPriceTextValue(advert) === housingPriceElement.value || housingPriceElement.value === 'any';
}

function checkFeatures (advert) {
  const checkedFeatures = housingFeaturesElement.querySelectorAll('[type="checkbox"]:checked');
  const checkedFeaturesArray = Array.from(checkedFeatures).map((element) => element.value);
  return checkedFeaturesArray.every((feature) => advert.offer.features && advert.offer.features.includes(feature));
}

function filterDataHandler (adverts) {
  advertGroup.clearLayers();

  const filteredAds = adverts.filter((advert) =>
    checkType(advert) &&
    checkRooms(advert) &&
    checkGuests(advert) &&
    checkPrice(advert) &&
    checkFeatures(advert)
  );

  createAdMarker(filteredAds.slice(0, SLICE_VALUE));
}

function filterAdvertsOnChangeFilterForm (adverts) {
  mapFiltersElement
    .addEventListener('change',
      debounce(() => filterDataHandler(adverts), RERENDER_DELAY,));
}

export{filterAdvertsOnChangeFilterForm};
