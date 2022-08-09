const adForm = document.querySelector('.ad-form');
const interactiveBlock = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersChildren = Array.from(mapFilters.children);


function adFormDisabled () {
  adForm.classList.add('ad-form--disabled');
  interactiveBlock.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersChildren.forEach((child) => {
    child.setAttribute('disabled', true);
  });
}


function adFormEnabled () {
  adForm.classList.remove('ad-form--disabled');
  interactiveBlock.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersChildren.forEach((child) => {
    child.removeAttribute('disabled');
  });
}

export {adFormDisabled, adFormEnabled};
