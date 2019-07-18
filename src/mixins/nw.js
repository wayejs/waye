export default {
  data () {
    return {
      isMaxNw: false,
      nwWin: window.nw ? window.nw.Window.get() : null
    }
  },
  computed: {
    isNw () {
      return typeof window.nw !== 'undefined'
    }
  },
  created () {
    if (this.nwWin) {
      // 任务栏最大化情况
      this.nwWin.on('maximize', () => {
        this.isMaxNw = true
      })
      this.nwWin.on('restore', () => {
        this.isMaxNw = false
      })
    }
  },
  methods: {
    reloadNw () {
      if (this.isNw) {
        this.nwWin.reload()
      } else {
        window.location.reload(true)
      }
    },
    enterFullscreen () {
      this.startPowerSaveBlocker()
      if (this.isNw) {
        this.nwWin.enterFullscreen()
      }
    },
    startPowerSaveBlocker () {
      if (this.isNw) {
        const powerSaveBlocker = window.nw.global.powerSaveBlocker
        powerSaveBlocker && powerSaveBlocker.start()
      }
    },
    stopPowerSaveBlocker () {
      if (this.isNw) {
        const powerSaveBlocker = window.nw.global.powerSaveBlocker
        powerSaveBlocker && powerSaveBlocker.stop()
      }
    },
    leaveFullscreen () {
      this.stopPowerSaveBlocker()
      if (this.isNw) {
        this.nwWin.leaveFullscreen()
      }
    },
    handleMinNw () {
      this.nwWin.minimize()
    },
    handleMaxNw () {
      this.isMaxNw = !this.isMaxNw
      if (this.isMaxNw) {
        this.nwWin.maximize()
      } else {
        this.nwWin.restore()
      }
    },
    handleCloseNw () {
      this.$confirm('确认退出程序', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '留下',
        type: 'info'
      }).then(() => {
        this.nwWin.close(true)
      })
    }
  },
  beforeDestroy () {
    if (this.nwWin) {
      this.nwWin.removeAllListeners(['maximize', 'restore'])
    }
  }
}
