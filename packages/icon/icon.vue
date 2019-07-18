<template>
  <i :class="[cls]" @click="handleClick"></i>
</template>

<script>
export default {
  name: 'WyIcon',
  props: {
    name: String
  },
  computed: {
    cls () {
      if (this.name) {
        return `wyicon icon-${this.name}`
      }
      return ''
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
