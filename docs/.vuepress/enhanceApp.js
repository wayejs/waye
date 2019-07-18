import Element from 'element-ui'
import Waye from '../../src/index'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/iconfont/iconfont.css'
// import '@/assets/scss/theme.scss'
import '../../packages/theme/src/index.scss'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(Element, { size: 'medium' })
  Vue.use(Waye)
}
