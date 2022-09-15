const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const housingPhotoChooserElement = document.querySelector('#images');
const housingPhotoPreviewElement = document.querySelector('.ad-form__photo');


avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

housingPhotoChooserElement.addEventListener('change', () => {
  const file = housingPhotoChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const housingPhotoTemplate = document.querySelector('#photo-image')
      .content
      .querySelector('.ad-form__photo-image');
    const housingPhoto = housingPhotoTemplate.cloneNode(true);
    housingPhoto.src = URL.createObjectURL(file);
    housingPhotoPreviewElement.appendChild(housingPhoto);
  }
});


function defaultImagesElements () {
  avatarPreviewElement.src = 'img/muffin-grey.svg';

  housingPhotoPreviewElement.innerHTML = '';
}

export{defaultImagesElements};
