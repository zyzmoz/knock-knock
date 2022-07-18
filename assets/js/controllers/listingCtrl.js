import { Listing } from '../classes/Listing.js';
import {
  userAuthState,
  getUser,
  createOrUpdateData,
  findOne,
  uploadImage,
  getUploadedImage,
  deleteUploadedImage,
} from '../integrations/firebase.js';

export const listingCtrl = async () => {
  // COUNTER
  let bedroomCount = 0,
    bathroomCount = 0,
    halfBathroomCount = 0;

  const decrementCount = (counter, counterId, counterType) => {
    if (counter === 0) {
      return;
    } else {
      counter--;
    }

    if (counterType === 'bedroom') {
      bedroomCount = counter;
    } else if (counterType === 'bathroom') {
      bathroomCount = counter;
    } else if (counterType === 'halfBathroom') {
      halfBathroomCount = counter;
    }

    counterId.innerHTML = counter;
  };

  const incrementCount = (counter, counterId, counterType) => {
    counter++;

    if (counterType === 'bedroom') {
      bedroomCount = counter;
    } else if (counterType === 'bathroom') {
      bathroomCount = counter;
    } else if (counterType === 'halfBathroom') {
      halfBathroomCount = counter;
    }

    counterId.innerHTML = counter;
  };

  decrementIconBedroom.addEventListener('click', () => {
    decrementCount(bedroomCount, propertyBedroomCount, 'bedroom');
  });
  incrementIconBedroom.addEventListener('click', () => {
    incrementCount(bedroomCount, propertyBedroomCount, 'bedroom');
  });

  decrementIconBathroom.addEventListener('click', () => {
    decrementCount(bathroomCount, propertyBathroomCount, 'bathroom');
  });
  incrementIconBathroom.addEventListener('click', () => {
    incrementCount(bathroomCount, propertyBathroomCount, 'bathroom');
  });

  decrementIconHalfBathroom.addEventListener('click', () => {
    decrementCount(halfBathroomCount, propertyHalfBathroomCount, 'halfBathroom');
  });
  incrementIconHalfBathroom.addEventListener('click', () => {
    incrementCount(halfBathroomCount, propertyHalfBathroomCount, 'halfBathroom');
  });

  // LISTING IMAGES UPLOAD
  let listingImages = [];
  let deleteImageIcons = [];

  const showUploadedImages = () => {
    uploadedPhotosBox.innerHTML = '<label for="" class="image-uploads-text">Images uploaded</label>';

    listingImages.forEach((image) => {
      let uploadedImage = document.createElement('div');
      uploadedImage.className = 'uploaded-image';

      let imageInput = document.createElement('img');
      imageInput.src = image.url;

      let deletePhotoIcon = document.createElement('img');
      deletePhotoIcon.className = 'delete-photo-icon';
      deletePhotoIcon.src = '../assets/icons/Cross/cross-grey.svg';

      deletePhotoIcon.addEventListener('click', async () => {
        await deleteUploadedImage(image.name);
        listingImages = listingImages.filter((i) => image.name !== i.name);
        showUploadedImages();
      });

      uploadedImage.appendChild(imageInput);
      uploadedImage.appendChild(deletePhotoIcon);

      uploadedPhotosBox.appendChild(uploadedImage);
    });
  };

  uploadedImage.addEventListener('change', async () => {
    const file = uploadedImage.files[0];
    await uploadImage(file);

    const url = await getUploadedImage(file.name);

    const imageData = {
      name: file.name,
      url: url,
    };

    listingImages.push(imageData);

    showUploadedImages();
  });

  // STEPS,  EXIT, BACK & NEXT
  let stepCount = 1;

  const updateStep = () => {
    const allSteps = document.querySelectorAll('.step');

    allSteps.forEach((step) => (step.classList.contains('active-step') ? step.classList.remove('active-step') : null));

    if (stepCount === 1) {
      step1.classList.add('active-step');
    } else if (stepCount === 2) {
      step2.classList.add('active-step');
    } else if (stepCount === 3) {
      step3.classList.add('active-step');
    } else if (stepCount === 4) {
      step4.classList.add('active-step');
    }
  };

  const updateBtns = () => {
    if (stepCount === 1) {
      backBtn.classList.add('hideBtn');
    } else if (stepCount === 4) {
      nextBtn.classList.add('hideBtn');
      createListingBtn.classList.remove('hideBtn');
    } else {
      createListingBtn.classList.add('hideBtn');
      backBtn.classList.remove('hideBtn');
      nextBtn.classList.remove('hideBtn');
    }
  };

  nextBtn.addEventListener('click', () => {
    stepCount++;

    updateStep();
    updateBtns();
  });

  backBtn.addEventListener('click', () => {
    if (stepCount === 0) {
      return;
    }

    stepCount--;

    updateStep();
    updateBtns();
  });

  exitBtn.addEventListener('click', () => {
    const res = confirm('Are you sure you want to exit? Info entered will not be saved.');

    if (res) {
      window.location.replace('#home');
    }
  });

  // CREATE LISTING
  createListingBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const user = await getUser(userAuthState.uid);

    const mapDiv = document.getElementById('map');
    let listingLocation = { ...mapDiv.dataset };
    listingLocation = JSON.parse(listingLocation.location);

    let listing = new Listing({
      createdBy: user.firstName + ' ' + user.lastName,
      createdAt: new Date().toISOString(),
      propertyType: propertyType.value,
      propertyDescription: propertyDescription.value,
      propertyAddress: {
        address: propertyAddress.value,
        unitNumber: propertyUnitNumber.value,
        location: {
          lat: listingLocation.lat,
          lng: listingLocation.lng,
        },
      },
      propertyRooms: {
        bedroomCount,
        bathroomCount,
        halfBathroomCount,
      },
      propertySquareFeet: Number(propertySquareFeet.value),
      propertyAmenities: {
        hasAirConditioning: hasAirConditioning.checked,
        hasFireplace: hasFireplace.checked,
        hasCentralHeat: hasCentralHeat.checked,
        hasCeilingFan: hasCeilingFan.checked,
      },
      propertyFeatures: {
        hashInUnitLaundry: hashInUnitLaundry.checked,
        isFurnished: isFurnished.checked,
        hasHardwoodFloor: hasHardwoodFloor.checked,
        hasCarpet: hasCarpet.checked,
        hasWheelchairAccess: hasWheelchairAccess.checked,
        hasHighCeiling: hasHighCeiling.checked,
        hasWalkinCloset: hasWalkinCloset.checked,
        hasBalconyOrDesk: hasBalconyOrDesk.checked,
      },
      propertyOther: {
        hasDishwasher: hasDishwasher.checked,
        hasGarden: hasGarden.checked,
        hasSwimmingPool: hasSwimmingPool.checked,
        hasAssignedParking: hasAssignedParking.checked,
        hasStorage: hasStorage.checked,
      },
      propertyBuildingFeatures: {
        hasControlledAccess: hasControlledAccess.checked,
        hasGym: hasGym.checked,
        hasOutdoorSpaces: hasOutdoorSpaces.checked,
        hasResidentLounge: hasResidentLounge.checked,
        hasGarageParking: hasGarageParking.checked,
        hasBusinessCenter: hasBusinessCenter.checked,
        hasRoofDeck: hasRoofDeck.checked,
        hasElevator: hasElevator.checked,
      },
      propertyServices: {
        hasPackageService: hasPackageService.checked,
        hasDoorPerson: hasDoorPerson.checked,
        hasConceirgeService: hasConceirgeService.checked,
        hasDryCleaningService: hasDryCleaningService.checked,
        hasOnSiteManagement: hasOnSiteManagement.checked,
      },
      // propertyAssignedGroup: propertyAssignedGroup.value,
      propertyAvailableDate: propertyAvailableDate.value,
      propertyRentPrice: Number(propertyRentPrice.value),
      propertyImages: listingImages,
    });

    let propertyAllowsPets = false;
    const propertyAllowsPetsRadios = document.getElementsByName('propertyAllowsPets');
    for (var i = 0, length = propertyAllowsPetsRadios.length; i < length; i++) {
      if (propertyAllowsPetsRadios[i].checked) {
        if (propertyAllowsPetsRadios[i].value === 'Yes') {
          propertyAllowsPets = true;
        } else {
          propertyAllowsPets = false;
        }

        break;
      }
    }

    listing.propertyAllowsPets = propertyAllowsPets;

    let propertyLeasePeriod = 0;
    const propertyLeasePeriodRadios = document.getElementsByName('propertyLeasePeriod');
    for (var i = 0, length = propertyLeasePeriodRadios.length; i < length; i++) {
      if (propertyLeasePeriodRadios[i].checked) {
        propertyLeasePeriod = propertyLeasePeriodRadios[i].value;
        break;
      }
    }

    listing.propertyLeasePeriod = propertyLeasePeriod;

    await createOrUpdateData('listings', userAuthState.uid, listing);

    createListingForm.reset();
  });
};
