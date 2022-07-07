export const mapCtrl = () => {
  var map = L.map("map")
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

  let loc;
  const success = (position) => {
    loc = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    map.setView([loc.lat, loc.lng], 13);
    let marker = L.marker([
      loc.lat, loc.lng
    ]).addTo(map);
    marker.bindPopup(
      `<b>You are here</b>`
    );
  };

  const error = () => {
    return { error: "Geolocation is not supported by your brwser" };
  };

  navigator.geolocation.getCurrentPosition(success, error);
  console.log(loc)
};
