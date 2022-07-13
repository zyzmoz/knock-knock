export class Listing {
  constructor(
    props = {
      // createdBy,
      // createdAt: new Date().toISOString(),
      // propertyType,
      // propertyAddress,
      // propertyUnitNumber,
      // propertyDescription,
      // hideListing: false,
      // price,
      // depositValue,
      // moveInDate,
      // leaseDuration,
      // petPolicy,
      // images: [] // Array of Storage urls

      createdBy,
      createdAt: new Date().toISOString(),
      propertyType,
      propertyDescription,
      propertyAddress: {
        address,
        unitNumber,
      },
      propertyRooms: {
        bedroomCount,
        bathroomCount,
        halfBathroomCount,
      },
      propertySquareFeet,
      propertyAmenities: {
        hasAirConditioning,
        hasFireplace,
        hasCentralHeat,
        hasCeilingFan,
      },
      propertyFeatures: {
        hashInUnitLaundry,
        isFurnished,
        hasHardwoodFloor,
        hasCarpet,
        hasWheelchairAccess,
        hasHighCeiling,
        hasWalkinCloset,
        hasBalconyOrDesk,
      },
      propertyOther: {
        hasDishwasher,
        hasGarden,
        hasSwimmingPool,
        hasAssignedParking,
        hasStorage,
      },
      propertyBuildingFeatures: {
        hasControlledAccess,
        hasGym,
        hasOutdoorSpaces,
        hasResidentLounge,
        hasGarageParking,
        hasBusinessCenter,
        hasRoofDeck,
        hasElevator,
      },
      propertyServices: {
        hasPackageService,
        hasDoorPerson,
        hasConceirgeService,
        hasDryCleaningService,
        hasOnSiteManagement,
      },
      propertyAllowsPets,
      propertyAssignedGroup,
      propertyAvailableDate,
      propertyLeasePeriod,
      propertyRentPrice,
    }
  ) {
    return Object.assign(this, props);
  }
}
