import {resetMap, getDefaultAddress} from './map.js';
import {sendData} from './network.js';
import {setSuccessMessage, setErrorMessage, blockSubmitButton, unblockSubmitButton} from './submit-settings.js';
import{defaultImagesElements} from './pictures.js';


const ADVERT_TITLE_MIN_LENGTH = 30;
const ADVERT_TITLE_MAX_LENGTH = 100;
const MAX_PRICE = 100000;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const GUESTS_DISTRIBUTION_VALUE_ARRAY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

const adFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const adTitleElement = adFormElement.querySelector('#title');
const adPriceElement = adFormElement.querySelector('#price');
const housingTypeElement = adFormElement.querySelector('#type');
const registrationTimeElement = adFormElement.querySelector('.ad-form__element--time');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const priceSliderElement = adFormElement.querySelector('.ad-form__slider');
const resetButtonElement = document.querySelector('.ad-form__reset');


const SliderSettings = {
  BUNGALOW: {
    range: {
      min: [0, 10],
      '80%': [20000, 100],
      max: MAX_PRICE,
    },
    start: MIN_PRICE.bungalow,
  },
  FLAT: {
    range: {
      min: [0, 100],
      '80%': [30000, 500],
      max: MAX_PRICE,
    },
    start: MIN_PRICE.flat,
  },
  HOUSE: {
    range: {
      min: [0, 500],
      '80%': [40000, 500],
      max: MAX_PRICE,
    },
    start: MIN_PRICE.hotel,
  },
  HOTEL: {
    range: {
      min: [0, 500],
      '80%': [50000, 500],
      max: MAX_PRICE,
    },
    start: MIN_PRICE.house,
  },
  PALACE: {
    range: {
      min: [0, 500],
      '80%': [60000, 1000],
      max: MAX_PRICE,
    },
    start: MIN_PRICE.palace,
  }
};


const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__element--error'
});


function validateadTitleElement (value) {
  return value.length >= ADVERT_TITLE_MIN_LENGTH && value.length <= ADVERT_TITLE_MAX_LENGTH;
}

pristine.addValidator(
  adTitleElement,
  validateadTitleElement,
  `Должно быть не менее ${ADVERT_TITLE_MIN_LENGTH} и не более ${ADVERT_TITLE_MAX_LENGTH} символов`
);


function validateadPriceElement (value) {
  return value <= MAX_PRICE;
}

pristine.addValidator(
  adPriceElement,
  validateadPriceElement,
  `Не дороже ${MAX_PRICE} кексотугриков`
);

function validatePrice (value) {
  return MIN_PRICE[housingTypeElement.value] <= value;
}

function getValidationMessage () {
  return `Не меньше ${MIN_PRICE[housingTypeElement.value]} кексотугриков`;
}

pristine.addValidator(
  adPriceElement,
  validatePrice,
  getValidationMessage
);


function checkTime (evt) {
  if (evt.target.name === 'timein') {
    timeOutElement.value = timeInElement.value;
  } else if (evt.target.name === 'timeout'){
    timeInElement.value = timeOutElement.value;
  }
}
registrationTimeElement.addEventListener('change', checkTime);


function validateGuestsDistribution () {
  return GUESTS_DISTRIBUTION_VALUE_ARRAY[roomNumberElement.value].includes(capacityElement.value);
}

pristine.addValidator(roomNumberElement, validateGuestsDistribution, 'Не подходит для такого количества гостей');
pristine.addValidator(capacityElement, validateGuestsDistribution, 'Столько гостей нельзя поселить в такое количество комнат');


noUiSlider.create(priceSliderElement, {
  range: {
    min: [0, 100],
    '80%': [10000, 500],
    max: MAX_PRICE,
  },
  start: MIN_PRICE.flat,
  connect: 'lower',
});

priceSliderElement.noUiSlider.on('update', () => {
  adPriceElement.value = Number(priceSliderElement.noUiSlider.get());
});
adPriceElement.addEventListener('change', () => {
  priceSliderElement.noUiSlider.set(adPriceElement.value);
});

function onHousingTypeElementChange () {
  adPriceElement.placeholder = MIN_PRICE[housingTypeElement.value];

  switch (housingTypeElement.value){
    case 'bungalow':
      priceSliderElement.noUiSlider.updateOptions(SliderSettings.BUNGALOW);
      break;

    case 'flat':
      priceSliderElement.noUiSlider.updateOptions(SliderSettings.FLAT);
      break;

    case 'hotel':
      priceSliderElement.noUiSlider.updateOptions(SliderSettings.HOUSE);
      break;

    case 'house':
      priceSliderElement.noUiSlider.updateOptions(SliderSettings.HOTEL);
      break;

    case 'palace':
      priceSliderElement.noUiSlider.updateOptions(SliderSettings.PALACE);
      break;
  }
}

housingTypeElement.addEventListener('change', onHousingTypeElementChange);


function resetPage () {
  const popupCloseButtonElement = document.querySelector('.leaflet-popup-close-button');
  adFormElement.reset();
  mapFiltersElement.reset();
  resetMap();
  priceSliderElement.noUiSlider.updateOptions(SliderSettings.FLAT);
  if (popupCloseButtonElement) {
    popupCloseButtonElement.click();
  }
  getDefaultAddress();
}


function onSuccess () {
  setSuccessMessage();
  resetPage();
  unblockSubmitButton();

}

function onError () {
  setErrorMessage();
  unblockSubmitButton();
}


function setFormSubmit () {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        onSuccess,
        onError,
        new FormData(evt.target)
      );
    }
  });
}

setFormSubmit();

function onClickResetAllForms (cb) {
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage();
    cb();
    defaultImagesElements();
  }
  );
}
export {onClickResetAllForms};
