import { searchbarRef } from "../../../index.js";
import { findMany, getUser } from "../integrations/firebase.js";
import { uppercaseFirstLetter } from "../misc/index.js";

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

  const showSingleListing = async (listing) => {
    listingDiv.style.opacity = 0;
    listingDiv.style.position = "absolute";
    listingDiv.style.visibility = "hidden";
    singleListingDiv.style.position = "relative";
    singleListingDiv.style.visibility = "visible";
    singleListingDiv.style.opacity = 1;

    console.log(listing);

    singleListingView.style.padding = "1rem";
    singleListingView.style.display = "block";
    singleListingView.style.width = "600px";
    singleListingView.style.margin = "auto";

    listingImages.innerHTML = "";
    listingDetails.innerHTML = "";
    listingContact.innerHTML = "";

    listing.propertyImages.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.url;
      listingImages.appendChild(img);
    });

    let propertyType = document.createElement("h3");
    propertyType.innerHTML = listing.propertyType;
    propertyType.style.textTransform = "capitalize";
    propertyType.id = "propertyType";
    listingDetails.appendChild(propertyType);

    let propertyAddress = document.createElement("h3");
    propertyAddress.innerHTML = listing.propertyAddress.address;
    propertyAddress.id = "propertyAddress";
    listingDetails.appendChild(propertyAddress);

    let propertyRooms = document.createElement("div");
    propertyRooms.id = "propertyRooms";
    if (listing.propertyRooms.bedroomCount > 0) {
      let bedroom = document.createElement("p");
      bedroom.innerHTML = `${listing.propertyRooms.bedroomCount} Bedrooms`;
      propertyRooms.appendChild(bedroom);
    }
    if (listing.propertyRooms.bathroomCount > 0) {
      let bathroom = document.createElement("p");
      bathroom.innerHTML = `${listing.propertyRooms.bathroomCount} Bathrooms`;
      propertyRooms.appendChild(bathroom);
    }
    let sqfeet = document.createElement("p");
    sqfeet.innerHTML = `${listing.propertySquareFeet} sq ft`;
    propertyRooms.appendChild(sqfeet);
    if (listing.propertyFeatures.isFurnished === true) {
      let furnished = document.createElement("p");
      furnished.innerHTML = "Furnished";
      propertyRooms.appendChild(furnished);
    }
    listingDetails.appendChild(propertyRooms);

    let propertyAmenities = document.createElement("h3");
    propertyAmenities.innerHTML = "Amenities";
    propertyAmenities.id = "propertyAmenities";
    listingDetails.appendChild(propertyAmenities);
    let propertyAmenitiesDiv = document.createElement("div");
    propertyAmenitiesDiv.id = "propertyAmenitiesDiv";
    Object.keys(listing.propertyAmenities).forEach((key, index) => {
      if (listing.propertyAmenities[key] === true) {
        let amenity = document.createElement("p");
        if (key === "hasAirConditioning") {
          amenity.innerHTML = "Air Conditioning";
        } else if (key === "hasCeilingFan") {
          amenity.innerHTML = "Ceiling Fan";
        } else if (key === "hasCentralHeat") {
          amenity.innerHTML = "Central Heat";
        } else if (key === "hasFireplace") {
          amenity.innerHTML = "Fireplace";
        }
        propertyAmenitiesDiv.appendChild(amenity);
      }
    });
    listingDetails.appendChild(propertyAmenitiesDiv);

    let propertyFeatures = document.createElement("h3");
    propertyFeatures.innerHTML = "Property Features";
    propertyFeatures.id = "propertyFeatures";
    listingDetails.appendChild(propertyFeatures);
    let propertyFeaturesDiv = document.createElement("div");
    propertyFeaturesDiv.id = "propertyFeaturesDiv";
    Object.keys(listing.propertyFeatures).forEach((key, index) => {
      if (listing.propertyFeatures[key] === true) {
        let feature = document.createElement("p");
        if (key === "hasBalconyOrDesk") {
          feature.innerHTML = "Balcony or Desk";
        } else if (key === "hasCarpet") {
          feature.innerHTML = "Carpet";
        } else if (key === "hasHardwoodFloor") {
          feature.innerHTML = "Hardwood Floor";
        } else if (key === "hasHighCeiling") {
          feature.innerHTML = "High Ceiling";
        } else if (key === "hasWalkinCloset") {
          feature.innerHTML = "Walkin Closet";
        } else if (key === "hasWheelchairAccess") {
          feature.innerHTML = "Wheelchair Access";
        } else if (key === "hasInUnitLaundry") {
          feature.innerHTML = "In Uint Laundry";
        } else if (key === "isFurnished") {
          return;
        }
        propertyFeaturesDiv.appendChild(feature);
      }
    });
    listingDetails.appendChild(propertyFeaturesDiv);

    let propertyBuildingFeatures = document.createElement("h3");
    propertyBuildingFeatures.innerHTML = "Building Features";
    propertyBuildingFeatures.id = "propertyBuildingFeatures";
    listingDetails.appendChild(propertyBuildingFeatures);
    let propertyBuildingFeaturesDiv = document.createElement("div");
    propertyBuildingFeaturesDiv.id = "propertyBuildingFeaturesDiv";
    Object.keys(listing.propertyBuildingFeatures).forEach((key, index) => {
      if (listing.propertyBuildingFeatures[key] === true) {
        let feature = document.createElement("p");
        if (key === "hasBusinessCenter") {
          feature.innerHTML = "Business Center";
        } else if (key === "hasControlledAccess") {
          feature.innerHTML = "Controlled Access";
        } else if (key === "hasElevator") {
          feature.innerHTML = "Elevator";
        } else if (key === "hasGarageParking") {
          feature.innerHTML = "Garage Parking";
        } else if (key === "hasGym") {
          feature.innerHTML = "Gym";
        } else if (key === "hasOutdoorSpaces") {
          feature.innerHTML = "Outdoor Spaces";
        } else if (key === "hasResidentLounge") {
          feature.innerHTML = "Resident Lounge";
        } else if (key === "hasRoofDeck") {
          feature.innerHTML = "Roof Deck";
        }
        propertyBuildingFeaturesDiv.appendChild(feature);
      }
    });
    listingDetails.appendChild(propertyBuildingFeaturesDiv);

    let rentDetails = document.createElement("h3");
    rentDetails.innerHTML = "Rent Details";
    rentDetails.id = "rentDetails";
    listingDetails.appendChild(rentDetails);
    let moveIn = document.createElement("p");
    moveIn.innerHTML = `<b>Move in</b>: ${listing.propertyAvailableDate}`;
    moveIn.id = "moveIn";
    listingDetails.appendChild(moveIn);
    let parking = document.createElement("p");
    if (listing.propertyOther.hasAssignedParking === true) {
      parking.innerHTML = `<b>Parking</b>: Yes`;
    } else {
      parking.innerHTML = `<b>Parking</b>: No`;
    }
    parking.id = "parking";
    listingDetails.appendChild(parking);
    let lease = document.createElement("p");
    lease.innerHTML = `<b>Lease Period</b>: ${listing.propertyLeasePeriod}`;
    lease.id = "lease";
    listingDetails.appendChild(lease);

    let description = document.createElement("h3");
    description.innerHTML = "Description";
    description.id = "description";
    listingDetails.appendChild(description);
    let descriptionP = document.createElement("p");
    descriptionP.innerHTML = `${uppercaseFirstLetter(listing.propertyType)}`;
    descriptionP.id = "descriptionP";
    listingDetails.appendChild(descriptionP);

    let location = document.createElement("h3");
    location.innerHTML = "Location";
    location.id = "location";
    listingDetails.appendChild(location);
    let locationMap = document.createElement("div");
    locationMap.id = "locationMap";
    listingDetails.appendChild(locationMap);
    let m = L.map("locationMap");
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(m);
    m.setView(
      [
        listing.propertyAddress.location.lat,
        listing.propertyAddress.location.lng,
      ],
      13
    );
    L.marker([
      listing.propertyAddress.location.lat,
      listing.propertyAddress.location.lng,
    ]).addTo(m);

    let rent = document.createElement("h3");
    rent.innerHTML = `${listing.propertyRentPrice} / month`;
    rent.id = "rent";
    listingContact.appendChild(rent);

    let listedBy = document.createElement("p");
    listedBy.innerHTML = "<b>Listed by</b>";
    listedBy.id = "listedBy";
    let listingCreator = document.createElement("p");
    let creator = await getUser(listing.createdBy);
    listingCreator.innerHTML = `${creator.firstName} ${creator.lastName}`;
    listingCreator.id = "listingCreator";
    listedBy.appendChild(listingCreator);
    listingContact.appendChild(listedBy);

    let message = document.createElement("p");
    message.innerHTML = "<b>Interested?</b>";
    message.id = "message";
    let messageBox = document.createElement("textarea");
    messageBox.placeholder = "Drop a message";
    messageBox.id = "messageBox";
    message.appendChild(messageBox);
    listingContact.appendChild(message);

    let contactBtn = document.createElement("button");
    contactBtn.innerHTML = "Contact Owner";
    contactBtn.className = "btn btn-primary";
    contactBtn.id = "contactBtn";
    listingContact.appendChild(contactBtn);
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
    titleH2.innerHTML = listing.propertyType;
    titleH2.style.textTransform = "capitalize";
    titleH2.style.margin = "0.4rem 0";

    let titleSpan = document.createElement("span");
    titleSpan.innerHTML = `${listing.propertyRooms.bedroomCount} Bedroom(s) | ${listing.propertyRooms.bathroomCount} BathRoom(s)`;
    titleSpan.style.height = "1rem";

    let addressDiv = document.createElement("div");
    addressDiv.className = "listing-address";
    addressDiv.innerHTML = `${listing.propertyAddress.unitNumber} ${listing.propertyAddress.address}`;
    addressDiv.style.height = "3rem";

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
    markers.map((m) => m.remove());
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
                return (
                  l.propertyRentPrice >= 3000 && l.propertyRentPrice <= price
                );
              case 4001:
                return l.propertyRentPrice > 4000;
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

  searchbarRef((filter) => {

    console.log(filter);
    const filteredList =
      filter === ""
        ? listings
        : listings.filter((l) => l.propertyType.includes(filter) || l.propertyDescription.includes(filter));
    renderListings(filteredList);
  });
};
