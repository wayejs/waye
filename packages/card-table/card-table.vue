<template>
  <el-card class="wy-card-table">
    <template slot="header">
      <div class="wy-card-table__title">
        <slot name="title">
          {{title}}
        </slot>
      </div>
      <div v-if="$slots.action" class="wy-card-table__action">
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
  data () {
    return {
    }
  }
}
</script>
