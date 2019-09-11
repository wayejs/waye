import { shallowMount } from '@vue/test-utils'
// import { asyncExpect } from '@/tests/utils'
import Select from '../select'

describe('Select', () => {
  it('init select', async () => {
    const wrapper = shallowMount(Select, {
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

    setTimeout(() => {
      expect(wrapper.find('.el-input__inner').value).to.equal('选项一')
    }, 100)
  })
})
