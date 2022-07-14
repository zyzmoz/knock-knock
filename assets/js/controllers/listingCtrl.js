import { findMany } from "../integrations/firebase.js";

export const listingCtrl = () => {
  const createListingCard = (listing) => {
    let cardDiv = document.createElement("div");

    cardDiv.addEventListener("click", () =>
      console.log(`listing ${listing.id}`)
    );
    cardDiv.id = listing.id;
    cardDiv.className = "listing-card";

    let cardImage = document.createElement("img");
    cardImage.src = listing.photoURL;

    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "listing-description";

    let titleH2 = document.createElement("h2");
    titleH2.innerHTML = listing.title;

    let titleSpan = document.createElement("span");
    titleSpan.innerHTML = listing.info;

    let addressDiv = document.createElement("div");
    addressDiv.className = "listing-address";

    addressDiv.innerHTML = listing.address;

    descriptionDiv.appendChild(titleH2);
    descriptionDiv.appendChild(titleSpan);
    descriptionDiv.appendChild(addressDiv);

    let priceDiv = document.createElement("div");
    priceDiv.className = "listing-price";

    priceDiv.innerHTML = `${listing.price} / month`;

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(descriptionDiv);
    cardDiv.appendChild(priceDiv);

    return cardDiv;
  };

  // listingBtn.addEventListener("click", () => {
  //   createListing({
  //     photoURL: `https://picsum.photos/200/200?random=${Math.floor(
  //       (Math.random() * 10) ^ 6
  //     )}`,
  //     title: `Unit ${Math.floor((Math.random() * 10) ^ 6)}`,
  //     info: `${Math.floor((Math.random() * 10) ^ 6)} Bed(s) | ${Math.floor(
  //       (Math.random() * 10) ^ 6
  //     )} Bath(s)`,
  //     address: `${Math.floor((Math.random() * 10) ^ 6)}00 St`,
  //     price: 2000 + Math.floor((Math.random() * 10) ^ 6),
  //     location: {
  //       lat: 40.1297 + Math.floor(Math.random() * 10),
  //       lng: -120.1658 + Math.floor(Math.random() * 10),
  //     },
  //   });
  // });

  findMany("listings", (res) => {
    listingView.innerHTML = "";
    res?.map((r) => {
      listingView.appendChild(createListingCard(r));
    });
  });
};
