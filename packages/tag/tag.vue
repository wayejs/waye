<template>
  <el-tag
    v-bind="$attrs"
    @close="handleClose"
    @click.native="handleClick"
    @mouseenter.native="handleMouseenter"
    @mouseleave.native="handleMouseleave"
    class="wy-tag">
    <wy-icon v-if="icon" :name="icon"></wy-icon>
    <span v-if="label" class="wy-tag__title">
      {{label}}
    </span>
    <slot>

    </slot>
  </el-tag>
</template>

<script>
export default {
  name: 'WyTag',
  inheritAttrs: false,
  props: {
    icon: String,
    label: String
  },
  data () {
    return {
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
