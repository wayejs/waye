import CardList from './card-list.vue'

CardList.install = (Vue) => {
  Vue.component(CardList.name, CardList)
}

export default CardList
