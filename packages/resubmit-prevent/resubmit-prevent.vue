<template>
  <el-button v-bind="$attrs" :loading="loading" @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'WyResubmitPrevent',
  props: {
    fetch: Function,
    params: [String, Object]
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleClick () {
      this.loading = true
      this.fetch().then(data => {
        this.$emit('success', data)
        this.loading = false
      }).catch(error => {
        this.$emit('error', error)
        this.loading = false
      })
    }
  }
}
</script>
