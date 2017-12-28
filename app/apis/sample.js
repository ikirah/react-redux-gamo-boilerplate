import { POST } from '../helpers/api'

const submitForm = body => {
  return POST('/sample/submit', body)
}

export { submitForm }
