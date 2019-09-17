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
  alertLink: '', // link de la alerta
  alertPhone: '', // teléfono de la alerta
  alertLocation: {
    id: '', // id de la localización
    lat: '',
    lng: '',
    address: {
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
  entities: {} // hastags, fotos, etc.
}
