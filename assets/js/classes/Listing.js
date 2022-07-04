export class Listing {
  constructor(
    props = {
      createdBy,
      createdAt: new Date().toISOString(),
      propertyType,
      propertyAddress,
      propertyUnitNumber,
      propertyDescription,
      hideListing: false,
      price,
      depositValue,
      moveInDate,
      leaseDuration,
      petPolicy,
      images: [] // Array of Storage urls
    }
  ){
    return Object.assign(this, props);
  }
}