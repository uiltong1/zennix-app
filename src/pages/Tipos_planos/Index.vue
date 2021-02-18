<template>
  <q-page>
   <c-loading :loading="loading"/>
   <create
    v-if="create == true"
    :tipos_planos='tipo_plano'
    @showIndex="showIndex"
    @change="data = $event"
    >
   </create>
   <consult
     v-if="consult == true"
     :tipo_plano="tipo_plano"
     @showIndex="showIndex"
    />
    <c-table
      v-if="table == true"
     :array="data"
     :loading="loadingTable"
     @buscar="buscar"
     @novo="novo"
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
import CTable from 'src/components/CTable.vue'
import { QSpinnerFacebook } from 'quasar'
import TiposPlanosService from 'src/services/TiposPlanosService'
export default {
  components: { CLoading, CTable, Create, Consult },
  data () {
    return {
      loading: false,
      table: false,
      create: false,
      consult: false,
      loadingTable: true,
      tipo_plano: 0,
      data: {
        columns: [
          { label: 'Nome', field: 'no_tipo_plano' },
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
      this.status = 0
      this.create = false
      this.consult = false
      this.load()
      this.showLoading()
      TiposPlanosService.get()
        .then(result => {
          this.loadingTable = false
          this.data.items = result.data
        })
      setTimeout(() => {
        this.$q.loading.hide()
        this.table = true
      }, 2000)
    },
    load () {
      this.status = 0
      this.create = false
      this.loadingTable = true
      setTimeout(() => {
        TiposPlanosService.get()
          .then(result => {
            this.loadingTable = false
            this.data.items = result.data
          })
        this.table = true
      }, 2000)
    },
    buscar () {
      console.log('buscar')
    },
    consultar (data) {
      this.table = false
      this.tipo_plano = data
      this.showLoading()
      setTimeout(() => {
        this.consult = true
        this.$q.loading.hide()
      }, 2000)
    },
    editar (event) {
      this.status = event
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
        // title: 'Al',
        message: 'Deseja alterar o status da status?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        TiposPlanosService.toggle(data)
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
