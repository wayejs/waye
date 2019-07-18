<template>
  <el-date-picker
    v-bind="$attrs"
    v-model="currentDate"
    class="wy-date-picker"
    :clearable="false"
    :editable="false"
    :picker-options="currPickerOptions"
    @change="handleChange">
  </el-date-picker>
</template>

<script>
import moment from 'moment'
export default {
  inheritAttrs: false,
  name: 'WyDatePicker',
  model: {
    prop: 'selected',
    event: 'selected-change'
  },
  props: {
    // 没有年，如 MMDD
    notYearly: Boolean,
    pickerOptions: Object,
    selected: [Number, String, Array]
  },
  data () {
    return {
      currentDate: this.toDate(this.selected),
      currPickerOptions: this.pickerOptions || {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    currentFormat () {
      if (this.notYearly) {
        return 'MMDD'
      }
      if (this.$attrs.type === 'year') {
        return 'YYYY'
      } else if (this.$attrs.type === 'month') {
        return 'YYYYMM'
      } else {
        return 'YYYYMMDD'
      }
    }
  },
  watch: {
    selected (val) {
      this.currentDate = this.toDate(val)
    },
    currentDate (val) {
      if (val) {
        this.$emit('selected-change', moment(val).format(this.currentFormat))
      }
    },
    pickerOptions: {
      deep: true,
      handler (options) {
        if (options) {
          this.currPickerOptions = options
        }
      }
    }
  },
  methods: {
    toDate (val) {
      if (!val) return ''
      let now = moment()
      let month = now.format('MM')
      let date = '01'
      let year = now.format('YYYY')
      if (this.notYearly) {
        month = val.slice(0, 2)
        date = val.slice(2, 4)
      } else if (this.$attrs.type === 'year') {
        year = val
      } else {
        year = val.slice(0, 4)
        month = val.slice(4, 6)
        if (!this.$attrs.type) {
          date = val.slice(6, 8)
        }
      }
      return new Date(`${year}-${month}-${date}T00:00:00`)
    },
    handleChange (e) {
      this.$emit('change', e)
    }
  }
}
</script>
