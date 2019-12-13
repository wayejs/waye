<template>
  <el-card :class="[`${prefixCls}-card-table`]">
    <template slot="header">
      <div :class="[`${prefixCls}-card-table__title`]">
        <slot name="title">
          {{title}}
        </slot>
      </div>
      <div v-if="$slots.action" :class="[`${prefixCls}-card-table__action`]">
        <slot name="action"></slot>
      </div>
    </template>
    <wy-table>
      <slot></slot>
    </wy-table>
  </el-card>
</template>

<script>
export default {
  name: 'WyCardTable',
  props: {
    title: String
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    }
  }
}
</script>
