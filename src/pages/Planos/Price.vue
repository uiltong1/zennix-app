<template>
  <div class="flex flex-center q-pa-xl" style="flex-direction: column;">
      <q-card class="shadow-15" style="width:1100px; margin-bottom: 30px">
        <div style="margin: 60px">
          <div style="font-size:17px;"> Nome: {{data.no_plano}} </div>
          <div style="font-size:17px;"> Tipo de plano: {{data.no_tipo_plano}} </div>
           <div style="font-size:17px;"> Seguradora: {{data.sg_seguradora}} </div>
        </div>
      </q-card>
      <q-card class="shadow-15" style="width:1100px">
          <q-form
          style="margin:60px;"
          @submit="salvar()"
          @reset="$emit('showIndex')"
          class="q-gutte-md"
          >
          <div>
              <span style="margin-right: 10px"><q-btn round class="add" size="10px" color="secondary" @click="add"> + </q-btn></span>
              <span>Adicionar Preço</span>
          </div>
          <div v-for="(input, index) in prices" class="flex" style="justify-content: space-between; margin-top: 15px" :key="index">
            <q-input
             type="number"
             rounded
             outlined
             required
             v-model="input.idade_inicio"
             name="idade_inicial"
             label="Idade Inicial"
             color="secondary"
            />
            <q-input
             type="number"
             rounded
             outlined
             required
             v-model="input.idade_fim"
             name="idade_fim"
             label="Idade fim"
             color="secondary"
            />
            <q-field
              rounded
              outlined
              required
              v-model="input.preco"
              name="preco"
              label="Preço"
              color="secondary"
            >
              <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                <money  class="q-field__input text-right" :value="value" @input="emitValue" :v-bind="money" v-show="floatingLabel" />
              </template>
            </q-field>
            <q-field
              rounded
              outlined
              required
              v-model="input.vl_comissao"
              name="vl_comissao"
              label="Comissão"
              color="secondary"
            >
              <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                <money :id="id" class="q-field__input text-right" :value="value" @input="emitValue" :v-bind="money" v-show="floatingLabel" />
              </template>
            </q-field>
             <q-input
             type="number"
             rounded
             outlined
             required
             v-model="input.qt_comissao"
             name="qt_comissao"
             label="Qtd comissão"
             color="secondary"
            />
            <span style="margin-right: 10px; margin-top: 10px"><q-btn size="10px" round color="secondary" icon="clear" title="Remover" @click="remove(index)"></q-btn></span>
          </div>
          <div style="margin-top: 40px" class="q-pa-md flex row reverse" v-if="prices.length">
                <q-btn type="submit" color="secondary" glossy label="Salvar" :loading="loadingbtn"/>
              <q-btn label="Voltar" type="reset" color="red" flat @reset="$emit('showIndex')"/>
          </div>
          </q-form>
      </q-card>
  </div>
</template>
<script>
import PlanosPrecosServices from 'src/services/PlanosPrecosServices'
import { Money } from 'v-money'
export default {
  components: { Money },
  data () {
    return {
      money: {
        decimal: '.',
        thousands: ',',
        // prefix: 'R$ ',
        // suffix: ' #',
        precision: 2,
        masked: false
      },
      loadingbtn: false,
      data: {},
      prices: []
    }
  },
  event: 'changedata',
  props: ['price'],
  async created () {
    this.data = this.price
    const result = await PlanosPrecosServices.edit(this.data.id)
    this.prices = result.data.prices
  },
  methods: {
    add () {
      this.prices.push({ idade_inicio: '', idade_fim: '', preco: '', vl_comissao: '', qt_comissao: '' })
    },
    remove (key) {
      this.prices.splice(key, 1)
    },
    async salvar () {
      this.loadingbtn = true
      this.data.prices = this.prices
      PlanosPrecosServices.post(this.data)
        .then(result => {
          this.message = result.data.message
          this.plano = result.data.data
          this.messageSuccess(this.message)
        })
        .catch(error => {
          this.message = error.response.data.message
          this.messageError(this.message)
        })
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
