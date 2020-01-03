<template>
  <div>
    <wy-select v-model="value1" :data="list"></wy-select>
    <h3>选程请求，有待参数的</h3>
    <el-input v-model="itemId"></el-input>
    <wy-select v-model="value2" multiple :queryParams="itemId" :fetch="queryItem"></wy-select>
  </div>
</template>

<script>
export default {
  // name: 'DemoSelect',
  data () {
    return {
      value1: '',
      value2: [],
      itemId: '',
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
  },
  methods: {
    queryItem (itemId) {
      let data
      if (!itemId) {
        data = [{
          label: '选项一',
          value: '1'
        }, {
          label: '选项二',
          value: '2'
        }]
      } else {
        data = [{
          label: 'item1',
          value: '11'
        }, {
          label: 'item2',
          value: '22'
        }]
      }

      return new Promise(resolve => {
        resolve(data)
      })
    }
  }
}
</script>
