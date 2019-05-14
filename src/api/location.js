export function geoFindMe() {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser')
  }

  function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    position = { latitude, longitude }
    return position
  }

  function error() {
    console.log('Unable to retrieve your location')
  }

  navigator.geolocation.getCurrentPosition(success, error)
}
