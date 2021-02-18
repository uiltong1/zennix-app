<template>
  <div>
    <div class="container q-pa-xl flex row reverse">
      <div style="margin-left: 10px;">
        <q-btn color="secondary" @click="$emit('novo')" label="Novo" />
      </div>
      <!-- <div>
        <q-fab
          color="secondary"
          glossy
          icon="keyboard_arrow_left"
          direction="left"
          padding="10px"
        >
          <div class="q-pa-md flex row" style="width:100%; min-width: 68vw;">
            <q-input
              style="background-color: #FFFF;"
              dense
              debounce="300"
              color="secondary"
              label="Pesquisar"
              rounded
              outlined
              v-model="search"
            >
            </q-input>
            <q-btn color="secondary" @click="$emit('buscar')">
              Buscar
            </q-btn>
          </div>
        </q-fab>
      </div> -->
    </div>
    <div class="flex flex-center">
      <q-table
        class="shadow-15"
        style="max-width: 120vw; min-width: 80vw; text-align: left;"
        :data="array.items"
        :columns="array.columns"
        :loading="loading"
        :search="search"
        row-key="id"
      >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
           <q-btn
            v-if="props.row.status == 1"
            color="secondary"
            align="center"
            icon="clear"
            title="Inativar"
            no-caps
            flat
            dense
            @click="toggle(props.row.id)"
          />
          <q-btn
            v-else
            color="secondary"
            icon="check"
            title="Ativar"
            no-caps
            flat
            dense
            @click="toggle(props.row.id)"
          />
          <q-btn
            color="secondary"
            icon-right="search"
            title="Consultar"
            no-caps
            flat
            dense
            @click="consultar(props.row)"
          />
          <q-btn
            color="secondary"
            icon-right="edit"
            title="Editar"
            no-caps
            flat
            dense
            @click="editar(props.row)"
          />
          <q-btn
            v-if="price"
            color="secondary"
            icon-right="money"
            title="Preço(s)"
            no-caps
            flat
            dense
            @click="editPreco(props.row)"
          />
        </q-td>
      </template>
      </q-table>
   </div>
  </div>
</template>
<script>
export default {
  props: {
    array: {
      type: Object
    },
    loading: {
      type: Boolean
    },
    usuario: {
      type: Number
    },
    price: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    consultar: function (valor) {
      this.$emit('consultar', valor.id)
    },
    editar: function (valor) {
      this.$emit('editar', valor.id)
    },
    toggle: function (valor) {
      this.$emit('toggle', valor)
    },
    editPreco: function (valor) {
      this.$emit('editPreco', valor)
    }
  }
}
</script>
<style lang="stylus">
.q-table thead tr th {
  text-align: center;
}
.q-table tbody tr td {
  text-align: center;
}
.container {
  padding-right: 15px;
  padding-left: 15px;
  height: 0px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
</style>
