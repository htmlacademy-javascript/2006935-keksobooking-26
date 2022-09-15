import {adFormEnabled, filtersFormEnabled} from './form-your-advert.js';
import {getAdvert} from './advertisment-generate.js';
import {getData} from './network.js';
import {onClickResetAllForms} from './form-validation.js';
import {filterAdvertsOnChangeFilterForm} from './filter.js';


const MAP_START_POSITION = {
  lat: 35.68266,
  lng: 139.75277,
  scale: 13,
};
const COORDINATE_VALUE_ROUND = 5;
const SLICE_VALUE = 10;

const addressFieldElement = document.querySelector('#address');


function getDefaultAddress () {
  addressFieldElement.value = `lat: ${MAP_START_POSITION.lat}, lng: ${MAP_START_POSITION.lng}`;
}


function showCoordinates (coordinates) {
  addressFieldElement.value = `lat: ${coordinates.lat.toFixed(COORDINATE_VALUE_ROUND)}, lng: ${coordinates.lng.toFixed(COORDINATE_VALUE_ROUND)}`;
}


const map = L.map('map-canvas')
  .on('load', () => {
    adFormEnabled();
    getDefaultAddress();
    getData(onSuccessDataLoad);
  })
  .setView({
    lat: MAP_START_POSITION.lat,
    lng: MAP_START_POSITION.lng,
  }, MAP_START_POSITION.scale);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const advertGroup = L.layerGroup().addTo(map);


function onSuccessDataLoad (data) {
  const slicedData = data.slice(0, SLICE_VALUE);
  filtersFormEnabled();
  createAdMarker(slicedData);
  filterAdvertsOnChangeFilterForm(data);
  onClickResetAllForms(() => {
    advertGroup.clearLayers();
    createAdMarker(slicedData);
  });
}


const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker (
  {
    lat: MAP_START_POSITION.lat,
    lng: MAP_START_POSITION.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);


const adMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  showCoordinates(coordinates);
});


function createAdMarker (adData) {
  adData
    .forEach((advert) => {
      const marker = L.marker({
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        adMarkerIcon,
      },
      );

      marker
        .addTo(advertGroup)
        .bindPopup(getAdvert(advert));
    });
}


function resetMap () {
  mainMarker.setLatLng({
    lat: MAP_START_POSITION.lat,
    lng: MAP_START_POSITION.lng,
  });

  map.setView({
    lat: MAP_START_POSITION.lat,
    lng: MAP_START_POSITION.lng,
  }, MAP_START_POSITION.scale);
}


export {createAdMarker, resetMap, getDefaultAddress, advertGroup};
