import Card from './card.vue'

Card.install = Vue => {
  Vue.component(Card.name, Card)
}

export default Card
