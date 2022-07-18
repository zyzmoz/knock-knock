import { findMany } from "../integrations/firebase.js";

export const homeCtrl = () => {
  const createListingCard = (listing) => {
    let cardDiv = document.createElement("div");

    cardDiv.addEventListener("click", () =>
      console.log(`listing ${listing.id}`)
    );
    cardDiv.id = listing.id;
    cardDiv.className = "listing-card";

    let cardImage = document.createElement("img");
    cardImage.src = listing.propertyImages[0]?.url;

    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "listing-description";

    let titleH2 = document.createElement("h2");
    titleH2.innerHTML = listing.propertyDescription;

    let titleSpan = document.createElement("span");
    titleSpan.innerHTML = `${listing.propertyRooms.bedroomCount} Bedroom(s) | ${listing.propertyRooms.bathroomCount} BathRoom(s)`;

    let addressDiv = document.createElement("div");
    addressDiv.className = "listing-address";

    addressDiv.innerHTML = `${listing.propertyAddress.unitNumber} ${listing.propertyAddress.address}`;

    descriptionDiv.appendChild(titleH2);
    descriptionDiv.appendChild(titleSpan);
    descriptionDiv.appendChild(addressDiv);

    let priceDiv = document.createElement("div");
    priceDiv.className = "listing-price";

    priceDiv.innerHTML = `${listing.propertyRentPrice} / month`;

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(descriptionDiv);
    cardDiv.appendChild(priceDiv);

    return cardDiv;
  };

  findMany("listings", (res) => {
    listingView.innerHTML = "";
    res?.map((r) => {
      listingView.appendChild(createListingCard(r));
    });
  });
};