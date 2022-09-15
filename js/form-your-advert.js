const adFormElement = document.querySelector('.ad-form');
const interactiveBlockElement = adFormElement.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersChildren = Array.from(mapFilters.children);


function adFormDisabled () {
  adFormElement.classList.add('ad-form--disabled');
  interactiveBlockElement.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersChildren.forEach((child) => {
    child.setAttribute('disabled', true);
  });
}


function filtersFormDisabled () {
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersChildren.forEach((child) => {
    child.setAttribute('disabled', true);
  });
}


function adFormEnabled () {
  adFormElement.classList.remove('ad-form--disabled');
  interactiveBlockElement.forEach((element) => {
    element.removeAttribute('disabled');
  });
}


function filtersFormEnabled () {
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersChildren.forEach((child) => {
    child.removeAttribute('disabled');
  });
}


adFormDisabled();
filtersFormDisabled();


export {adFormDisabled, adFormEnabled, filtersFormDisabled, filtersFormEnabled};
