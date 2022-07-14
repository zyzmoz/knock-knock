import { currentLocation } from "../../../index.js";
import { Listing } from "../classes/Listing.js";
import { createOrUpdateData, userAuthState } from "../integrations/firebase.js";

export const createListingCtrl = () => {
  const createListing = (data) => {
    const listing = {
      createdBy: userAuthState?.uid,
      photoURL: data.photoURL,
      title: data.title,
      info: data.info,
      address: data.address,
      price: data.price,
      location: {
        lat: data.location.lat,
        lng: data.location.lng,
      },
    };
    createOrUpdateData("listings", null, listing);
  };

  submitListingBtn.addEventListener("click", () => {
    createListing({
      photoURL: listingPhotoURL.value,
      title: listingTitle.value,
      info: listingInfo.value,
      address: listingAddress.value,
      price: listingPrice.value,
      location: currentLocation,
    });
  });
};
