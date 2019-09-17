export const userObject = {
  _id: '', // id único del usuario -> id proporcionado por Firbase Auth
  type: 'user', // topo de docuemnto
  name: '', // nombre del usuario
  screenName: '', // nombre de usuario de la cuenta de Rinwizz -> user name Firebase Auth
  location: '', // dirección del usuario
  extendLocation: {
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
  description: '', // descripción del usuario
  protected: false, // visible?
  verified: '', // el usuario está fverificado por Rinwizz
  url: '', // dirección HTTP del usuario
  providerId: '', // nombre del provider
  creationDate: '', // fecha de creación del usuario
  lastSignInDate: '', // Ultima fecha de acceso del usuario
  isAnonymous: true, // anónimo?
  isVerified: false, // verificado por Firebase?
  followersCount: 0, // número de seguidores
  followingCount: 0, // número de usuarios a los que sigue
  alertsCount: 0, // número de alertas emitidas
  avatar: '', // imágen del usuario
  banner: '', // imágen del banner
  defaultAvatar: true, // utiliza el avatar por defecto?
  defaultBanner: true, // utiliza el bannerpor defecto?
  email: '', // email del usuario utilizado en la autorización
  phone: '', // telefono del usuario utilizado en la autorizacion
  alertPhone: '', // telefono por defecto para alertas
  personal: {
    age: '',
    gender: ''
  }, // datos personales
  preferences: {
    entertainments: [],
    foods: [],
    sports: []
  }, // preferencias de usuario
  following: [], // _id de los usuarios que se siguen
  followers: [] // _id de los usuarios que le siguen
}
