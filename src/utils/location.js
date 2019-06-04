'use strict'

export default {
  const options = {
    autowatch: true,
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  },
  success({ coords: { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed }, timestamp }) => {
  commit ('LOCATION_CHANGED')
  }
  getCurrentPosition(maximumAge) {
    options.maximumAge = maximumAge
    navigator.geolocation.getCurrentPosition(success, error, options)
  },
  
}
