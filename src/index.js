/* Automatically generated by './build/bin/build-entry.js' */
import BadgeStatus from '../packages/badge-status/index.js'
import ButtonConfirm from '../packages/button-confirm/index.js'
import Card from '../packages/card/index.js'
import CardList from '../packages/card-list/index.js'
import CardTable from '../packages/card-table/index.js'
import Circle from '../packages/circle/index.js'
import DatePicker from '../packages/date-picker/index.js'
import Dialog from '../packages/dialog/index.js'
import DialogForm from '../packages/dialog-form/index.js'
import Form from '../packages/form/index.js'
import FrameViewer from '../packages/frame-viewer/index.js'
import Icon from '../packages/icon/index.js'
import ResubmitPrevent from '../packages/resubmit-prevent/index.js'
import Search from '../packages/search/index.js'
import Select from '../packages/select/index.js'
import SelectCity from '../packages/select-city/index.js'
import SelectRegion from '../packages/select-region/index.js'
import Table from '../packages/table/index.js'
import Tag from '../packages/tag/index.js'
const components = [
  BadgeStatus,
  ButtonConfirm,
  Card,
  CardList,
  CardTable,
  Circle,
  DatePicker,
  Dialog,
  DialogForm,
  Form,
  FrameViewer,
  Icon,
  ResubmitPrevent,
  Search,
  Select,
  SelectCity,
  SelectRegion,
  Table,
  Tag
]
const install = function(Vue, opts = {}) {
  const prefixCls = opts.prefixCls
  Vue.prototype.$WAYE = {
    prefixCls: prefixCls || 'wy',
    searchKeyMaps: opts.searchKeyMaps
  }
  components.forEach(component => {
    let name = component.name
    if (prefixCls) {
      let newName = prefixCls.slice(0, 1).toUpperCase() + prefixCls.slice(1)
      name = component.name.replace('Wy', newName)
    }
    Vue.component(name, component);
  })
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  version: '0.1.6',
  install,
  BadgeStatus,
  ButtonConfirm,
  Card,
  CardList,
  CardTable,
  Circle,
  DatePicker,
  Dialog,
  DialogForm,
  Form,
  FrameViewer,
  Icon,
  ResubmitPrevent,
  Search,
  Select,
  SelectCity,
  SelectRegion,
  Table,
  Tag
}
