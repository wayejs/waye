import { shallowMount } from '@vue/test-utils'
// import { asyncExpect } from '@/tests/utils'
import Select from '../select'
function queryItem (itemId) {
  let data
  if (!itemId) {
    data = [{
      label: '选项一',
      value: '1'
    }, {
      label: '选项二',
      value: '2'
    }]
  } else {
    data = [{
      label: 'item1',
      value: '1'
    }, {
      label: 'item2',
      value: '2'
    }]
  }

  return new Promise(resolve => {
    resolve(data)
  })
}
describe('Select', () => {
  let mountFn
  let el
  beforeEach(() => {
    el = document.createElement('div')
    el.setAttribute('data-app', 'true')
    document.body.appendChild(el)
    mountFn = (options = {}) => {
      return shallowMount(Select, {
        sync: false,
        // attachToDocument: true,
        ...options
      })
    }
  })
  it('init select', async () => {
    const wrapper = mountFn({
      propsData: {
        data: [{
          label: '选项一',
          value: '1'
        }, {
          label: '选项一',
          value: '2'
        }],
        selected: '1'
      }
    })

    expect(wrapper.contains('.wy-select')).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.el-input__inner').value).toBe('选项一')
  })

  it('queryParams', async () => {
    const wrapper = mountFn({
      propsData: {
        fetch: queryItem,
        selected: '1'
      }
    })

    wrapper.setProps({
      queryParams: '2'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.el-input__inner').value).toBe('item1')
  })
})
