<template>
  <span class="wy-badge-status">
    <span class="wy-badge-status__dot" :class="[currCls]"></span>
    <span class="wy-badge-status__text"><slot></slot></span>
  </span>
</template>

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
    currCls () {
      return `is-${this.type}`
    }
  },
  data () {
    return {
    }
  }
}
</script>
