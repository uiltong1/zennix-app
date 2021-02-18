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
             v-model="data.no_seguradora"
             name="no_seguradora"
             label="Nome da seguradora"
             color="secondary"
            />
            <q-input
             rounded
             outlined
             required
             v-model="data.sg_seguradora"
             name="sg_seguradora"
             label="Sigla da seguradora"
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
                <q-btn type="submit" color="secondary" glossy label="Salvar" :loading="loadingBtn"/>
              <q-btn label="Voltar" type="reset" color="red" flat/>
          </div>
        </q-form>
      </q-card>
    </div>
</template>
<script>
import SeguradorasServices from 'src/services/SeguradorasServices'
export default {
  props: ['seguradora'],
  data () {
    return {
      data: {},
      loadingBtn: false,
      message: ''
    }
  },
  created () {
    if (this.seguradora > 0) {
      SeguradorasServices.edit(this.seguradora)
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
      this.loadingBtn = true
      if (this.seguradora > 0) {
        SeguradorasServices.update(this.seguradora, this.data)
          .then(result => {
            this.message = result.data.message
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
      } else {
        SeguradorasServices.register(this.data)
          .then(result => {
            this.message = result.data.message
            this.seguradora = result.data.data
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
      }
      setTimeout(() => {
        this.loadingBtn = false
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
