import Circle from './circle.vue'

Circle.install = Vue => {
  Vue.component(Circle.name, Circle)
}

export default Circle
