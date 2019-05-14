export default function userGeolocation() {
  if (navigator.geolocation) {
    console.log('La Geolocalizacion está soportada')
    navigator.geolocation.getCurrentPosition(success, error)
  } else {
    console.log('Geolocation no está supportada por tu browser')
  }

  function success(getPosition) {
    const latitude = getPosition.coords.latitude
    const longitude = getPosition.coords.longitude
    console.log(
      'la latitud es: ' + latitude + ' y la longitud es: ' + longitude
    )
  }

  function error() {
    console.log('Unable to retrieve your location')
  }
}
