export class Listing {
  constructor(
    props = {
      createdBy,
      createdAt: new Date().toISOString(),
      propertyType,
      propertyDescription,
      propertyAddress: {
        address,
        unitNumber,
        location,
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
      // propertyAssignedGroup,
      propertyAvailableDate,
      propertyLeasePeriod,
      propertyRentPrice,
      propertyImages,
    }
  ) {
    return Object.assign(this, props);
  }
}
