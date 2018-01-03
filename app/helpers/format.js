import moment from 'moment'

export const convertMomentToString = value => {
  return moment(value, 'llll')
    .format('DD/MM/YYYY')
    .toString()
}
