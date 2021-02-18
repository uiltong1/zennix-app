<template>
  <div class="flex flex-center">
    <q-circular-progress
      indeterminate
      size="100px"
      :thickness="0.9"
      color="secondary"
      center-color="grey-8"
      class="q-ma-md"
      v-if="loading == true"
    />
  </div>
</template>
<script>
export default {
  props: ['loading']
}
</script>
