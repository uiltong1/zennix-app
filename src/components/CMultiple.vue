<template>
    <div class="row">
        <select multiple="multiple" style="width: 200px;" id="select_left">
            <option v-for="i in array" :value="i.value" :key="i.value" :name="i.text">{{ i.text }}</option>
        </select>
        <div class="column">
            <q-btn @click="addAll()">>></q-btn>
            <q-btn @click="add()">>|</q-btn>
            <q-btn @click="remove()">remover</q-btn>
            <q-btn @click="removeAll()">remover todos</q-btn>
        </div>
        <select multiple="multiple" style="width: 200px;" id="select_right">
            <option v-for="i in selecionados" :value="i.value" :key="i.value" :name="i.text">{{ i.text }}</option>
        </select>
    </div>
</template>
<script>
export default {
  props: ['array', 'selecionados'],
  methods: {
    addAll () {
      var value = 0
      var callback = []
      var select = document.getElementById('select_left')
      if (select.options.length > 0) {
        for (var i = 0; i < select.options.length; i++) {
          value = this.array[i]
          this.selecionados.push(value)
          callback.push(value)
        }
        for (i = 0; i < callback.length; i++) {
          var index = this.array.findIndex(obj => obj.value === callback[i].value)
          this.array.splice(index, 1)
        }
      }
    },
    add () {
      var value = 0
      var callback = []
      var select = document.getElementById('select_left')
      if (select.options.length > 0) {
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].selected === true) {
            value = this.array[i]
            this.selecionados.push(value)
            callback.push(value)
          }
        }
        for (i = 0; i < callback.length; i++) {
          var index = this.array.findIndex(obj => obj.value === callback[i].value)
          this.array.splice(index, 1)
        }
      }
    },
    remove () {
      var value = 0
      var callback = []
      var select = document.getElementById('select_right')
      if (select.options.length > 0) {
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].selected === true) {
            value = this.selecionados[i]
            this.array.push(value)
            callback.push(value)
          }
        }
        for (i = 0; i < callback.length; i++) {
          var index = this.selecionados.findIndex(obj => obj.value === callback[i].value)
          this.selecionados.splice(index, 1)
        }
      }
    },
    removeAll () {
      var value = 0
      var callback = []
      var select = document.getElementById('select_right')
      if (select.options.length > 0) {
        for (var i = 0; i < select.options.length; i++) {
          value = this.selecionados[i]
          this.array.push(value)
          callback.push(value)
        }
        for (i = 0; i < callback.length; i++) {
          var index = this.selecionados.findIndex(obj => obj.value === callback[i].value)
          this.selecionados.splice(index, 1)
        }
      }
    }
  }
}
</script>
