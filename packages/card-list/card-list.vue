<template>
  <div :class="[`${prefixCls}-card-list`]">
    <transition-group
      :name="closeTransition ? '' : 'wy-card-list'"
      :class="[`${prefixCls}-card-list__list`]"
      tag="div">
      <el-card
        :key="item[rowKey]"
        :style="itemStyle"
        v-for="item in data"
        :class="[`${prefixCls}-card-list__item`, getItemClassName(item)]"
        @click.native="handleClick(item)">
        <slot :card="item"></slot>
      </el-card>
    </transition-group>
    <div :class="[`${prefixCls}-card-list__empty`]" v-if="!data.length">
      暂无数据
    </div>
  </div>
</template>

<script>
export default {
  name: 'WyCardList',
  props: {
    data: Array,
    closeTransition: {
      default: false
    },
    rowKey: {
      type: String,
      default: 'labId'
    },
    // 自定义每项的类名
    itemClassName: Function,
    itemWidth: {
      type: [String, Number],
      default: 240
    },
    // 间距
    itemOffset: {
      default: 5
    }
  },
  data () {
    return {
    }
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    },
    itemStyle () {
      let { itemOffset, itemWidth } = this
      return {
        width: `${itemWidth}px`,
        margin: `${itemOffset}px`
      }
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('item-click', item)
    },
    getItemClassName (item) {
      if (typeof this.itemClassName === 'function') {
        return this.itemClassName(item)
      }
      return ''
    }
  }
}
</script>
