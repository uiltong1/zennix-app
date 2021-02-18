<template>
  <div>
    <q-item v-if="child.length == 0" clickable tag="a" :href="link">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item
      v-else
      expand-separator
      :icon="icon"
      :label="title"
      :caption="caption"
    >
      <q-item v-for="item in child" :key="item.title" clickable tag="a" :href="item.link">
        <q-item-section v-if="icon" avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label item.caption>
            {{ item.caption }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    child: {
      type: Array
    }
  }
}
</script>
