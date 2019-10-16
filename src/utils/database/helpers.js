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

export const setConfig = () => {
  const config = JSON.parse(JSON.stringify(configSample))
  return config
}

export const setOptions = () => {
  const options = JSON.parse(JSON.stringify(optionsSample))
  return options
}

export const setFetchBatchOptions = () => {
  const options = JSON.parse(JSON.stringify(optionsFetchBatchDocsSample))
  return options
}
