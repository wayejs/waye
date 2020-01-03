import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'
import ButtonConfirm from '../button-confirm'
const clickHandler = sinon.stub()
describe('ButtonConfirm', () => {
  it('init ButtonConfirm', async () => {
    const wrapper = shallowMount(ButtonConfirm, {
      propsData: {
        type: 'primary',
        clickHandler
      },
      slots: {
        default: 'delete'
      },
      attachToDocument: true
    })

    wrapper.find({ name: 'ElButton' }).trigger('click')
    // document.body.click()

    // expect(clickHandler.called).toBe(true)
    // expect(wrapper).toMatchSnapshot()
    // expect(document.querySelector('.el-message-box__wrapper').length).toBe(1)
    wrapper.destroy()
  })
})
