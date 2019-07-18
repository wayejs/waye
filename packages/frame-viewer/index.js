import FrameViewer from './frame-viewer.vue'

FrameViewer.install = Vue => {
  Vue.component(FrameViewer.name, FrameViewer)
}

export default FrameViewer
