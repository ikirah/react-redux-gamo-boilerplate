import _ from 'lodash'
import { fetchWithJarvis, handleResponseCatchError, convertToURLParam } from 'api-jarvis'
import configs from '../../configs'
import humps from 'humps'

const BASEURL = `${configs.serviceURL}`

export const GET = (url, params) => {
  return fetchFacade(`${url}${convertToURLParam(params)}`, {
    method: 'GET'
  }).then(response => {
    return response
  })
}

export const POST = (url, body, params) => {
  return fetchFacade(`${url}${convertToURLParam(params)}`, {
    method: 'POST',
    body: JSON.stringify(body)
  }).then(response => {
    return response
  })
}

const fetchFacade = (url, options) => {
  console.log('fetchFacade', url)
  const isResponseError = options && options.isResponseError
  const toErrorFormat = options && options.toErrorFormat
  let plugins = !isResponseError && !toErrorFormat ? undefined : {}
  if (isResponseError) {
    plugins = {
      ...plugins,
      isResponseError
    }
  }
  if (toErrorFormat) {
    plugins = {
      ...plugins,
      toErrorFormat
    }
  }
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
    plugins
  ).then(response => {
    handleResponseCatchError(response, isResponseError, toErrorFormat)
    return response
  })
}

export const extractResponseData = response => {
  return convertToCamelCase(_.get(response, 'response-data', ''))
}

export const convertToCamelCase = response => {
  return humps.camelizeKeys(response, function(key, convert) {
    const keyLower = key.toLowerCase()
    return /^[A-Z0-9]+$/.test(key) ? keyLower : convert(keyLower)
  })
}
