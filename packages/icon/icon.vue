<template>
  <i :class="[cls]" @click="handleClick"></i>
</template>

<script>
export default {
  name: 'WyIcon',
  props: {
    name: String
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    },
    cls () {
      const { name, prefixCls } = this
      if (name) {
        return `${prefixCls}icon icon-${name}`
      }
      return ''
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
