import { shallowMount } from '@vue/test-utils'
// import { createRenderer } from 'vue-server-renderer'

import Search from './search'
const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list: [
          {
            id: '11',
            text: 'heloo'
          }
        ],
        pageNo: 1,
        pageSize: 10,
        total: 10
      })
    }, 0)
  })
}
describe('查询组件', () => {
  it('默认初始', () => {
    const wrapper = shallowMount(Search, {
      propsData: {
        fetch: fetchData,
        columns: [
          {
            label: 'id',
            prop: 'id'
          },
          {
            label: 'text',
            prop: 'text'
          }
        ]
      }
    })
    expect(wrapper.contains('.wy-search')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('不显示日期范围', () => {
    const wrapper = shallowMount(Search, {
      propsData: {
        fetch: fetchData,
        model: {},
        showDaterange: false
      }
    })
    expect(wrapper.contains('el-date-picker')).toBe(false)
  })
})
