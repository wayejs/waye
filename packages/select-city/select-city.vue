<template>
  <div :class="[`${prefixCls}-select-city`]">
    <el-select
      filterable
      v-model="provinceId"
      placeholder="请选择省"
      :clearable="clearable">
      <el-option
        :key="item.id"
        :label="item.province"
        :value="item.provinceId"
        v-for="item in provinceList">
      </el-option>
    </el-select>
    <el-select
      filterable
      :disabled="!cityList.length"
      v-model="cityId"
      placeholder="请选择市"
      :clearable="clearable">
      <el-option
        :key="item.id"
        :label="item.city"
        :value="item.cityId"
        v-for="item in cityList">
      </el-option>
    </el-select>
    <el-select
      v-if="showArea"
      filterable
      :disabled="!areaList.length"
      v-model="areaId"
      placeholder="请选择区"
      :clearable="clearable">
      <el-option
        :key="item.id"
        :label="item.area"
        :value="item.areaId"
        v-for="item in areaList">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import emitter from 'main/mixins/emitter'
export default {
  name: 'WySelectCity',
  mixins: [emitter],
  model: {
    prop: 'selected',
    event: 'selected-change'
  },
  props: {
    clearable: Boolean,
    // 需要权限过滤
    needFilter: {
      type: Boolean,
      default: true
    },
    showArea: {
      type: Boolean,
      default: true
    },
    fetchProvince: Function,
    fetchCity: Function,
    fetchArea: Function,
    selected: [String, Number, Array]
  },
  data () {
    return {
      provinceId: '',
      cityId: '',
      areaId: '',
      defaultValue: [],
      provinceList: [],
      cityStore: {},
      areaStore: {},
      valueList: [],
      cityList: [],
      areaList: []
    }
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    },
    isChangeProvince () {
      return this.provinceId !== (this.defaultValue[0] || '')
    },
    isChangeCity () {
      return this.cityId !== (this.defaultValue[1] || '')
    }
  },
  watch: {
    valueList (list) {
      let val = ''
      if (list.length) {
        let newList = list.filter(v => v !== '')
        val = newList[newList.length - 1]
      }
      this.$emit('selected-change', val)
      this.dispatch('ElFormItem', 'el.form.change', val)
    },
    selected (val) {
      if (val) {
        this.processValueList(val)
      } else {
        this.defaultValue = []
        this.valueList = []
        this.provinceId = ''
      }
    },

    cityList (val) {
      let cityId = this.defaultValue.length && this.defaultValue[1]
      if (val.length && cityId && !this.isChangeProvince) {
        this.$nextTick(() => {
          this.cityId = cityId
        })
      } else if (val.length === 1) {
        this.$nextTick(() => {
          this.cityId = val[0].cityId
        })
      }
    },
    areaList (val) {
      let areaId = this.defaultValue.length && this.defaultValue[2]
      if (val.length && areaId && !this.isChangeCity) {
        this.$nextTick(() => {
          this.areaId = areaId
        })
      } else if (val.length === 1) {
        this.$nextTick(() => {
          this.areaId = val[0].areaId
        })
      }
    },
    provinceId (val) {
      this.cityId = ''
      this.areaId = ''
      this.cityList = []
      this.areaList = []
      this.valueList = [val, '', '']
      const query = this.fetchCity
      if (val) {
        if (this.cityStore[val]) {
          this.cityList = this.cityStore[val]
          return false
        }
        query({
          needFilter: this.needFilter,
          provinceId: val
        }).then(data => {
          this.cityStore[val] = this.cityList = data
        })
      }
    },
    cityId (val) {
      this.areaId = ''
      this.areaList = []
      this.valueList = [this.provinceId, val, '']
      if (val && this.showArea) {
        const query = this.fetchArea
        if (this.areaStore[val]) {
          this.areaList = this.areaStore[val]
          return false
        }
        query({
          needFilter: this.needFilter,
          cityId: val
        }).then(data => {
          this.areaStore[val] = this.areaList = data
        })
      }
    },
    areaId (val) {
      this.valueList = [this.provinceId, this.cityId, val]
    }
  },
  mounted () {
    this.fetchProvince({ needFilter: this.needFilter }).then(data => {
      this.provinceList = data
      if (this.selected) {
        this.processValueList(this.selected)
      }
    })
  },
  methods: {
    getCityList () {
      return this.cityList
    },
    processValueList (val) {
      val = val + ''
      const v1 = val.slice(0, 2)
      const v2 = val.slice(2, 4)
      const v3 = val.slice(-2)
      const provinceId = parseInt(`${v1}0000`)
      let cityId = this.cityId = ''
      let areaId = this.areaId = ''
      if (v2 !== '00') {
        cityId = this.cityId = parseInt(`${v1}${v2}00`)
      }
      if (v3 !== '00') {
        areaId = this.areaId = parseInt(val)
      }
      const list = this.valueList = [provinceId, cityId, areaId]
      if (!this.defaultValue.length) {
        this.provinceId = provinceId
        this.defaultValue = list
      }
    }
  }
}
</script>
