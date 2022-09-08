const advertCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const housingTypeElements = {
  house: 'Дом',
  hotel: 'Отель',
  palace: 'Дворец',
  flat: 'Квартира',
  bungalow: 'Бунгало',
};


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
  if (advertObject.offer.features) {
    featuresList.forEach((featureItem) => {
      const isNecessary = advertObject.offer.features.some(
        (feature) => featureItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!isNecessary) {
        featureItem.remove();
      }
    });
  } else {
    features.innerHTML = '';
  }

}


function getPhotos (templateCopy, advertObject) {
  const photos = templateCopy.querySelector('.popup__photos');
  photos.innerHTML = '';
  if (advertObject.offer.photos) {
    advertObject.offer.photos.forEach((housingPhoto) => {
      const photoItem = `<img src="${housingPhoto}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
      photos.insertAdjacentHTML('beforeend', photoItem);
    });
  } else {
    photos.innerHTML = '';
  }
}


function getAdvert (data) {
  const drawAdverts = document.createElement('div');
  const advertCard = advertCardTemplate.cloneNode(true);

  advertCard.querySelector('.popup__title').textContent = data.offer.title || '';
  advertCard.querySelector('.popup__text--address').textContent = data.offer.address || '';
  advertCard.querySelector('.popup__text--price').textContent = (data.offer.price) ? `${data.offer.price} ₽/ночь` : '';
  advertCard.querySelector('.popup__type').textContent = housingTypeElements[data.offer.type];
  advertCard.querySelector('.popup__text--capacity').textContent = getCorrectCapacity(data.offer.rooms, data.offer.guests);
  advertCard.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  getNeededFeatures(advertCard, data);
  advertCard.querySelector('.popup__description').textContent = data.offer.description || '';
  getPhotos(advertCard, data);

  advertCard.querySelector('.popup__avatar').src = data.author.avatar;

  drawAdverts.appendChild(advertCard);

  return drawAdverts;
}

export {getAdvert};
