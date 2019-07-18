import moment from 'moment'

export default {
  props: {
    // 时间范围月份间隔
    monthInterval: {
      type: Number,
      default: 2
    },
    // 最大时间
    maxTime: {
      type: [Object, String, Date]
    }
  },
  data () {
    let startTime
    let endTime
    if (this.lessThanToday()) {
      startTime = moment(this.maxTime).subtract(this.monthInterval - 1, 'month')
      endTime = moment(this.maxTime)
    } else {
      startTime = moment().subtract(this.monthInterval - 1, 'month')
      endTime = moment()
    }
    return {
      startTime,
      endTime,
      startPickerOptions: {
        disabledDate (time) {
          return time.getTime() > endTime.valueOf()
        }
      },
      endPickerOptions: {
        disabledDate (time) {
          return time.getTime() > endTime.valueOf() || time.getTime() < startTime.valueOf()
        }
      }
    }
  },
  computed: {
    daterange () {
      return [this.startTime, this.endTime]
    }
  },
  watch: {
    startTime (val) {
      if (val) {
        this.updateStartPicker(val)
      }
    },
    endTime (val) {
      if (val) {
        this.updateEndPicker(val)
      }
    }
  },
  methods: {
    lessThanToday () {
      return this.maxTime && moment(this.maxTime).diff(moment()) < 0
    },
    updateStartPicker (val) {
      let maxTime = this.maxTime ? moment(this.maxTime).valueOf() : Date.now()
      this.endPickerOptions = {
        disabledDate (time) {
          return time.getTime() < val.valueOf() || time.getTime() > maxTime
        }
      }
    },
    updateEndPicker (val) {
      this.startPickerOptions = {
        disabledDate (time) {
          return time.getTime() > val.valueOf()
        }
      }
    }
  }
}
