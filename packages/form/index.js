import Form from './form.vue'
import DialogForm from './dialog-form.vue'

Form.install = Vue => {
  Vue.component(Form.name, Form)
}
DialogForm.install = Vue => {
  Vue.component(DialogForm.name, DialogForm)
}
export { Form, DialogForm }
