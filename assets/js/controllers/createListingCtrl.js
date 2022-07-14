import { currentLocation } from "../../../index.js";
import { Listing } from "../classes/Listing.js";
import { createOrUpdateData } from "../integrations/firebase.js";

export const createListingCtrl = () => {
  const createListing = (data) => {
    const listing = {
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
    return createOrUpdateData("listings", null, listing);
  };

  submitListingBtn.addEventListener("click", async () => {
    if (
      listingPhotoURL.value == "" ||
      listingTitle.value == "" ||
      listingInfo.value == "" ||
      listingAddress.value == "" ||
      listingPrice.value == ""
    ) {
      listingError.innerHTML =
        "Please fill all the information before creating a listing!";

      return;
    }

    const { error } = await createListing({
      photoURL: listingPhotoURL.value,
      title: listingTitle.value,
      info: listingInfo.value,
      address: listingAddress.value,
      price: listingPrice.value,
      location: currentLocation,
    });

    if (error) {
      listingError.innerHTML = error.message;
      return;
    }

    window.location.replace("#home");
  });
};
