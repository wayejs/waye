import { shallowMount } from '@vue/test-utils'
import { asyncExpect } from '@/tests/utils'
import SelectRegion from '../select-region'

describe('Select Region', () => {
  it('init select-region', async () => {
    const wrapper = shallowMount(SelectRegion)

    // expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.wy-select-region')).toBe(true)

    await asyncExpect(() => {
      wrapper.find('.wy-select-region').trigger('click')
    })
  })

  it('render province', async () => {

  })
})
