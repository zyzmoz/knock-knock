import { findMany } from "../integrations/firebase.js";

export const homeCtrl = () => {
  let listings = [];
  let markers = [];

  let map = L.map("listingMap");
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  const success = (position) => {
    console.log(position);
    map.setView([position.coords.latitude, position.coords.longitude], 13);
  };

  const error = () => {
    return { error: "Geolocation is not supported by your brwser" };
  };

  navigator.geolocation.getCurrentPosition(success, error);

  const showSingleListing = (listing) => {
    listingDiv.style.opacity = 0;
    listingDiv.style.position = "absolute";
    listingDiv.style.visibility = "hidden";
    singleListingDiv.style.position = "relative";
    singleListingDiv.style.visibility = "visible";
    singleListingDiv.style.opacity = 1;

    // Set UI values

    console.log(listing);

    singleListingView.style.padding = "1rem";
    singleListingView.style.display = "block";
    singleListingView.style.width = "600px";
    singleListingView.style.margin = "auto";

    propertyType.innerHTML = `<i>Type</i> : ${listing.propertyType}`;
    propertyType.style.textTransform = "capitalize";

    propertyDescription.innerHTML = `<i>Description</i> : ${listing.propertyDescription}`;

    listing.propertyImages.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.url;
      img.style.width = "200px";
      img.style.height = "auto";
      img.style.margin = "1rem";
      propertyImages.appendChild(img);
    });

    propertyRent.innerHTML = `$${listing.propertyRentPrice}`;
  };

  showListingsBtn.addEventListener("click", () => {
    singleListingDiv.style.opacity = 0;
    singleListingDiv.style.position = "absolute";
    singleListingDiv.style.visibility = "hidden";
    listingDiv.style.position = "relative";
    listingDiv.style.visibility = "visible";
    listingDiv.style.opacity = 1;
  });

  const createListingCard = (listing) => {
    let cardDiv = document.createElement("div");

    cardDiv.addEventListener("click", () => {
      showSingleListing(listing);
    });
    cardDiv.id = listing.id;
    cardDiv.className = "listing-card";

    let cardImage = document.createElement("img");
    cardImage.src = listing.propertyImages[0]?.url;

    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "listing-description";

    let titleH2 = document.createElement("h4");
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

  toggleMap.addEventListener("click", () => {
    if (listingMap.classList.toString().includes("show")) {
      toggleMapStatus.innerHTML = "View";
    } else {
      toggleMapStatus.innerHTML = "Hide";
    }
    listingMap.classList.toggle("show");
  });

  const renderListings = (listingArr) => {
    listingMessage.innerHTML = `<b>Showing ${
      listingArr?.length || 0
    } apartment(s) and house(s)</b>`;
    listingView.innerHTML = "";
    markers.map(m => m.remove());
    markers = [];
    listingArr?.map((r) => {
      let marker = L.marker([
        r.propertyAddress.location.lat,
        r.propertyAddress.location.lng,
      ]).addTo(map);

      markers.push(marker);

      listingView.appendChild(createListingCard(r));
    });
  };

  findMany("listings", (res) => {
    listings = res;
    renderListings(res);
  });

  propertyTypeFilter.addEventListener("change", (evt) => {
    console.log(evt.target.value);
    const filteredList =
      evt.target.value === ""
        ? listings
        : listings.filter((l) => l.propertyType === evt.target.value);
    renderListings(filteredList);
  });

  propertyRoomsFilter.addEventListener("change", (evt) => {
    const bedRooms = Number(evt.target.value);
    console.log(bedRooms);
    const filteredList = isNaN(bedRooms)
      ? listings
      : listings.filter((l) => {
          if (bedRooms == 4) {
            return l.propertyRooms.bedroomCount > 4;
          }
          return l.propertyRooms.bedroomCount == bedRooms;
        });
    renderListings(filteredList);
  });

  propertyRentPriceFilter.addEventListener("change", (evt) => {
    const price = Number(evt.target.value);
    console.log(price);
    const filteredList =
      isNaN(price) || price == 0
        ? listings
        : listings.filter((l) => {
            switch (price) {
              case 1000:
                return l.propertyRentPrice <= price;
              case 2000:
                return (
                  l.propertyRentPrice >= 1000 && l.propertyRentPrice <= price
                );
              case 3000:
                return (
                  l.propertyRentPrice >= 2000 && l.propertyRentPrice <= price
                );
              case 4000:
                return l.propertyRentPrice >= 3000;
            }
          });
    renderListings(filteredList);
  });

  propertyFeaturesFilter.addEventListener("change", (evt) => {
    const furnished = Boolean(Number(evt.target.value));
    console.log(furnished);

    const filteredList =
      evt.target.value === ""
        ? listings
        : listings.filter((l) => l.propertyFeatures?.isFurnished === furnished);
    renderListings(filteredList);
  });

  propertyAllowsPetsFilter.addEventListener("change", (evt) => {
    const pets = Boolean(Number(evt.target.value));
    console.log(pets);
    const filteredList =
      evt.target.value === ""
        ? listings
        : listings.filter((l) => l.propertyAllowsPets === pets);
    renderListings(filteredList);
  });
};
