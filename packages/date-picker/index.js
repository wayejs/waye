import DatePicker from './date-picker.vue'

DatePicker.install = Vue => {
  Vue.component(DatePicker.name, DatePicker)
}

export default DatePicker
// import moment from 'moment'
// export default {
//   functional: true,
//   render: (h, { data, children, listeners, props }) => {
//     // const self = this
//     // props.value = new Date(moment(props.value))
//     console.log(data)
//     return h(
//       'el-date-picker',
//       {
//         ...data,
//         props: {
//           value: new Date(moment(props.value))
//         },
//         on: {
//           input: [
//             listeners.input,
//             val => {
//               listeners.input(moment(val).format('YYYYMMDD'))
//             }
//           ]
//         }
//       },
//       children
//     )
//   }
// }
