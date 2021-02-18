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
            <div class="q-gutter-sm">
              <q-radio color="secondary" v-model="data.contrato" val="PF" label="Pessoa Fisica" />
              <q-radio color="secondary" v-model="data.contrato" val="PJ" label="Pessoa Jurídica"/>
            </div>
            <q-input
             rounded
             outlined
             required
             v-model="data.no_plano"
             name="data_no_plano"
             label="Nome do plano"
             color="secondary"
            />
            <q-select
            rounded
            outlined
            v-model="data.id_seguradora"
            :options="campos.seguradoras"
            option-value="id"
            option-label="sg_seguradora"
            emit-value
            map-options
            label="Seguradora"
            color="secondary"
            />
            <q-select
            rounded
            outlined
            v-model="data.id_tipo_plano"
            :options="campos.tipos_planos"
            option-value="id"
            option-label="no_tipo_plano"
            emit-value
            map-options
            label="Tipo de plano"
            color="secondary"
            />
            <q-input
            type="textarea"
            rounded
            outlined
            v-model="data.detalhes"
            name="data_detalhes"
            label="Detalhes"
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
import PlanosServices from 'src/services/PlanosServices'
export default {
  props: ['plano'],
  data () {
    return {
      data: {},
      loadingbtn: false,
      message: '',
      campos: {}
    }
  },
  created () {
    if (this.plano > 0) {
      PlanosServices.edit(this.plano)
        .then(result => {
          this.data = result.data.plano
          this.campos = result.data.campos
        })
        .catch(error => {
          this.message = error.response.message
          this.messageError(this.message)
        })
    } else {
      PlanosServices.create()
        .then(result => {
          this.campos = result.data.campos
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
      if (this.plano > 0) {
        PlanosServices.update(this.plano, this.data)
          .then(result => {
            this.message = result.data.message
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
      } else {
        PlanosServices.post(this.data)
          .then(result => {
            this.message = result.data.message
            this.plano = result.data.data
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
