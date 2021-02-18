<template>
    <div class="flex flex-center q-pa-xl">
      <q-card class="shadow-15" style="width: 800px;">
          <q-form
          style="margin: 60px;"
          @submit="salvar()"
          @reset="$emit('showIndex')"
          class="q-gutte-md"
          >
          <div class="q-gutter-md">
            <q-input
             rounded
             outlined
             required
             v-model="data.no_status_venda"
             name="no_status_venda"
             label="Nome do status"
             color="secondary"
            />
            <div class="q-gutter-sm">
               <q-toggle
                  label="Ativo"
                  :true-value="1"
                  :false-value="2"
                  color="secondary"
                  v-model="data.status"
                />
            </div>
          </div>
          <div class="q-pa-md flex row reverse">
                <q-btn type="submit" color="secondary" glossy label="Salvar" :loading="loadingbtn"/>
              <q-btn label="Voltar" type="reset" color="red" flat/>
          </div>
        </q-form>
      </q-card>
    </div>
</template>
<script>
import StatusServices from 'src/services/StatusServices'
export default {
  props: ['status'],
  data () {
    return {
      data: {},
      loadingbtn: false,
      message: ''
    }
  },
  created () {
    if (this.status > 0) {
      StatusServices.edit(this.status)
        .then(result => {
          this.data = result.data
        })
        .catch(error => {
          this.message = error.response.message
          this.messageError(this.message)
        })
    }
  },
  methods: {
    async salvar () {
      this.loadingbtn = true
      if (this.status > 0) {
        StatusServices.update(this.status, this.data)
          .then(result => {
            this.message = result.data.message
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
      } else {
        StatusServices.post(this.data)
          .then(result => {
            this.message = result.data.message
            this.status = result.data.data
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
      }
      setTimeout(() => {
        this.loadingbtn = false
      }, 1000)
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
