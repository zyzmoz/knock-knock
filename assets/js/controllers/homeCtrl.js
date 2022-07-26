import { findMany } from '../integrations/firebase.js';

export const homeCtrl = () => {
  let map = L.map('listingMap');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  const success = (position) => {
    console.log(position);
    map.setView([position.coords.latitude, position.coords.longitude], 13);
  };

  const error = () => {
    return { error: 'Geolocation is not supported by your brwser' };
  };

  navigator.geolocation.getCurrentPosition(success, error);

  const showSingleListing = (listing) => {
    listingDiv.style.opacity = 0;
    listingDiv.style.position = 'absolute';
    listingDiv.style.visibility = 'hidden';
    singleListingDiv.style.position = 'relative';
    singleListingDiv.style.visibility = 'visible';
    singleListingDiv.style.opacity = 1;

    // Set UI values

    console.log(listing);

    singleListingView.style.padding = '1rem';
    singleListingView.style.display = 'block';
    singleListingView.style.width = '600px';
    singleListingView.style.margin = 'auto';

    propertyType.innerHTML = `<i>Type</i> : ${listing.propertyType}`;
    propertyType.style.textTransform = 'capitalize';

    propertyDescription.innerHTML = `<i>Description</i> : ${listing.propertyDescription}`;

    listing.propertyImages.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.url;
      img.style.width = '200px';
      img.style.height = 'auto';
      img.style.margin = '1rem';
      propertyImages.appendChild(img);
    });

    propertyRent.innerHTML = `$${listing.propertyRentPrice}`;
  };

  showListingsBtn.addEventListener('click', () => {
    singleListingDiv.style.opacity = 0;
    singleListingDiv.style.position = 'absolute';
    singleListingDiv.style.visibility = 'hidden';
    listingDiv.style.position = 'relative';
    listingDiv.style.visibility = 'visible';
    listingDiv.style.opacity = 1;
  });

  const createListingCard = (listing) => {
    let cardDiv = document.createElement('div');

    cardDiv.addEventListener('click', () => {
      showSingleListing(listing);
    });
    cardDiv.id = listing.id;
    cardDiv.className = 'listing-card';

    let cardImage = document.createElement('img');
    cardImage.src = listing.propertyImages[0]?.url;

    let descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'listing-description';

    let titleH2 = document.createElement('h4');
    titleH2.innerHTML = listing.propertyDescription;

    let titleSpan = document.createElement('span');
    titleSpan.innerHTML = `${listing.propertyRooms.bedroomCount} Bedroom(s) | ${listing.propertyRooms.bathroomCount} BathRoom(s)`;

    let addressDiv = document.createElement('div');
    addressDiv.className = 'listing-address';

    addressDiv.innerHTML = `${listing.propertyAddress.unitNumber} ${listing.propertyAddress.address}`;

    descriptionDiv.appendChild(titleH2);
    descriptionDiv.appendChild(titleSpan);
    descriptionDiv.appendChild(addressDiv);

    let priceDiv = document.createElement('div');
    priceDiv.className = 'listing-price';

    priceDiv.innerHTML = `${listing.propertyRentPrice} / month`;

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(descriptionDiv);
    cardDiv.appendChild(priceDiv);

    return cardDiv;
  };

  toggleMap.addEventListener('click', () => {
    if (listingMap.classList.toString().includes('show')) {
      toggleMapStatus.innerHTML = 'View';
    } else {
      toggleMapStatus.innerHTML = 'Hide';
    }
    listingMap.classList.toggle('show');
  });

  findMany('listings', (res) => {
    listingMessage.innerHTML = `<b>Showing ${res?.length || 0} apartment(s) and house(s)</b>`;
    listingView.innerHTML = '';
    res?.map((r) => {
      let marker = L.marker([r.propertyAddress.location.lat, r.propertyAddress.location.lng]).addTo(map);

      listingView.appendChild(createListingCard(r));
    });
  });
};
