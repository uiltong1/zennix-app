<template>
    <div class="q-pa-md" style="max-width: 300px">
        <q-select rounded outlined :v-model="value" :options="options" label="Rounded outlined" />
    </div>
</template>
<script>
export default {
    props: {
        options: {
            type: Array
        },
        value: {
            type: Number
        }
    }
}
</script>