<template>
  <el-card :class="[`${prefixCls}-card`]" shadow="hover" :body-style="{padding: 0}">
    <div slot="header" v-if="title">
      <span>{{title}}</span>
    </div>
    <div :class="[`${prefixCls}-card__body`]">
      <slot></slot>
    </div>
    <div :class="[`${prefixCls}-card__actions`]" v-if="actions && actions.length">
      <div
        :class="[`${prefixCls}-card__actions-item`]"
        :style="actionStyle"
        :key="item.text"
        @click="item.handler"
        v-for="item in actions">
        {{item.text}}
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'WyCard',
  props: {
    title: String,
    actions: Array
  },
  computed: {
    actionStyle () {
      if (this.actions && this.actions.length) {
        return {
          width: 100 / this.actions.length + '%'
        }
      }
      return ''
    }
  },
  data () {
    return {
    }
  }
}
</script>
