import Vue from 'vue'

let id = 0

export const createEle = () => {
  const el = document.createElement('div')

  el.id = 'ql' + ++id
  document.body.appendChild(el)

  return el
}

export const destroyVM = (vm) => {
  vm.$destory && vm.$destory()
  vm.$el && vm.$el.parentNode && vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 创建组件实例
 * @param {*} Comp 组件或 组件模板
 * @param {*} mounted 是否挂载到 dom
 */
export const createComp = (Comp, mounted = false) => {
  if (Object.prototype.toString.call(Comp) === '[object String]') {
    Comp = {template: Comp}
  }
  return new Vue(Comp).$mount(mounted === false ? null : createEle())
}
