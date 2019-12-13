<template>
  <el-dialog
    v-draggable
    :class="[`${prefixCls}-dialog`]"
    v-bind="$attrs"
    :close-on-click-modal="closeOnClickModal"
    :fullscreen="fullscreen"
  >
    <div slot="title">
      <span class="el-dialog__title">{{$attrs.title}}</span>
      <div :class="[`${prefixCls}-dialog__toolbar`]">
        <wy-icon :name="fullscreen ? 'restored' : 'max'" @click="handleToggle"></wy-icon>
      </div>
    </div>
    <slot></slot>
    <div slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </el-dialog>
</template>

<script>
import WyIcon from 'packages/icon'
export default {
  inheritAttrs: false,
  name: 'WyDialog',
  components: {
    WyIcon
  },
  props: {
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fullscreen: false
    }
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    }
  },
  directives: {
    draggable: {
      bind (el, binding, vnode) {
        const dlg = el.getElementsByClassName('el-dialog')[0]
        let header = el.getElementsByClassName('el-dialog__header')[0]
        let methodName = binding.expression
        header.style.userSelect = 'none'
        header.style['-ms-user-select'] = 'none'
        header.style['-moz-user-select'] = 'none'
        header.style.cursor = 'move'

        dlg.offsetX = 0
        dlg.offsetY = 0

        const move = e => {
          dlg.style.marginLeft = '0'
          dlg.style.marginTop = '0'
          dlg.style.left = e.pageX - dlg.offsetX + 'px'
          dlg.style.top = e.pageY - dlg.offsetY + 'px'
        }

        const up = () => {
          removeEventListener('mousemove', move)
          removeEventListener('mouseup', up)
        }

        const down = e => {
          if (e.target.nodeName === 'I') return
          methodName && vnode.context[methodName]()
          dlg.offsetX = e.pageX - dlg.offsetLeft
          dlg.offsetY = e.pageY - dlg.offsetTop
          addEventListener('mousemove', move)
          addEventListener('mouseup', up)
        }

        header.addEventListener('mousedown', down)
      }
    }
  },
  methods: {
    handleToggle (e) {
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>
