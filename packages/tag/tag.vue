<template>
  <el-tag
    v-bind="$attrs"
    @close="handleClose"
    @click.native="handleClick"
    @mouseenter.native="handleMouseenter"
    @mouseleave.native="handleMouseleave"
    :class="[`${prefixCls}-tag`]">
    <wy-icon v-if="icon" :name="icon"></wy-icon>
    <span v-if="label" :class="[`${prefixCls}-tag__title`]">
      {{label}}
    </span>
    <slot></slot>
  </el-tag>
</template>

<script>
import WyIcon from 'packages/icon'
export default {
  name: 'WyTag',
  inheritAttrs: false,
  components: {
    WyIcon
  },
  props: {
    icon: String,
    label: String
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    handleClick () {
      this.$emit('click')
    },
    handleMouseenter (e) {
      this.$emit('mouseenter', e)
    },
    handleMouseleave (e) {
      this.$emit('mouseleave', e)
    }
  }
}
</script>
