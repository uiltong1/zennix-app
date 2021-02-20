<template>
  <q-layout view="lHh Lpr lFf" color="secondary">
    <q-header style="background-color: #26a69a">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <q-btn-dropdown auto-close stretch flat :label="nome">
          <q-list>
            <q-item clickable @click="tab = 'movies'">
              <q-item-section>Configurações</q-item-section>
            </q-item>

            <q-item clickable @click="tab = 'photos'">
              <q-item-section @click="logout">Sair</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer  v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1" >
      <q-list>
        <q-item
          header
          class="row justify-center vertical-middle text-h6"
          style="hover: none"
          clickable
          tag="a"
          href="/dashboard"
        >
          Zenixx
        </q-item>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
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
    title: 'Dashboard',
    icon: '',
    link: '/dashboard',
    child: []
  },
  {
    title: 'Administração',
    icon: 'admin_panel_settings',
    link: null,
    child: [{
      title: 'Perfis',
      icon: '',
      link: '/perfil'
    },
    {
      title: 'Planos',
      icon: '',
      link: '/planos'
    },
    {
      title: 'Seguradoras',
      icon: '',
      link: '/seguradoras'
    },
    {
      title: 'Status',
      icon: '',
      link: '/status'
    },
    {
      title: 'Tipos de planos',
      icon: '',
      link: '/tipos_planos'
    },
    {
      title: 'Usuários',
      icon: '',
      link: '/users'
    }
    ]
  },
  {
    title: 'Atendimento',
    icon: 'admin_panel_settings',
    link: null,
    child: [{
      title: 'Venda',
      icon: '',
      link: '/users'
    }]
  }
]
import { signOut } from 'src/security/auth'
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      nome: sessionStorage.getItem('nome')
    }
  },
  methods: {
    logout () {
      signOut()
      this.$router.push({ path: '/' })
    }
  }
}
</script>
