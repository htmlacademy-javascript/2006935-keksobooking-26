import {adFormEnabled} from './form-your-advert.js';
import {getAdvertsDescriptionsArray} from './data.js';
import {getAdvert} from './advertisment-generate.js';

const addressFieldElement = document.querySelector('#address');
const resetButtonElement = document.querySelector('.ad-form__reset');
// Нужно ли здесь такое название по критерию? resetButtonElement?
const advertsData = getAdvertsDescriptionsArray();

const MapStartPosition = {
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
    lat: MapStartPosition.lat,
    lng: MapStartPosition.lng,
  }, MapStartPosition.scale);

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
    lat: MapStartPosition.lat,
    lng: MapStartPosition.lng,
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
  addressFieldElement.value = `lat: ${coordinates.lat.toFixed(COORDINATE_VALUE_ROUND)}, lng: ${coordinates.lng.toFixed(COORDINATE_VALUE_ROUND)}`;
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
    lat: MapStartPosition.lat,
    lng: MapStartPosition.lng,
  });

  map.setView({
    lat: MapStartPosition.lat,
    lng: MapStartPosition.lng,
  }, MapStartPosition.scale);
}

resetButtonElement.addEventListener('click', resetMap);
