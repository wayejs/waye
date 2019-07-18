import moment from 'moment'
export default {
  formatDate (val) {
    return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  fixed2 (val, fixed = 2) {
    return typeof val === 'number' ? val.toFixed(fixed) : ''
  }
}
