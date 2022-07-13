import { Listing } from '../classes/Listing.js';
import { userAuthState, getUser } from '../integrations/firebase.js';

export const listingCtrl = async () => {
  createListing.addEventListener('click', async (e) => {
    e.preventDefault();

    const user = await getUser(userAuthState.uid);

    let listing = new Listing({
      createdBy: user.firstName + ' ' + user.lastName,
      createdAt: new Date().toISOString(),
      propertyType: propertyType.value,
      propertyDescription: propertyDescription.value,
      propertyAddress: {
        address: propertyAddress.value,
        unitNumber: propertyUnitNumber.value,
      },
      propertyRooms: {
        bedroomCount: Number(propertyBedroomCount.value),
        bathroomCount: Number(propertyBathroomCount.value),
        halfBathroomCount: Number(propertyHalfBathroomCount.value),
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
      propertyAssignedGroup: propertyAssignedGroup.value,
      propertyAvailableDate: propertyAvailableDate.value,
      propertyRentPrice: Number(propertyRentPrice.value),
    });

    let propertyAllowsPets;
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

    let propertyLeasePeriod;
    const propertyLeasePeriodRadios = document.getElementsByName('propertyLeasePeriod');
    for (var i = 0, length = propertyLeasePeriodRadios.length; i < length; i++) {
      if (propertyLeasePeriodRadios[i].checked) {
        propertyLeasePeriod = propertyLeasePeriodRadios[i].value;
        break;
      }
    }

    listing.propertyLeasePeriod = propertyLeasePeriod;

    console.log(listing);
  });
};
