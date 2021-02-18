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
             v-model="data.no_tipo_plano"
             name="data_no_tipo_plano"
             label="Tipo de plano"
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
import TiposPlanosService from 'src/services/TiposPlanosService'
export default {
  props: ['tipo_plano'],
  data () {
    return {
      data: {},
      loadingBtn: false,
      message: ''
    }
  },
  created () {
    if (this.tipo_plano > 0) {
      TiposPlanosService.edit(this.tipo_plano)
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
      if (this.tipo_plano > 0) {
        TiposPlanosService.update(this.tipo_plano, this.data)
          .then(result => {
            this.message = result.data.message
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
      } else {
        TiposPlanosService.post(this.data)
          .then(result => {
            this.message = result.data.message
            this.tipo_plano = result.data.data
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
