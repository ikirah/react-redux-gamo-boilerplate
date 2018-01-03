import _ from 'lodash'
import humps from 'humps'
import configs from '../../configs'
import * as ApplicationAction from '../actions/applicationAction'
import { fetchWithJarvis, handleResponseCatchError, convertToURLParam } from 'api-jarvis'
import { isServiceError, convertServiceResponseToError, convertJarvisError } from './error'
const BASEURL = `${configs.serviceURL}`

export const GET = (url, params) => {
  return fetchFacade(`${url}${convertToURLParam(params)}`, {
    method: 'GET',
    isResponseError: isServiceError,
    toErrorFormat: convertServiceResponseToError
  }).then(response => {
    return response
  })
}

export const POST = (url, body, params) => {
  return fetchFacade(`${url}${convertToURLParam(params)}`, {
    method: 'POST',
    body: JSON.stringify(body),
    isResponseError: isServiceError,
    toErrorFormat: convertServiceResponseToError
  }).then(response => {
    handleResponseCatchError(response, isServiceError, convertServiceResponseToError)
    return response
  })
}

const fetchFacade = (url, options) => {
  const isResponseError = options && options.isResponseError
  const toErrorFormat = options && options.toErrorFormat

  return fetchWithJarvis(
    `${BASEURL}${url}`,
    {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 90,
      ...options
    },
    { isResponseError, toErrorFormat }
  ).then(response => {
    return response
  })
}

export const extractResponseData = (response, camelize = true) => {
  if (camelize) {
    return convertToCamelCase(_.get(response, 'response-data', ''))
  } else {
    return _.get(response, 'response-data', '')
  }
}

export const convertToCamelCase = response => {
  return humps.camelizeKeys(response, function(key, convert) {
    const keyLower = key.toLowerCase()
    return /^[A-Z0-9]+$/.test(key) ? keyLower : convert(keyLower)
  })
}

export const withTryCatch = func => {
  return async (dispatch, getState) => {
    try {
      await func(dispatch, getState)
    } catch (error) {
      dispatch(ApplicationAction.hideLoading())
      let _error = error
      if (/JVS/.test(_.get(error, 'code'))) {
        _error = convertJarvisError(error)
      }
      dispatch(ApplicationAction.openError(_error))
    }
  }
}
