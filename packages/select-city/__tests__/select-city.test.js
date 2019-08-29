import { shallowMount } from '@vue/test-utils'
import QlSelectCity from '../select-city'

describe('城市下拉组件', () => {
  const fetchProvince = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            province: '福建省',
            provinceId: 350000
          },
          {
            id: 2,
            province: '吉林省',
            provinceId: 220000
          }
        ])
      }, 50)
    })
  }

  it('初始组件', () => {
    const wrapper = shallowMount(QlSelectCity, {
      propsData: {
        fetchProvince
      }
    })

    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.wy-select-city')).toBe(true)
  })
})
