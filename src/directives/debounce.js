import debounce from '../utils/debounce'
const DIRECTIVE_NAME = 'debounce'
export default {
  name: DIRECTIVE_NAME,
  install (Vue) {
    Vue.directive(DIRECTIVE_NAME, {
      inserted (el, binding) {
        const text = el.innerHTML
        // const loading = binding.modifiers.loading
        const cb = debounce(() => {
          el.innerHTML = text
          el.disabled = false
          el.classList.remove('is-disabled')
        }, binding.arg)
        el.addEventListener('click', e => {
          el.innerHTML = '<i class="el-icon-loading"></i> ' + text
          el.classList.add('is-disabled')
          el.disabled = true
          cb()
        })
      }
    })
  }
}
