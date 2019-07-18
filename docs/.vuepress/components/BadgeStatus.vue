<template>
  <div>
    <h3>状态点</h3>
    <wy-badge-status type="primary">启用</wy-badge-status><br/>
    <wy-badge-status type="danger">禁用</wy-badge-status><br/>
    <wy-badge-status type="success">成功</wy-badge-status><br/>
    <wy-badge-status type="info">默认</wy-badge-status>
  </div>
</template>

<script>
export default {
  name: 'BadgeStatus',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
