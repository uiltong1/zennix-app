<template>
  <q-page>
   <c-loading :loading="loading"/>
   <search :data="data" @search="search()"/>
   <create
    v-if="create == true"
    :usuario='usuario'
    @showIndex="showIndex"
    @change="data = $event"
    >
   </create>
   <consult
     v-if="consult == true"
     :usuario="usuario"
     @showIndex="showIndex"
    />
   <div v-if="table == true">
    <c-table
     :array="items"
     :loading="loadingTable"
     @novo="novo"
     @consultar="consultar($event)"
     @editar="editar($event)"
     @toggle="toggle($event)"
     @change="items">
    </c-table>
   </div>
  </q-page>
</template>
<script>
import CLoading from 'src/components/CLoading.vue'
import Create from './Create.vue'
import Consult from './Consult'
import Search from './Search'
import CTable from 'src/components/CTable.vue'
import { QSpinnerFacebook } from 'quasar'
import UsuariosServices from 'src/services/UsuariosServices'
export default {
  components: { CLoading, CTable, Create, Consult, Search },
  data () {
    return {
      loading: false,
      table: false,
      create: false,
      consult: false,
      loadingTable: true,
      usuario: 0,
      data: {},
      items: {
        columns: [
          // { label: 'ID', field: 'id' },
          { label: 'Nome', field: 'name' },
          { label: 'Email', field: 'email' },
          { name: 'action', label: '', field: 'action' }
        ]
      }
    }
  },
  created () {
    this.showLoading()
    setTimeout(() => {
      this.$q.loading.hide()
      this.table = true
    }, 2000)
    UsuariosServices.get()
      .then(result => {
        this.loadingTable = false
        this.items.items = result.data
      })
  },
  methods: {
    novo () {
      this.table = false
      this.showLoading()
      setTimeout(() => {
        this.$q.loading.hide()
        this.create = true
      }, 2000)
    },
    showIndex () {
      this.usuario = 0
      this.create = false
      this.consult = false
      this.showLoading()
      setTimeout(() => {
        this.$q.loading.hide()
        this.table = true
      }, 2000)
    },
    load () {
      this.usuario = 0
      this.create = false
      this.loadingTable = true
      setTimeout(() => {
        UsuariosServices.get()
          .then(result => {
            this.loadingTable = false
            this.items.items = result.data
          })
        this.table = true
      }, 2000)
    },
    search () {
      console.log(sessionStorage.token)
      UsuariosServices.search(this.data)
        .then(response => {
          var result = response
          this.items.items = result.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    consultar (data) {
      this.table = false
      this.usuario = data
      this.showLoading()
      setTimeout(() => {
        this.consult = true
        this.$q.loading.hide()
      }, 2000)
    },
    editar (event) {
      this.usuario = event
      this.table = false
      this.showLoading()
      this.create = true
      setTimeout(() => {
        this.create = true
        this.$q.loading.hide()
      }, 2000)
    },
    toggle (data) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Deseja alterar o status do usuário?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        UsuariosServices.toggle(data)
          .then(result => {
            this.message = result.data.message
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
          .finally(() => {
            this.load()
          })
      })
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'white',
        spinnerSize: 200,
        backgroundColor: 'secondary'
      })
    },
    messageSuccess (message) {
      this.$q.notify({
        type: 'positive',
        message: `${message}`
      })
    },
    messageError (message) {
      this.$q.notify({
        type: 'negative',
        message: `${message}`
      })
    }
  }
}
</script>
