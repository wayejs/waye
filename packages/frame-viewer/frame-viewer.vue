<template>
  <el-dialog :class="[`${prefixCls}-frame-viewer`]" fullscreen :visible="showDialog">
    <div
      :class="[`${prefixCls}-frame-viewer__header`]">
      <h3>{{title}}</h3>
      <span
        :class="[`${prefixCls}-frame-viewer__close`]"
        @click="handleClose">
        关闭
      </span>
    </div>
    <iframe v-if="showDialog" :class="[`${prefixCls}-frame-viewer__body`]" :src="url" frameborder="0"></iframe>
  </el-dialog>
</template>

<script>
import Dialog from '../../src/mixins/dialog'
export default {
  name: 'WyFrameViewer',
  mixins: [Dialog],
  props: {
    title: String,
    url: String
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    handleClose () {
      this.showDialog = false
    }
  }
}
</script>
