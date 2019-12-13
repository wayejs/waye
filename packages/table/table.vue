<template>
  <table
    cellpadding="0"
    cellspacing="0"
    :class="clsName">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'WyTable',
  props: {
    border: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    // 背景暗色系
    dark: Boolean,
    gray: Boolean,
    // 固定单元格高度为 40 px
    fixedCell: Boolean,
    compact: Boolean
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    },
    clsName () {
      const { prefixCls, border, center, compact, gray, dark, fixedCell } = this
      const ret = [`${prefixCls}-table`]
      if (border) {
        ret.push(`${prefixCls}-table--border`)
      }
      if (center) {
        ret.push(`${prefixCls}-table--center`)
      }
      if (compact) {
        ret.push(`${prefixCls}-table--compact`)
      }
      if (gray) {
        ret.push('is-gray')
      }
      if (dark) {
        ret.push('is-dark')
      }
      if (fixedCell) {
        ret.push('is-fixed-cell')
      }

      return ret.join(' ')
    }
  }
}
</script>
