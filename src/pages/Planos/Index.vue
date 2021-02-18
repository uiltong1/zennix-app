<template>
  <q-page>
   <c-loading :loading="loading"/>
   <create
    v-if="create == true"
    :plano='plano'
    @showIndex="showIndex"
    @change="data = $event"
    >
   </create>
   <price
    v-if="price"
    :price='plano'
    @showIndex="showIndex"
   ></price>
   <consult
     v-if="consult == true"
     :plano="plano"
     @showIndex="showIndex"
    />
    <c-table
      v-if="table == true"
     :array="data"
     :loading="loadingTable"
     :price="true"
     @buscar="buscar"
     @novo="novo"
     @editPreco="editPreco($event)"
     @consultar="consultar($event)"
     @editar="editar($event)"
     @toggle="toggle($event)"
     @change="data">
    </c-table>
  </q-page>
</template>
<script>
import CLoading from 'src/components/CLoading.vue'
import Create from './Create.vue'
import Consult from './Consult'
import Price from './Price'
import CTable from 'src/components/CTable.vue'
import { QSpinnerFacebook } from 'quasar'
import PlanosServices from 'src/services/PlanosServices'
export default {
  components: { CLoading, CTable, Create, Consult, Price },
  data () {
    return {
      loading: false,
      table: false,
      create: false,
      consult: false,
      price: false,
      loadingTable: true,
      plano: 0,
      data: {
        columns: [
          { label: 'Nome', field: 'no_plano' },
          { label: 'Tipo de plano', field: 'no_tipo_plano' },
          { label: 'Seguradora', field: 'sg_seguradora' },
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
    this.showIndex()
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
      this.plano = 0
      this.create = false
      this.consult = false
      this.price = false
      this.load()
      this.showLoading()
      PlanosServices.get()
        .then(result => {
          this.loadingTable = false
          this.data.items = result.data.planos
        })
      setTimeout(() => {
        this.$q.loading.hide()
        this.table = true
      }, 2000)
    },
    load () {
      this.plano = 0
      this.create = false
      this.loadingTable = true
      setTimeout(() => {
        PlanosServices.get()
          .then(result => {
            this.loadingTable = false
            this.data.items = result.data.planos
          })
        this.table = true
      }, 2000)
    },
    buscar () {
      console.log('buscar')
    },
    consultar (data) {
      this.table = false
      this.plano = data
      this.showLoading()
      setTimeout(() => {
        this.consult = true
        this.$q.loading.hide()
      }, 2000)
    },
    editar (event) {
      this.plano = event
      this.table = false
      this.showLoading()
      this.create = true
      setTimeout(() => {
        this.create = true
        this.$q.loading.hide()
      }, 2000)
    },
    editPreco (event) {
      this.plano = event
      this.table = false
      this.create = false
      this.showLoading()
      setTimeout(() => {
        this.price = true
        this.$q.loading.hide()
      }, 2000)
    },
    toggle (data) {
      this.$q.dialog({
        // title: 'Al',
        message: 'Deseja alterar o status do plano?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        PlanosServices.toggle(data)
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
