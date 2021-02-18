export default {

  message (type, message) {
    this.$q.notify({
      type: `${type}`,
      message: `${message}`
    })
  }
//   messageError (message) {
//     this.$q.notify({
//       type: 'negative',
//       message: `${message}`
//     })
//   }
}
