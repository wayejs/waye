import { shallowMount } from '@vue/test-utils'

import Search from '../search.vue'
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
describe('Search', () => {
  it('init Search', () => {
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
    // expect(wrapper.html()).toMatchSnapshot()
  })
  it('not show daterange', () => {
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
