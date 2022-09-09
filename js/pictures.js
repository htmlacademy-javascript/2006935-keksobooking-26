const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housingPhotoChooser = document.querySelector('#images');
const housingPhotoPreview = document.querySelector('.ad-form__photo');


avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

housingPhotoChooser.addEventListener('change', () => {
  const file = housingPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const housingPhoto = `<img class = "ad-form__photo-image" src="${URL.createObjectURL(file)}" alt="Аватар пользователя" width="70" height="70">`;
    housingPhotoPreview.insertAdjacentHTML('beforeend', housingPhoto);
  }
});


function defaultImagesElements () {
  avatarPreview.src = 'img/muffin-grey.svg';

  housingPhotoPreview.innerHTML = '';
}

export{defaultImagesElements};
