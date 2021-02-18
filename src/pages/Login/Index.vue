<template>
<div class="column justify-center items-center fixed-center">
    <div class="flex-break" v-if="form">
      <q-card  class="shadow-15" >
      <q-card-section align="center">
        <q-form
        @submit="login"
        class="q-gutter-md"
        >
          <div class="text-h6">Acesso:</div>
            <div class="q-pa-md">
              <div class="q-gutter-md" style="width:100%; min-width: 250px; max-width: 400px;">
                <q-input
                 type="email"
                 rounded outlined
                 v-model="data.email"
                 label="E-mail"
                 color="secondary"
                 :rules="[ val => val && val.length > 0 || 'Informe o email de acesso.']"
                />
                <q-input
                 rounded outlined
                 v-model="data.password"
                 type="password"
                 label="Senha"
                 color="secondary"
                 :rules="[ val => val && val.length > 0 || 'Informe a senha de acesso.']"
                 />
                <q-btn type="submit" color="secondary" glossy label="Entrar" :loading="loadingbtn"/>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
   </div>
</div>
</template>

<script>
import { signIn } from 'src/security/auth'
export default {
  name: 'Login',
  data: function () {
    return {
      data: {},
      loadingbtn: false,
      form: false
    }
  },
  created () {
    this.$q.loading.show()
    setTimeout(() => {
      this.$q.loading.hide()
      this.form = true
    }, 2000)
  },
  methods: {
    async login () {
      this.loadingbtn = true
      await signIn(this.data)
        .then((response) => {
          this.$router.push({ path: '/users' })
        })
        .catch((error) => {
          this.messageError(error.response.data.message)
        })
      this.loadingbtn = false
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
