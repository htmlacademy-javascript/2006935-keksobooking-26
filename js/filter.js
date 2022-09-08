import {debounce, getSlicedData} from './util.js';
import {createAdMarker, advertGroup} from './map.js';

const RERENDER_DELAY = 500;

const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');
const housingFeaturesElement = mapFiltersElement.querySelector('#housing-features');
const featuresWifiElement = housingFeaturesElement.querySelector('#filter-wifi');
const featuresDishwasherElement = housingFeaturesElement.querySelector('#filter-dishwasher');
const featuresParkingElement = housingFeaturesElement.querySelector('#filter-parking');
const featuresWasherElement = housingFeaturesElement.querySelector('#filter-washer');
const featuresElevatorElement = housingFeaturesElement.querySelector('#filter-elevator');
const featuresConditionerElement = housingFeaturesElement.querySelector('#filter-conditioner');


function filterType (adverts) {
  if (housingTypeElement.value !== 'any'){
    return adverts.filter((advert) => advert.offer.type === housingTypeElement.value);
  } else {
    return adverts;
  }
}

function filterPrice (adverts) {
  if (housingPriceElement.value === 'middle') {
    return adverts.filter((advert) => advert.offer.price >= 10000 && advert.offer.price <= 50000);
  }
  if (housingPriceElement.value === 'low') {
    return adverts.filter((advert) => advert.offer.price <= 10000);
  }
  if (housingPriceElement.value === 'high') {
    return adverts.filter((advert) => advert.offer.price  >= 50000);
  } else {
    return adverts;
  }
}

function filterRooms (adverts) {
  if (housingRoomsElement.value === '1') {
    return adverts.filter((advert) => advert.offer.rooms === 1);
  }
  if (housingRoomsElement.value === '2') {
    return adverts.filter((advert) => advert.offer.rooms === 2);
  }
  if (housingRoomsElement.value === '3') {
    return adverts.filter((advert) => advert.offer.rooms === 3);
  } else {
    return adverts;
  }
}

function filterGuests (adverts) {
  if (housingGuestsElement.value === '2') {
    return adverts.filter((advert) => advert.offer.guests === 2);
  }
  if (housingGuestsElement.value === '1') {
    return adverts.filter((advert) => advert.offer.guests === 1);
  }
  if (housingGuestsElement.value === '0') {
    return adverts.filter((advert) => advert.offer.guests === 0);
  } else {
    return adverts;
  }
}

function filterFeature (adverts, featureElement, featureName) {
  if (featureElement.checked) {
    return adverts.filter((advert) => {
      if (advert.offer.features) {
        return advert.offer.features.includes(featureName);
      }
    });
  }
  return adverts;
}


function filterDataHandler (data) {
  advertGroup.clearLayers();
  let newData = [];
  newData = filterType(data);
  newData = filterPrice(newData);
  newData = filterRooms(newData);
  newData = filterGuests(newData);
  newData = filterFeature(newData, featuresWifiElement, 'wifi');
  newData = filterFeature(newData, featuresDishwasherElement, 'dishwasher');
  newData = filterFeature(newData, featuresParkingElement, 'parking');
  newData = filterFeature(newData, featuresWasherElement, 'washer');
  newData = filterFeature(newData, featuresElevatorElement, 'elevator');
  newData = filterFeature(newData, featuresConditionerElement, 'conditioner');
  newData = getSlicedData(newData);
  createAdMarker(newData);
}

function filterAdvertsOnChangeFilterForm (adverts) {
  mapFiltersElement
    .addEventListener('change', debounce(
      () => filterDataHandler(adverts),
      RERENDER_DELAY,
    ));
}

export{filterAdvertsOnChangeFilterForm};
