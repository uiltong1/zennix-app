<template>
    <q-input
      rounded
      outlined
      color="secondary"
      lazy-rules
      :label="label"
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
    ></q-input>
</template>
<script>
</script>
