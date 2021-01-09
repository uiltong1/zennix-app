<template>
<div class="column justify-center items-center fixed-center">
    <div class="flex-break">
      <q-card>
      <q-card-section align="center">
        <div class="text-h6">Acesso:</div>
          <div class="q-pa-md">
            <div class="q-gutter-md" style="width:100%; min-width: 250px; max-width: 400px;">
              <q-input rounded outlined v-model="user" label="E-mail" color="secondary" />
              <q-input rounded outlined v-model="password" type="password" label="Senha" color="secondary" />
              <div class="row" style="justify-content: space-between;">
                <a href="" style="text-decoration:none; color:#808080;">Registre-me</a>
                <a href="" style="text-decoration:none; color:#808080;">Esqueceu sua senha?</a>
              </div>
              <q-btn color="secondary" glossy label="Entrar" />
          </div>
        </div>
      </q-card-section>
    </q-card>
   </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      user: '',
      password: ''
    }
  }
}
</script>
