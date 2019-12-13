<script>
export default {
  name: 'WyBadgeStatus',
  props: {
    // 类型 primary/info/danger/success
    type: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    }
  },

  render () {
    const { prefixCls, $slots, type } = this
    const name = 'badge-status'
    const elCls = `${prefixCls}-${name}`
    const dotCls = `${prefixCls}-${name}__dot is-${type}`
    const textCls = `${prefixCls}-${name}__text`
    return (
      <span class={elCls}>
        <span class={dotCls}></span>
        <span class={textCls}>
          {$slots.default}
        </span>
      </span>
    )
  }
}
</script>
