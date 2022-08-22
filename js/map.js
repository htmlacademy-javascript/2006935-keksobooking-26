import {adFormEnabled} from './form-your-advert.js';
import {getAdvert} from './advertisment-generate.js';

const addressFieldElement = document.querySelector('#address');
// Нужно ли здесь такое название по критерию? resetButtonElement?

const MapStartPosition = {
  lat: 35.68445,
  lng: 139.75300,
  scale: 13,
};
const COORDINATE_VALUE_ROUND = 5;


function getDefaultAddress () {
  addressFieldElement.value = `lat: ${MapStartPosition.lat}, lng: ${MapStartPosition.lng}`;
}


const map = L.map('map-canvas')
  .on('load', () => {
    adFormEnabled();
    getDefaultAddress();
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

function createAdMarker (adData) {
  adData.forEach((advert) => {
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
    lat: MapStartPosition.lat,
    lng: MapStartPosition.lng,
  });

  map.setView({
    lat: MapStartPosition.lat,
    lng: MapStartPosition.lng,
  }, MapStartPosition.scale);

  /* Здесь странно, как будто сначала срабатывает resetMap, затем очищаются все поля формы.
  Так получается, что не могу добавить значение в поле с адресом после нажатия "очистить",
  Зато устанавливаю минимальную задержку, и всё работает. Есть ли способ лучше? Или так задумано в задании?
   */
  setTimeout(() => {
    getDefaultAddress();
  }, 1);
}

export {createAdMarker, resetMap};
