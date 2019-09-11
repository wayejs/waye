<template>
  <div>
    <wy-select v-model="value1" :data="list"></wy-select>
  </div>
</template>

<script>
export default {
  // name: 'DemoSelect',
  data () {
    return {
      value1: '',
      list: [
        {
          label: 'A',
          value: 'a'
        },
        {
          label: 'b',
          value: 'b'
        }
      ]
    }
  }
}
</script>
