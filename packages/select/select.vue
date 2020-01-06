<template>
  <el-select
    :class="[`${prefixCls}-select`]"
    v-model="currentValue"
    v-bind="$attrs"
    :filterable="filterable">
    <el-option
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      :label="item.label"
      v-for="item in list">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'WySelect',
  inheritAttrs: false,
  model: {
    prop: 'selected',
    event: 'selected-change'
  },
  props: {
    // 下拉列表请求方法
    fetch: Function,
    queryParams: [Object, String, Number],
    // 静态数据
    data: Array,
    defaultFirst: Boolean,
    filterable: {
      type: Boolean,
      default: true
    },
    // 值 key , 以后弃用
    value: String,
    // 文本 key，以后弃用
    label: String,
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    // 处理数据, value, key 设置失效
    postData: Function,
    disabledKey: {
      type: String,
      default: 'disabled'
    },
    // 显示全部
    hasAll: Boolean,
    // 全部的默认文本
    allText: {
      type: String,
      default: '全部'
    },
    // 当前已选择的，用 v-model 方式定义即可
    selected: {
      type: [Number, String, Array],
      default: ''
    }
  },

  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    }
  },

  watch: {
    data (val) {
      if (val) {
        this.transformData(val)
      }
    },
    selected (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('selected-change', val)
      if (val) {
        if (this.$attrs.multiple !== void 0) {
          this.$emit('change', val)
        } else {
          let item = this.list.find(n => n.value === val)
          if (item) {
            this.$emit('change', item)
          }
        }
      } else {
        this.$emit('change', '')
      }
    },
    queryParams: {
      deep: true,
      handler () {
        if (typeof this.fetch === 'function') {
          this.fetchData()
          this.currentValue = null
        }
      }
    }
  },
  data () {
    return {
      list: [],
      currentValue: this.selected || ''
    }
  },
  created () {
    let { value, label, disabled } = this
    if ((value && value !== 'value') || (label && label !== 'label')) {
      console.warn('[QlSelect] 参数 value 和 label 将会弃用，请用 valueKey, labelKey')
    }
    if (disabled && disabled !== 'disabled') {
      console.warn('[QlSelect] 参数 disabled 将会弃用，请用 disabledKey')
    }
  },
  mounted () {
    if (typeof this.fetch === 'function') {
      this.fetchData()
    } else if (Array.isArray(this.data)) {
      this.transformData(this.data)
    }
  },
  methods: {
    fetchData () {
      this.fetch(this.queryParams).then(data => {
        this.transformData(data)
      })
    },
    transformData (data) {
      if (typeof this.postData === 'function') {
        data = this.postData(data)
      } else {
        let valueKey = this.value || this.valueKey || 'value'
        let labelKey = this.label || this.labelKey || 'label'
        data.forEach(item => {
          item.value = item[valueKey]
          item.label = item[labelKey]
          item.disabled = item[this.disabledKey] || false
        })
      }

      if (this.hasAll) {
        data = [{ label: this.allText, value: '' }].concat(data)
      }
      this.list = data
      if (this.defaultFirst && this.list.length) {
        this.$nextTick(() => {
          this.currentValue = this.list[0].value
        })
      }
    }
  }
}
</script>
