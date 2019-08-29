import Vue from 'vue'
import ElementUI from 'element-ui'
import clickoutside from 'element-ui/lib/utils/clickoutside'
Vue.use(ElementUI)
Vue.directive('clickoutside', clickoutside)
Vue.config.productionTip = false
Vue.prototype.$WAYE = {
  limitArea: false,
  limitRegionId: ''
}
