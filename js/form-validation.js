const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const housingType = adForm.querySelector('#type');
const registrationTime = adForm.querySelector('.ad-form__element--time');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const priceSlider = adForm.querySelector('.ad-form__slider');

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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element-wrapper',
  errorClass: 'ad-form__element-wrapper--invalid',
  successClass: 'ad-form__element-wrapper--valid',
  errorTextParent: 'ad-form__element-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__element-wrapper--error'
});


function validateAdTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adTitle,
  validateAdTitle,
  'Должно быть не менее 30 и не более 100 символов'
);


function validateAdPrice (value) {
  return value <= MAX_PRICE;
}

pristine.addValidator(
  adPrice,
  validateAdPrice,
  'Не дороже ста тысяч кексотугриков'
);

function validatePrice (value) {
  return MIN_PRICE[housingType.value] < value;
}

function getValidationMessage () {
  return `Не меньше ${MIN_PRICE[housingType.value]} кексотугриков`;
}

pristine.addValidator(
  adPrice,
  validatePrice,
  getValidationMessage
);


function checkTime (evt) {
  if (evt.target.name === 'timein') {
    timeOut.value = timeIn.value;
  } else if (evt.target.name === 'timeout'){
    timeIn.value = timeOut.value;
  }
}
registrationTime.addEventListener('change', checkTime);


function validateGuestsDistribution () {
  return GUESTS_DISTRIBUTION_VALUE_ARRAY[roomNumber.value].includes(capacity.value);
}

pristine.addValidator(roomNumber, validateGuestsDistribution, 'Не подходит для такого количества гостей');
pristine.addValidator(capacity, validateGuestsDistribution, 'Столько гостей нельзя поселить в такое количество комнат');


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


noUiSlider.create(priceSlider, {
  range: {
    min: [0, 100],
    '80%': [10000, 500],
    max: MAX_PRICE,
  },
  start: MIN_PRICE.flat,
  connect: 'lower',
});

priceSlider.noUiSlider.on('update', () => {
  adPrice.placeholder = Number(priceSlider.noUiSlider.get());
});

function onHousingTypeChange () {
  adPrice.placeholder = MIN_PRICE[housingType.value];

  // Здесь, конечно, куча магических чисел, но, мне кажется, так слайдер воспринимается и выглядит лучше.
  // И, конечно, узнал как сделать нелинейный слайдер с разными значениями шага

  switch (housingType.value){
    case 'bungalow':
      priceSlider.noUiSlider.updateOptions({
        range: {
          min: [0, 10],
          '80%': [5000, 100],
          max: MAX_PRICE,
        },
        start: MIN_PRICE.bungalow,
      });
      break;

    case 'flat':
      priceSlider.noUiSlider.updateOptions({
        range: {
          min: [0, 100],
          '80%': [10000, 500],
          max: MAX_PRICE,
        },
        start: MIN_PRICE.flat,
      });
      break;

    case 'hotel':
      priceSlider.noUiSlider.updateOptions({
        range: {
          min: [0, 500],
          '80%': [20000, 500],
          max: MAX_PRICE,
        },
        start: MIN_PRICE.hotel,
      });
      break;

    case 'house':
      priceSlider.noUiSlider.updateOptions({
        range: {
          min: [0, 1000],
          '80%': [30000, 500],
          max: MAX_PRICE,
        },
        start: MIN_PRICE.house,
      });
      break;

    case 'palace':
      priceSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: MAX_PRICE,
        },
        start: MIN_PRICE.palace,
      });
      break;
  }
}

housingType.addEventListener('change', onHousingTypeChange);
