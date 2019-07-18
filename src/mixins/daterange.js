import moment from 'moment'
export default {
  data () {
    let endTime = moment()
    let startTime = moment().subtract(1, 'months')
    return {
      daterange: [startTime, endTime],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    daterangeValue () {
      let [startTime, endTime] = this.daterange

      if (startTime && endTime) {
        return [+moment(startTime).format('YYYYMMDD'), +moment(endTime).format('YYYYMMDD')]
      }
    }
  }
}
