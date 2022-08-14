import {getAdvertsDescriptionsArray} from './data.js';


const mapCanvas = document.querySelector('#map-canvas');
const advertCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


// Тут согласен, красивое решение. Первый раз разбирался с объектом как с библиотекой)
function compareHousingType (houseType) {
  const housingTypes = {
    house: 'Дом',
    hotel: 'Отель',
    palace: 'Дворец',
    flat: 'Квартира',
    bungalow: 'Бунгало',
  };
  return housingTypes[houseType];
}


function getCorrectCapacity (quantityRooms, quantityGuests) {
  let livingSpaceName;
  let tenantName;
  if (quantityRooms === 1) {
    livingSpaceName = 'комната';
  } else if (quantityRooms > 1 && quantityRooms < 5) {
    livingSpaceName = 'комнаты';
  } else if (quantityRooms >= 5) {
    livingSpaceName = 'комнат';
  }
  if (quantityGuests === 1) {
    tenantName = 'гостя';
  } else {
    tenantName = 'гостей';
  }
  // Сделал эту штуку, чтобы предусмотреть варианты, когда отсутствуют данные, как сказано в техзадании. Если пойму, что не нужна, то удалю))
  if (quantityRooms === '' && quantityGuests === '') {
    return '';
  } else if (quantityGuests === '') {
    return `${quantityRooms} ${livingSpaceName}`;
  } else if (quantityRooms === '') {
    return `Для ${quantityGuests} ${tenantName}`;
  }
  return `${quantityRooms} ${livingSpaceName} для ${quantityGuests} ${tenantName}`;
}


function getNeededFeatures (templateCopy, advertObject) {
  const features = templateCopy.querySelector('.popup__features');
  const featuresList = features.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    const isNecessary = advertObject.offer.features.some(
      (feature) => featureItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      featureItem.remove();
    }
  });
}


function getPhotos (templateCopy, advertObject) {
  const photos = templateCopy.querySelector('.popup__photos');
  photos.innerHTML = '';
  advertObject.offer.photos.forEach((housingPhoto) => {
    const photoItem = `<img src="${housingPhoto}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    photos.insertAdjacentHTML('beforeend', photoItem);
  });

}


const advertsData = getAdvertsDescriptionsArray();

const drawAdverts = document.createDocumentFragment();

advertsData.forEach((element) => {
  const advertCard = advertCardTemplate.cloneNode(true);
  advertCard.querySelector('.popup__title').textContent = element.offer.title || '';
  advertCard.querySelector('.popup__text--address').textContent = element.offer.address || '';
  advertCard.querySelector('.popup__text--price').textContent = (element.offer.price) ? `${element.offer.price} ₽/ночь` : '';
  advertCard.querySelector('.popup__type').textContent = compareHousingType(element.offer.type);
  advertCard.querySelector('.popup__text--capacity').textContent = getCorrectCapacity(element.offer.rooms, element.offer.guests);
  advertCard.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  getNeededFeatures(advertCard, element);
  advertCard.querySelector('.popup__description').textContent = element.offer.description || '';
  getPhotos(advertCard, element);

  advertCard.querySelector('.popup__avatar').src = element.author.avatar;

  drawAdverts.appendChild(advertCard);
});
mapCanvas.appendChild(drawAdverts.firstChild);
