<template>
  <div :class="[`${prefixCls}-search`]">
    <div :class="[`${prefixCls}-search__header`]" v-if="hasQuery">
      <slot name="toggle"></slot>
      <div
        :class="[
          `${prefixCls}-search--simple`,
          {
            'is-right': hasAdvanced
          }
        ]"
        v-show="simple">
        <el-form :inline="true" :model="model" ref="simpleForm">
          <slot name="simple"></slot>
          <el-form-item label="开始时间" v-if="showDaterange && !hasAdvanced">
            <el-date-picker v-model="startTime" id="startTime" :type="dateType" :format="displayDateFormat" :picker-options="startPickerOptions" :editable="false" :clearable="false" placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" v-if="showDaterange && !hasAdvanced">
            <el-date-picker v-model="endTime" id="endTime" :type="dateType" :format="displayDateFormat" :picker-options="endPickerOptions" :editable="false" :clearable="false" placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button v-if="showButtonSearch" icon="el-icon-search" native-type="submit" type="primary" @click.prevent="handleSearch">搜索</el-button>
            <el-button v-if="hasReset" @click="handleResetForm('simpleForm')">重置</el-button>
            <el-button type="text" v-if="hasAdvanced" @click="simple = false">展开 <i class="el-icon-arrow-down"></i></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div :class="[`${prefixCls}-search--advanced`]"  v-show="!simple">
        <el-form :model="model" ref="advancedForm" :label-width="labelWidth">
           <slot name="advanced"></slot>
           <el-row>
             <el-col :span="8">
               <el-form-item label="开始时间" v-if="showDaterange">
                <el-date-picker v-model="startTime" id="startTime" :type="dateType" :format="displayDateFormat" :picker-options="startPickerOptions" :editable="false" :clearable="false" placeholder="开始时间">
                </el-date-picker>
              </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item label="结束时间" v-if="showDaterange">
                  <el-date-picker v-model="endTime" id="endTime" :type="dateType" :format="displayDateFormat" :picker-options="endPickerOptions" :editable="false" :clearable="false" placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
             </el-col>
           </el-row>
           <div :class="[`${prefixCls}-search__btns`]">
             <el-button type="primary" @click.prevent="handleSearch" native-type="submit" icon="el-icon-search">搜索</el-button>
              <el-button @click="handleResetForm('advancedForm')">重置</el-button>
              <el-button type="text" @click="simple = true">收起 <i class="el-icon-arrow-up"></i></el-button>
           </div>
        </el-form>
      </div>
    </div>
    <div
      :class="[
        `${prefixCls}-search__tools-top`,
        {
          'is-right': toolsPosition === 'right',
          'is-left': toolsPosition === 'left'
        }
      ]">
      <slot name="topTools"></slot>
    </div>
    <div :class="[`${prefixCls}-search__body`]" v-loading="loading">
      <el-table
        :span-method="spanMethod"
        :row-class-name="rowClassName"
        :data="tableData"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        :max-height="maxHeight"
        ref="table"
        v-if="columns"
        border>
        <template v-for="col in columns">
          <el-table-column
            v-if="col.checkbox"
            :key="col.prop"
            type="selection"
            :width="col.width || 55">
          </el-table-column>
          <el-table-column
            v-else-if="col.formatter"
            :key="col.prop"
            :label="col.label"
            :formatter="col.formatter"
            :show-overflow-tooltip="col.tooltip || false"
            :width="col.width || ''">
          </el-table-column>
          <el-table-column
            v-else
            :prop="col.prop"
            :label="col.label"
            :key="col.prop"
            :show-overflow-tooltip="col.tooltip || false"
            :width="col.width || ''"
            :min-width="col.minWidth || ''"
            :fixed="col.fixed || false">
            <template slot-scope="props">
              <cell-render
                v-if="col.render"
                :render="col.render"
                :row="props.row"
                :index="props.index"
                :column="col">
              </cell-render>
              <template v-else-if="col.formatDate">
                {{props.row[col.prop] | formatDate}}
              </template>
              <template v-else>
                {{props.row[col.prop]}}
              </template>
            </template>
          </el-table-column>
        </template>

      </el-table>
      <slot></slot>
    </div>
    <div :class="[`${prefixCls}-search__footer`]">
      <div :class="[`${prefixCls}-search__tools-bottom`]">
        <slot name="bottomTools"></slot>
      </div>
      <el-pagination
        v-if="hasPager"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="pageLayout"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import datetime from '../../src/mixins/datetime'
import CellRender from './cell-render'
const DEFAULT_KEY_MAPS = {
  list: 'data',
  startTime: 'startTime',
  endTime: 'endTime',
  pageNo: 'pageNo',
  pageSize: 'pageSize',
  totalCount: 'total'
}
export default {
  name: 'WySearch',
  components: {
    CellRender
  },
  mixins: [datetime],
  model: {
    prop: 'result',
    event: 'result-change'
  },
  props: {
    maxHeight: Number,
    // 查询结果
    result: Array,
    columns: Array,
    // 搜索列表类型，table/card
    type: {
      type: String,
      default: 'table'
    },
    // 顶部按钮位置
    toolsPosition: {
      type: String,
      default: 'left'
    },
    // 是否轮询搜索
    polling: Boolean,
    // 轮询的间隔时间
    interval: {
      type: Number,
      default: 10000
    },
    // 搜索之前处理
    beforeSearch: Function,
    // 请求接口函数，返回 promise
    fetch: Function,
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 有重置按钮，针对简易搜索
    hasReset: {
      type: Boolean,
      default: false
    },
    // 显示分页
    showPage: {
      default: true
    },
    // 显示全部，没有分页
    showAll: {
      type: Boolean,
      default: false
    },
    // 显示日期范围
    showDaterange: {
      default: true
    },

    // 显示搜索按钮，如不显示，监听参数变化时，刷新数据
    showButtonSearch: {
      default: true
    },

    // 日期类型，默认天
    dateType: {
      type: String,
      default: 'date'
    },

    // 搜索条件变化时，是否重置 当前页码
    resetCurrentPage: {
      type: Boolean,
      default: true
    },
    // 每页显示的默认条数
    defaultPageSize: {
      type: Number,
      default: 20
    },

    // 可选的每页条数
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 40, 50, 100, 200, 500]
      }
    },

    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },

    keyMaps: Object,
    // 是否自动渲染数据，嵌入在弹框时 有需手动渲染情况
    autorender: {
      type: Boolean,
      default: true
    },
    // 处理查询表单参数
    postData: Function,

    // 处理返回的数据
    parseData: Function,

    // 处理表格的单元格合并
    spanMethod: Function,

    rowClassName: Function,

    // 搜索表单, 如果不是在 slot 创建的 el-form ,直接把要查询的字段放在 model 里即可
    model: Object
  },
  computed: {
    hasPager () {
      return this.pageCount > 0 && this.showPage && !this.showAll
    },
    prefixCls () {
      return this.$WAYE.prefixCls
    },
    currKeyMaps () {
      let keyMaps
      if (this.keyMaps) {
        keyMaps = Object.assign({}, DEFAULT_KEY_MAPS, this.keyMaps)
      }
      return keyMaps || (this.$WAYE && this.$WAYE.searchKeyMaps) || DEFAULT_KEY_MAPS
    },
    hasQuery () {
      return this.showDaterange || this.$slots.simple || this.$slots.advanced || this.$slots.toggle
    },
    hasAdvanced () {
      return this.$slots.advanced
    },
    pageCount () {
      return Math.ceil(this.totalCount / this.pageSize)
    },
    isTable () {
      return this.type === 'table'
    },
    displayDateFormat () {
      if (this.dateType === 'date') {
        return 'yyyy年MM月dd日'
      } else if (this.dateType === 'month') {
        return 'yyyy年MM月'
      }
      return 'yyyy年MM月dd日 HH:mm:ss'
    },
    submitDateFormat () {
      if (this.dateType === 'date') {
        return 'YYYYMMDD'
      } else if (this.dateType === 'month') {
        return 'YYYYMM'
      }
      return 'YYYYMMDDHHmmss'
    }
  },
  watch: {
    model: {
      deep: true,
      handler (val) {
        if (this.$slots.toggle || !this.showButtonSearch) {
          this.refresh()
        }
      }
    },
    simple (val) {
      this.$emit('query-expand', val)
    },
    defaultPageSize (val) {
      if (val) {
        this.pageSize = val
        this.currentPage = 1
        this.fetchData()
      }
    }
  },
  data () {
    return {
      loading: false,
      // 控制高级和简单搜索切换
      simple: true,
      // 当前页面
      currentPage: 1,
      // 每页显示的条数
      pageSize: this.defaultPageSize,
      // 总数据数
      totalCount: 0,
      tableData: [],
      timer: null
    }
  },
  mounted () {
    this.pageSize = this.defaultPageSize
    if (typeof this.beforeSearch === 'function') {
      this.beforeSearch()
    }
    this.autorender && this.fetchData()
    if (this.polling) {
      this.startPolling()
    }
  },
  methods: {
    startPolling () {
      this.stopPolling()
      this.timer = window.setInterval(() => {
        this.currentPage = 1
        this.fetchData()
      }, this.interval)
    },
    stopPolling () {
      this.timer && window.clearInterval(this.timer)
    },
    // 支持直接传查询参数
    refresh (params) {
      this.currentPage = 1
      this.fetchData(params)
    },
    handleSearch () {
      if (this.resetCurrentPage) {
        this.currentPage = 1
      }
      this.fetchData()
      if (this.polling) {
        this.startPolling()
      }
    },
    fetchData (params) {
      let pageNo = this.currentPage
      let pageSize = this.pageSize
      let currForm = params || this.model || {}
      let keyMaps = this.currKeyMaps

      if (!this.showAll) {
        currForm[keyMaps.pageNo] = pageNo
        currForm[keyMaps.pageSize] = pageSize
      }

      this.loading = true

      if (this.showDaterange) {
        let startTime = +moment(this.startTime).format(this.submitDateFormat)
        let endTime = +moment(this.endTime).format(this.submitDateFormat)
        currForm[keyMaps.startTime] = startTime
        currForm[keyMaps.endTime] = endTime
      }

      if (typeof this.postData === 'function') {
        currForm = this.postData(currForm)
      }

      this.fetch(currForm).then(data => {
        let listData = []

        if (!this.showAll) {
          listData = data[keyMaps.list] || []
          this.totalCount = data[keyMaps.totalCount]
        } else {
          listData = data
        }
        if (typeof this.parseData === 'function') {
          listData = this.parseData(listData)
        }
        if (this.columns) {
          this.tableData = listData
        }
        this.loading = false
        this.$emit('search', listData)
        this.$emit('result-change', listData)
      }).catch(() => {
        this.$emit('result-change', [])
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchData()
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    },
    // el-form-item 需设置 prop
    handleResetForm (form) {
      this.$refs[form].resetFields()
      if (this.showDaterange) {
        if (this.lessThanToday()) {
          this.endTime = moment(this.maxTime)
          this.startTime = moment(this.maxTime).subtract(this.monthInterval - 1, 'month')
        } else {
          this.endTime = moment()
          this.startTime = moment().subtract(this.monthInterval - 1, 'month')
        }
      }
      this.$emit('reset')
    },
    handleRowClick (row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    toggleRowSelection (row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    resetForm () {
      if (this.simple) {
        this.$refs.simpleForm.resetFields()
      } else {
        this.$refs.advancedForm.resetFields()
      }
    }
  },
  beforeDestroy () {
    if (this.polling) {
      this.stopPolling()
    }
  }
}
</script>
