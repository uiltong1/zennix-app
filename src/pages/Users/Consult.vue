<template>
    <div class="flex flex-center q-pa-xl">
      <q-card class="shadow-15" style="width: 800px;">
        <!-- <q-card-section>
            <h4>Usuário</h4>
        </q-card-section> -->
        <q-card-section>
            <li>Nome: {{data.name}}</li>
            <li>CPF: {{data.cpf}}</li>
            <li>Email: {{data.email}}</li>
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
import UsuariosServices from 'src/services/UsuariosServices'
export default {
  props: ['usuario'],
  data () {
    return {
      data: {}
    }
  },
  created () {
    if (this.usuario > 0) {
      UsuariosServices.show(this.usuario)
        .then(result => {
          this.data = result.data[0]
        })
        .catch(error => {
          this.message = error.response.message
          this.messageError(this.message)
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
