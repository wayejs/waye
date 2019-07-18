import Table from '../packages/table'
import Icon from '../packages/icon'
import Select from '../packages/select'
import Tag from '../packages/tag'
import Search from '../packages/search'
import CardList from '../packages/card-list'
import SelectCity from '../packages/select-city'
import { DialogForm } from '../packages/form'
import Dialog from '../packages/dialog'
import BadgeStatus from '../packages/badge-status'
import DatePicker from '../packages/date-picker'
import ButtonConfirm from '../packages/button-confirm'
import FrameViewer from '../packages/frame-viewer'
import CardTable from '../packages/card-table'
import Card from '../packages/card'
import Circle from '../packages/Circle'
import ResubmitPrevent from '../packages/resubmit-prevent'

import ConfirmDelete from './mixins/confirm-delete'

import filters from './filters'
import vDebounce from './directives/debounce'
const components = [
  FrameViewer,
  Table,
  CardTable,
  Icon,
  Select,
  Search,
  CardList,
  Circle,
  Tag,
  SelectCity,
  DialogForm,
  Dialog,
  BadgeStatus,
  DatePicker,
  ButtonConfirm,
  ResubmitPrevent
]

const mixins = [
  ConfirmDelete
]

const install = (Vue, opts = {}) => {
  Vue.use(vDebounce)
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  mixins.forEach(mixin => {
    Vue.mixin(mixin)
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  Vue.prototype.$WAYE = {
    prefixCls: opts.prefixCls || 'wy',
    searchKeyMaps: opts.searchKeyMaps
  }
}

export {
  FrameViewer,
  Table,
  Icon,
  Select,
  Search,
  Card,
  CardTable,
  CardList,
  Circle,
  Tag,
  SelectCity,
  DialogForm,
  Dialog,
  BadgeStatus,
  DatePicker,
  ButtonConfirm,
  ResubmitPrevent
}
export default {
  install
}
