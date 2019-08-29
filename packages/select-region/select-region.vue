<template>
  <div class="wy-select-region">
    <el-select
      class="wy-select-region__item"
      :disabled="disabledProvince"
      :multiple="multiple"
      v-model="provinceId"
      clearable
      @change="provinceChange"
      :placeholder="provincePlaceholder">
      <el-option
        :key="value"
        :label="label"
        :value="value"
        v-for="(label, value) in provinceList">
      </el-option>
    </el-select>
    <el-select
      class="wy-select-region__item"
      v-show="displayCity"
      :disabled="disabledCity"
      :multiple="multiple"
      clearable
      v-model="cityId"
      @change="cityChange"
      placeholder="所有市">
      <el-option
        :key="value"
        :label="label"
        :value="value"
        v-for="(label, value) in cityList">
      </el-option>
    </el-select>
    <el-select
      v-if="!special"
      class="wy-select-region__item"
      clearable
      @change="areaChange"
      :disabled="disabledArea"
      v-show="displayArea"
      :multiple="multiple"
      v-model="areaIds"
      placeholder="所有区">
      <el-option
        :key="value"
        :label="label"
        :value="value"
        v-for="(label, value) in areaList">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import regionApi from './region-cache'
export default {
  name: 'WySelectRegion',
  model: {
    prop: 'selected',
    event: 'selected-change'
  },
  props: {
    selected: {
      type: [Array, String, Number]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否限定管理区域，仅当limitArea为true时limitRegionId才有效
    limitArea: {
      type: Boolean,
      default: function () {
        return (this.$WAYE && this.$WAYE.limitArea) || false
      }
    },
    // 具体限制的地区范围，如果limitArea为true,而limitRegionId为0或''则表示没任何区域授权
    limitRegionId: {
      type: [String, Number],
      default: function () {
        return this.$WAYE && this.$WAYE.limitRegionId
      }
    },
    showArea: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      provinceId: this.multiple ? [] : '',
      cityId: this.multiple ? [] : '',
      areaIds: this.multiple ? [] : '',
      provinceList: [],
      cityList: [],
      areaList: [],
      currentValue: []
    }
  },

  computed: {
    // 香港或澳门行政区
    special () {
      return this.provinceId === '810000' || this.provinceId === '820000'
    },
    limitType () {
      let limitRegionId = this.limitRegionId
      if (!this.limitArea) {
        return 0 // 不限权限
      } else if (parseInt(limitRegionId) === 0 || !limitRegionId) {
        return -1 // 无权限
      }
      return parseInt(limitRegionId)
    },
    limitRangeInfo () {
      return regionApi.parseId(this.limitRegionId)
    },
    provincePlaceholder () {
      return this.limitType === -1 ? '无授权区域' : '请选择省'
    },
    disabledProvince () {
      return this.limitType !== 0
    },

    disabledCity () {
      return !!(this.limitArea && this.limitRangeInfo.cityId)
    },
    disabledArea () {
      return !!(this.limitArea && this.limitRangeInfo.areaIds)
    },
    displayCity () {
      // 多选下，只有选择小于两个省时才显市，单选下，只要选要省就显示市
      return (this.provinceId.length && this.provinceId.length < 2) ||
       (!this.multiple && this.provinceId)
    },

    displayArea () {
      return this.showArea && ((!this.multiple && this.cityId) ||
        (this.cityId.length && this.cityId.length < 2))
    }
  },

  watch: {
    selected (newValue, oldValue) {
      let needUpdate = !this.isEqual(newValue, oldValue)
      if (!needUpdate) {
        return
      }
      this.updateStatus(newValue)
    },

    limitRegionId () {
      this.updateStatus(this.currentValue)
    },

    limitArea () {
      this.updateStatus(this.currentValue)
    }
  },

  created () {
    this.updateStatus(this.selected)
  },

  methods: {
    toValue (value) {
      return this.multiple && !Array.isArray(value) ? [value] : value
    },

    getValue (value) {
      return this.multiple ? value[0] : value
    },

    isSelected (value) {
      return this.multiple ? value && value.length : !!value
    },

    emptyValue () {
      return this.multiple ? [] : ''
    },
    async displayByValue (selected) {
      if (this.limitType < 0) {
        this.provinceId = this.emptyValue()
        this.cityId = this.emptyValue()
        this.areaIds = this.emptyValue()
        return
      }
      if (selected && !this.multiple) {
        selected = parseInt(selected)
      }
      selected = this.isSelected(selected) ? selected : this.limitType > 0 ? this.toValue(this.limitType) : false
      if (selected && (selected.length || !this.multiple)) {
        let firstSelected = this.multiple ? selected[0] : selected
        let first = regionApi.parseId(firstSelected)
        if (first.areaIds) {
          this.provinceList = await regionApi.getProvinceList()
          this.cityList = await regionApi.getCityList(first.provinceId)
          this.areaList = await regionApi.getAreaList(first.cityId)
          this.provinceId = this.toValue(first.provinceId)
          this.cityId = this.toValue(first.cityId)
          this.areaIds = selected
        } else if (first.cityId) {
          this.provinceList = await regionApi.getProvinceList()
          this.cityList = await regionApi.getCityList(first.provinceId)
          this.areaList = await regionApi.getAreaList(first.cityId)
          this.provinceId = this.toValue(first.provinceId)
          this.cityId = selected
          this.areaIds = this.emptyValue()
        } else {
          this.provinceList = await regionApi.getProvinceList()
          this.cityList = await regionApi.getCityList(first.provinceId)
          this.provinceId = selected
          this.cityId = this.emptyValue()
          this.areaIds = this.emptyValue()
        }
      } else {
        this.provinceList = await regionApi.getProvinceList()
        this.provinceId = this.emptyValue()
        this.cityId = this.emptyValue()
        this.areaIds = this.emptyValue()
      }
    },

    areaChange (areaIds) {
      this.emitEvent((this.isSelected(areaIds) ? areaIds : this.cityId))
    },

    async provinceChange (provinceId) {
      let selectedProvince = this.isSelected(provinceId)
      if (selectedProvince && (provinceId.length === 1 || !this.multiple)) {
        this.cityList = await regionApi.getCityList(this.getValue(provinceId))
      }
      // this.cityId = this.cityList.length === 1 ? this.cityList[0].cityId : this.emptyValue()
      this.cityId = this.emptyValue()
      this.emitEvent(provinceId)
    },

    async cityChange (cityId) {
      let selectedCity = this.isSelected(cityId)
      if (this.special) {
        this.emitEvent((selectedCity ? cityId : this.provinceId))
        return
      }
      if (selectedCity && (!this.multiple || cityId.length === 1)) {
        this.areaList = await regionApi.getAreaList(this.getValue(cityId))
      }
      this.areaIds = this.emptyValue()
      this.emitEvent((selectedCity ? cityId : this.provinceId))
    },

    emitEvent (newValue, syncCurrent = true) {
      syncCurrent && (this.currentValue = newValue)
      this.$emit('selected-change', newValue)
    },

    // 判断两个地区码是否是上下级或相同
    isSubRegion (parent, sub) {
      parent = ('' + parent).replace(/0+$/, '')
      const reg = new RegExp(`^${parent}\\d*`)
      return reg.test('' + sub)
    },

    needLimitRangeToValue (limitRegionId, currentValue) {
      // 当前值不存在，或当前值里有限制区域之外的值时
      currentValue = Array.isArray(currentValue) ? currentValue : [currentValue]
      return (!currentValue[0] || currentValue.some(code => {
        return !this.isSubRegion(limitRegionId, code)
      }))
    },

    isEqual (value1, value2) {
      return value1 === value2 || (Array.isArray(value1) && value1.join() === value2.join())
    },

    updateStatus (currentValue) {
      if (this.limitType === -1) {
        let emptyValue = this.emptyValue()
        this.currentValue = emptyValue
        this.$emit('selected-change', emptyValue)
        this.displayByValue()
      } else if (this.limitType > 0 && this.needLimitRangeToValue(this.limitType, currentValue)) {
        // 如果新设置的值在限制范围外，则把值重置成限制区域
        this.$emit('selected-change', this.toValue(this.limitType))
      } else {
        this.displayByValue(currentValue)
        this.currentValue = currentValue
      }
    }
  }
}
</script>
