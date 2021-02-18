<template>
  <div class="flex flex-center q-pa-xl" style="heinght: 0px">
    <q-card class="shadow-15 filter" bordered style="border-radius: 30px;">
      <q-card-actions>
        <span>Filtros:</span>
        <q-space />
        <q-btn
          color="secondary"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            <div class="q-pa-md flex row" style="width:100%; min-width: 68vw;">
            <q-input
              style="background-color: #FFFF; width:600px"
              dense
              color="secondary"
              label="Pesquisar"
              rounded
              outlined
              v-model="item.name"
            >
            </q-input>
             <div class="q-gutter-sm">
              <q-radio  color="secondary" v-model="item.id_status" val="0" label="Inativo"/>
              <q-radio  color="secondary" v-model="item.id_status" val="1" label="Ativo" />
            </div>
            <div>
                <q-btn style="margin-left: 10px;" color="secondary" @click="$emit('search')">
                Buscar
                </q-btn>
                <q-btn style="margin-left: 10px;" color="secondary" @click="clear()">
                Limpar
                </q-btn>
            </div>
          </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  event: 'changedata',
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    item: {
      get: function () {
        return this.data
      },
      set: function (value) {
        this.$emit('changedata', value)
      }
    }
  },
  methods: {
    clear () {
      this.data = {}
    }
  }
}
</script>
<style lang="sass" scoped>
.filter
  width: 100%
  max-width: 80vw
  min-width: 80vw
.q-pa-xl
  padding: 48px 48px
  padding-bottom: 15px
</style>
