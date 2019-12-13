import Vue from 'vue'
import ElementUI from 'element-ui'
import clickoutside from 'element-ui/lib/utils/clickoutside'
import Waye from '../../src/index'
Vue.use(ElementUI)
Vue.use(Waye)
Vue.directive('clickoutside', clickoutside)
Vue.config.productionTip = false
