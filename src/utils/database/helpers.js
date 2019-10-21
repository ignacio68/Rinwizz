import { cloudantConfig, authUsers, authAlerts } from '@setup/cloudant'
import {
  userSample,
  alertSample,
  configSample,
  optionsSample,
  optionsFetchBatchDocsSample
} from '@utils/database'

export const setDoc = docData => {
  const doc = JSON.parse(JSON.stringify(userSample))
  for (let key in doc) {
    doc[key] = docData[key]
  }
  return doc
}

export const setAlert = docData => {
  const doc = JSON.parse(JSON.stringify(alertSample))
  for (let key in doc) {
    doc[key] = docData[key]
  }
  return doc
}

export const setConfig = (userId, dbName) => {
  const config = JSON.parse(JSON.stringify(configSample))
  config._id = userId
  config.dbName = 'users'
  config.remote = cloudantConfig.url + '/' + config.dbName
  return config
}

export const setOptions = usersIds => {
  const options = JSON.parse(JSON.stringify(optionsSample))
  options.auth.username = authUsers.key
  options.auth.password = authUsers.password
  options.doc_ids.push(usersIds)
  return options
}

export const setAlertsOptions = usersIds => {
  const options = JSON.parse(JSON.stringify(optionsSample))
  options.auth.username = authAlerts.key
  options.auth.password = authAlerts.password
  options.doc_ids.push(usersIds)
  return options
}

export const setFetchBatchOptions = () => {
  const options = JSON.parse(JSON.stringify(optionsFetchBatchDocsSample))
  return options
}
