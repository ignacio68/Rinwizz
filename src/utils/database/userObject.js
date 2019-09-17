export const userObject = {
  _id: '', // id único del usuario -> id proporcionado por Firbase Auth
  type: 'user', // topo de docuemnto
  name: '', // nombre del usuario
  screenName: '', // nombre de usuario de la cuenta de Rinwizz -> user name Firebase Auth
  location: '', // dirección del usuario
  extendLocation: {
    country: '',
    countryCode: '',
    locality: '',
    subRegion: '',
    fullName: '',
    geo: {
      lat: '',
      lng: ''
    }
  }, // dirección estructurada del usuario
  description: '', // descripción del usuario
  protected: false, // visible?
  url: '', // dirección HTTP del usuario
  providerId: '', // nombre del provider
  creationDate: '', // fecha de creación del usuario
  lastSignInDate: '', // Ultima fecha de acceso del usuario
  isAnonymous: true, // anónimo?
  isVerified: false, // verificado?
  followersCount: 0, // número de seguidores
  followingCount: 0, // número de usuarios a los que sigue
  alertsCount: 0, // número de alertas emitidas
  avatar: '', // imágen del usuario
  email: '', // email del usuario utilizado en la autorización
  phone: '', // telefono del usuario utilizado en la autorizacion
  alertPhone: '', // telefono para alertas
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
