<template>
<div :class="[clsName]">
  <el-popover
    v-if="popover"
    placement="top"
    width="160"
    v-model="visible">
    <p>{{message}}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="handleOk">确定</el-button>
    </div>
    <el-button :icon="icon" :type="type" slot="reference"><slot>删除</slot></el-button>
  </el-popover>
  <el-button :icon="icon" v-else :type="type" @click.stop="handleClick">
    <slot>删除</slot>
  </el-button>
</div>

</template>

<script>
export default {
  name: 'WyButtonConfirm',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    // 气泡方式的确认
    popover: Boolean,
    // 接口参数
    params: [String, Number, Object],
    // 接口
    fetch: Function,
    confirmButtonText: {
      type: String,
      default: '删除'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    icon: String,
    iconType: {
      type: String,
      default: 'error'
    },
    confirmButtonClass: {
      type: String,
      default: 'el-button--danger'
    },
    title: {
      type: String,
      default: '删除提示'
    },
    message: {
      type: String,
      default: '确认删除该记录'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    prefixCls () {
      return this.$WAYE.prefixCls
    },
    clsName () {
      return `${this.prefixCls}-button-confirm`
    }
  },
  methods: {
    async handleClick () {
      let { iconType, confirmButtonText, confirmButtonClass, cancelButtonText, message, title } = this
      let confirm = await this.$confirm(message, title, {
        confirmButtonText,
        confirmButtonClass,
        cancelButtonText,
        type: iconType
      })
      if (confirm) {
        await this.submit()
      }
    },
    handleOk () {
      this.visible = false
      this.submit()
    },
    async submit () {
      let data = await this.fetch(this.params)
      if (data) {
        this.$emit('confirm', data)
      }
    }
  }
}
</script>
