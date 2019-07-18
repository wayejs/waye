<template>
  <table
    cellpadding="0"
    cellspacing="0"
    :class="{
      'wy-table--border': border,
      'wy-table--center': center,
      'wy-table--compact': compact,
      'is-gray': gray,
      'is-dark': dark,
      'is-fixed-cell': fixedCell
    }"
    class="wy-table">
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
  data () {
    return {
    }
  },
  mounted () {

  }
}
</script>
