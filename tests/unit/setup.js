import Vue from 'vue'
import ElementUI from 'element-ui'
import Waye from 'waye'
import clickoutside from 'element-ui/lib/utils/clickoutside'
Vue.use(ElementUI)
Vue.use(Waye)
Vue.directive('clickoutside', clickoutside)
Vue.config.productionTip = false
