<template>
    <div class="flex flex-center q-pa-xl">
      <q-card class="shadow-15" style="width: 800px;">
        <!-- <q-card-section>
            <h4>Usuário</h4>
        </q-card-section> -->
        <q-card-section>
            <li>Nome: {{data.no_tipo_plano}}</li>
            <li>Status: {{data.no_status}}</li>
            <li>Data de criação: {{data.date}}</li>
        </q-card-section>
        <q-card-section align="right">
            <q-btn label="Voltar" @click="$emit('showIndex')" color="red" flat/>
        </q-card-section>
      </q-card>
    </div>
</template>
<script>
import TiposPlanosService from 'src/services/TiposPlanosService'
export default {
  props: ['tipo_plano'],
  data () {
    return {
      data: {}
    }
  },
  created () {
    if (this.tipo_plano > 0) {
      TiposPlanosService.show(this.tipo_plano)
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
<style lang="scss" scoped>
li{
    list-style: none;
}
</style>
