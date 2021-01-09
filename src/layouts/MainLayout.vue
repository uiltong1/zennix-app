<template>
  <q-layout view="lHh Lpr lFf" color="secondary">
    <q-header style="background-color: #26A69A;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
   </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item
          header
          class="row justify-center vertical-middle text-h6"
          style="hover:none;"
          clickable
          tag="a"
          href="/#/dashboard"
        >
          Cookbook
        </q-item>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Comidas',
    icon: 'fastfood',
    link: '/#/comidas'
  },
  {
    title: 'Bebidas',
    icon: 'emoji_food_beverage',
    link: '/#/bebidas'
  },
  {
    title: 'Sobremesas',
    icon: 'free_breakfast',
    link: '/#/sobremesas'
  },
  {
    title: 'Fitness',
    icon: 'fitness_center',
    link: '/#/fitness'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
