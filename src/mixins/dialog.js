export default {
  model: {
    prop: 'show',
    event: 'show-change'
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      showDialog: false
    }
  },

  watch: {
    show (val) {
      this.$emit('show-change', val)
      if (val) {
        this.showDialog = true
      }
    },

    showDialog (val) {
      if (!val) {
        this.$emit('show-change', false)
      }
    }
  },

  methods: {
    handleClose () {
      this.showDialog = false
      this.$emit('show-change', false)
    }
  }
}
