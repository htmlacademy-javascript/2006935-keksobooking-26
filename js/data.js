import {getRandomInteger, getRandomNumber} from './util.js';

const QUANTITY_ADVERT_NEARBY = 10;
const TITLES = [
  'Любой каприз за ваши деньги',
  'Скромные радости',
  'Ранее проживала бабушка с кошками (точное количество неизвестно, но кошек было очень много), и они были приучены к туалету',
  'Балкон утепленный, с мебелью',
  'Не выходи из комнаты, не совершай ошибку.',
  'Для стрессоустойчивых',
  'Все девушки выходят из неё замуж, максимум черех полгода',
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const DESCRIPTIONS = [
  'Уголовная квартира с толстыми стенами',
  'Комнаты смежные, можно изолировать через встроенный шкаф',
  'Балкона нет и не будет',
  'С любовью к своей квартире. Белки в 150 метрах от подъезда - это Вам не фунт изюму',
  'Ловится халявный вай-фай',
];
const FEATURES_EXAMPLE = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//Функция создания случайного массива неповторяющихся значений.

function generateArrayRandomNumbers (maxArrayValue) {
  const randomArray = [];
  while (randomArray.length < maxArrayValue) {
    const randomNumber = getRandomInteger(1, maxArrayValue);
    if (randomArray.indexOf(randomNumber) === -1) {
      randomArray.push(randomNumber);
    }
  }
  return randomArray;
}

//Функция получения случайного элемента массива.

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}


function getRandomArrayFromData (dataArray) {
  const randomArrayFromData = [];
  for (let i = 0; i < dataArray.length; i++) {
    const randomElement = getRandomArrayElement(dataArray);
    if (randomArrayFromData.indexOf(randomElement) === -1) {
      randomArrayFromData.push(randomElement);
    }
  }
  return randomArrayFromData;
}


function generateAuthor () {
  const author = {};
  const randomValuesArray = generateArrayRandomNumbers(QUANTITY_ADVERT_NEARBY);
  let randomElement = getRandomArrayElement(randomValuesArray);
  if (randomElement < 10) {
    randomElement = `0${randomElement}`;
  }
  author.avatar = `img/avatars/user${randomElement}.png`;
  return author;
}


function generateLocation () {
  const LATITUDE_TOKIO_FROM = 35.65000;
  const LATITUDE_TOKIO_TO = 35.70000;
  const LONGITUDE_TOKIO_FROM = 139.70000;
  const LONGITUDE_TOKIO_TO = 139.80000;
  const DECIMAL_PLACES = 5;
  const location = {};
  location.lat = getRandomNumber(LATITUDE_TOKIO_FROM, LATITUDE_TOKIO_TO, DECIMAL_PLACES);
  location.lng = getRandomNumber(LONGITUDE_TOKIO_FROM, LONGITUDE_TOKIO_TO, DECIMAL_PLACES);
  return location;
}


function generateOffer (CoordinatesObjectLat, CoordinatesObjectLng) {
  const offer = {};
  offer.title = getRandomArrayElement(TITLES);
  offer.address = `${CoordinatesObjectLat}, ${CoordinatesObjectLng}`;
  offer.price = getRandomInteger(0, 10000);
  offer.type = getRandomArrayElement(TYPES);
  offer.rooms = getRandomInteger(1, 5);
  offer.guests = getRandomInteger(1, 10);
  offer.checkin = getRandomArrayElement(TIMES);
  offer.checkout = getRandomArrayElement(TIMES);
  offer.features = getRandomArrayFromData(FEATURES_EXAMPLE);
  offer.description = getRandomArrayElement(DESCRIPTIONS);
  offer.photos = getRandomArrayFromData(PHOTOS);
  return offer;
}


function createSimilarAdvertDescription () {
  const coordinates = generateLocation();
  return {
    author: generateAuthor(),
    offer:  generateOffer(coordinates.lat, coordinates.lng),
    location:  coordinates,
  };
}


function getAdvertsDescriptionsArray () {
  const advertsDescriptions = [];
  for (let i = 0; i < QUANTITY_ADVERT_NEARBY; i++) {
    advertsDescriptions.push(createSimilarAdvertDescription());
  }
  return advertsDescriptions;
}
// console.log(getAdvertsDescriptionsArray());

export {getAdvertsDescriptionsArray};
