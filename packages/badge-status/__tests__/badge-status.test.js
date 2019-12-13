import { shallowMount } from '@vue/test-utils'
// import { asyncExpect } from '@/tests/utils'
import BadgeStatus from '../badge-status'

describe('BadgeStatus', () => {
  it('init BadgeStatus', async () => {
    const wrapper = shallowMount(BadgeStatus, {
      propsData: {
        type: 'primary'
      },
      slots: {
        default: 'primary'
      }
    })

    expect(wrapper.contains('.wy-badge-status__dot')).toBe(true)
    expect(wrapper.text()).toBe('primary')
  })
})
