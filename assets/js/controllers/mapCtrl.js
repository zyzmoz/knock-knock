export const mapCtrl = () => {
  let map = L.map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  let listingLocation;
  const mapDiv = document.getElementById('map');
  const success = (position) => {
    listingLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    mapDiv.setAttribute('data-location', JSON.stringify(listingLocation));

    map.setView([listingLocation.lat, listingLocation.lng], 13);
    let marker = L.marker([listingLocation.lat, listingLocation.lng]).addTo(map);

    let currentPage = window.location.hash;

    if (currentPage === '#listing') {
      marker.bindPopup(`<b>You are here</b>`);
      marker.dragging.enable();
    } else if (currentPage === '#home') {
      marker.bindPopup(`<b>Listing location</b>`);
      marker.dragging.disable();
    } else {
      marker.bindPopup(`<b>You are here</b>`);
      marker.dragging.disable();
    }

    marker.on('move', (e) => {
      let loc = e.latlng;
      listingLocation = {
        lat: loc.lat,
        lng: loc.lng,
      };

      marker.bindPopup(`<b>Your listing location</b>`);

      mapDiv.setAttribute('data-location', JSON.stringify(listingLocation));
    });
  };

  const error = () => {
    return { error: 'Geolocation is not supported by your brwser' };
  };

  navigator.geolocation.getCurrentPosition(success, error);
};
