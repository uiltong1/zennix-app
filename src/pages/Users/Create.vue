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
             v-model="data.name"
             name="name"
             label="Nome do usuario"
             color="secondary"
            />
            <q-input
             rounded
             outlined
             required
             mask="###.###.###-##"
             v-model="data.cpf"
             name="cpf"
             label="CPF"
             color="secondary"
            />
            <q-input
             type="email"
             rounded
             outlined
             name="email"
             v-model="data.email"
             label="Email"
             color="secondary"
            />
            <div class="q-gutter-sm">
              <q-radio  color="secondary" v-model="data.id_status" val="0" label="Inativo"/>
              <q-radio  color="secondary" v-model="data.id_status" val="1" label="Ativo" />
            </div>
            <!-- <c-multiple :selecionados="this.data.perfis" :array="this.items" /> -->
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
import UsuariosServices from 'src/services/UsuariosServices'
// import CMultiple from 'src/components/CMultiple.vue'
export default {
  props: ['usuario'],
  data () {
    return {
      data: {},
      loadingBtn: false,
      items: [{ text: 'Teste1', value: 1 }, { text: 'Teste2', value: 2 }, { text: 'Teste3', value: 3 }, { text: 'Teste4', value: 4 }, { text: 'Teste5', value: 5 }],
      message: ''
    }
  },
  created () {
    if (this.usuario > 0) {
      UsuariosServices.edit(this.usuario)
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
      if (this.usuario > 0) {
        UsuariosServices.update(this.usuario, this.data)
          .then(result => {
            this.message = result.data.message
            this.messageSuccess(this.message)
          })
          .catch(error => {
            this.message = error.response.data.message
            this.messageError(this.message)
          })
      } else {
        UsuariosServices.register(this.data)
          .then(result => {
            this.message = result.data.message
            this.usuario = result.data.data
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
    async exportar () {
      UsuariosServices.exportar()
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
