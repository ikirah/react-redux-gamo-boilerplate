import _ from 'lodash'

class ApplicationError extends Error {
  constructor({ type, trxId, processInstance, fault, displayMessages }) {
    super(type)
    this.type = type || 'ERROR'
    this.trxId = trxId
    this.processInstance = processInstance
    // key of fault object
    this.code = _.get(fault, 'code', '')
    this.fault = fault || {}
    // key of display messages arrays
    this.displayMessages = displayMessages
    this.message = {
      th: _.get(displayMessages, '0.th-message', ''),
      en: _.get(displayMessages, '0.en-message', ''),
      technical: _.get(displayMessages, '0.technical-message', '')
    }
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(type).stack
    }
  }
}

export const convertServiceResponseToError = res => {
  return new ApplicationError({
    type: getErrorType(res),
    trxId: _.get(res, 'trx-id', ''),
    processInstance: _.get(res, 'process-instance', ''),
    status: _.get(res, 'status', ''),
    fault: _.get(res, 'fault', {}),
    displayMessages: _.get(res, 'display-messages.0', {})
  })
}

export const convertJarvisError = res => {
  return new ApplicationError({
    type: getErrorType(res),
    trxId: _.get(res, 'trx-id', ''),
    processInstance: _.get(res, 'process-instance', ''),
    status: _.get(res, 'status', ''),
    fault: _.get(res, 'fault', {}),
    displayMessages: _.get(res, 'displayMessages.0', {})
  })
}

export const getErrorType = res => {
  return _.get(res, 'display-messages.0.message-type', 'ERROR')
}

export const convertApplicationErrorToError = errorMessage => {
  return new ApplicationError({
    type: _.get(errorMessage, 'type', ''),
    fault: {
      name: '',
      code: _.get(errorMessage, 'code', ''),
      message: '',
      detailedMessage: ''
    },
    displayMessages: {
      thMessage: _.get(errorMessage, 'th', ''),
      enMessage: _.get(errorMessage, 'en', ''),
      technicalMessage: _.get(errorMessage, 'technical', '')
    }
  })
}

export const isServiceError = res => {
  if (res.status.toUpperCase() === 'UNSUCCESSFUL') return true
  return res.fault !== undefined
}
