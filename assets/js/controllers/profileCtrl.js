import { userAuthState, createOrUpdateData, findOne, uploadImage, getUploadedImage } from '../integrations/firebase.js';
import { User } from '../classes/User.js';

export const profileCtrl = async () => {
  let user;

  findOne('users', userAuthState?.uid, (data) => {
    user = new User(data);
    user.firstName = data.firstName;
    profileName.innerHTML = user.fullName;
    profileFirstName.value = user.firstName;
    profileLastName.value = user.lastName;
    profileEmail.value = `${user.email}`;
    profilePhoto.src = user.photoUrl;
  });

  profileFirstName.addEventListener('change', () => {
    onInputChanged();
  });

  profileLastName.addEventListener('change', () => {
    onInputChanged();
  });

  const onInputChanged = () => {
    profileName.innerHTML = `${profileFirstName.value} ${profileLastName.value}`;
  };

  profileSubmit.addEventListener('click', () => {
    createOrUpdateData('users', userAuthState?.uid, {
      ...user,
      firstName: profileFirstName.value,
      lastName: profileLastName.value,
      photoUrl: profilePhoto.src,
    });

    window.location.replace('#home');
  });

  // Upload Photo
  let profileImage, profileImageFileName;
  uploadedProfileImage.addEventListener('change', () => {
    let file = uploadedProfileImage.files[0];
    const fileName = `${userAuthState.uid}.${file.name.split('.')[1]}`;

    profileImage = file;
    profileImageFileName = fileName;
  });
  uploadProfilePhoto.addEventListener('click', async () => {
    await uploadImage(profileImage, 'User Images', profileImageFileName);

    const url = await getUploadedImage(profileImageFileName, 'User Images');

    profilePhoto.src = url;
  });

  // Take Photo
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.scale(0.5, 0.5);

  startCamera.addEventListener('click', () => {
    const container = document.getElementsByClassName('video-canvas-container');
    container[0].style.display = 'grid';

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
      });
    } else {
      console.log('media devices not available in this browser');
    }
  });

  async function handleBlob(blob) {
    let file = new File([blob], `${userAuthState.uid}.jpg`);
    await uploadImage(file, 'User Images', file.name);

    const url = await getUploadedImage(file.name, 'User Images');

    profilePhoto.src = url;
  }

  takeProfilePhoto.addEventListener('click', () => {
    context.drawImage(video, 0, 0);
    const imageBlob = canvas.toBlob(handleBlob, 'image/jpg');
  });

  stopCamera.addEventListener('click', () => {
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());

    const container = document.getElementsByClassName('video-canvas-container');
    container[0].style.display = 'none';
  });
};
