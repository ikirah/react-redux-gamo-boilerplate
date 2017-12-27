import { POST } from '../helpers/api'

const submitForm = body => {
  return POST('/something', body)
}

export { submitForm }
