import {adFormEnabled} from './form-your-advert.js';
import {getAdvertsDescriptionsArray} from './data.js';
import {getAdvert} from './advertisment-generate.js';

const addressField = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const advertsData = getAdvertsDescriptionsArray();

const MAP_START_POSITION = {
  lat: 35.68445,
  lng: 139.75300,
  scale: 13,
};
const COORDINATE_VALUE_ROUND = 5;


const map = L.map('map-canvas')
  .on('load', () => {
    adFormEnabled();
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


function showCoordinates (coordinates) {
  addressField.value = `lat: ${coordinates.lat.toFixed(COORDINATE_VALUE_ROUND)}, lng: ${coordinates.lng.toFixed(COORDINATE_VALUE_ROUND)}`;
}

mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  showCoordinates(coordinates);
});


const advertGroup = L.layerGroup().addTo(map);

const createAdMarker = function (adData) {
  const marker = L.marker({
    lat: adData.location.lat,
    lng: adData.location.lng,
  },
  {
    adMarkerIcon,
  },
  );

  marker
    .addTo(advertGroup)
    .bindPopup(getAdvert(adData));
};

advertsData.forEach((advert) => {
  createAdMarker(advert);
});


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

resetButton.addEventListener('click', resetMap);
