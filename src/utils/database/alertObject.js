export const alertObject = {
  _id: '', // usuario._id + creationDate
  type: 'alert',
  title: '', // título de la alerta
  text: '', // texto completo
  user: '', // _id del autor de la alerta
  // user: {
  //  id: ''  _id del emisor
  //  name: '',
  //  screenName: '',
  //  avatar: '',
  //  location: '',
  //  url: '',
  //  description: ''
  // },
  creationDate: 0, // fecha de la creación de la alerta
  endDate: 0, // caducidad de la alerta
  link: '', // link de la alerta
  phone: '', // teléfono de la alerta
  location: {
    // proporcionado por geolocation
    id: '', // id de la localización
    lat: '', // latitud
    lng: '', // longitud
    address: {
      // dirección completa
      houseNumber: '',
      road: '',
      suburb: '',
      city: '',
      county: '',
      state: '',
      postcode: '',
      country: '',
      countryCode: ''
    },
    boundingBox: {
      coordinates: [],
      type: ''
    }
  }, // localización de la alerta
  entities: {}, // hastags, fotos, etc.
  extendedEntities: {}, // videos, fotos,...
  favoriteCount: 0 // numero de veces que la alerta ha sido clicada como favorita
}
