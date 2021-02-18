import { isSignedIn } from 'src/security/auth'
const routes = [
  { path: '/', component: () => import('pages/Login/Index.vue') },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/Dashboard/Index.vue') },
      { path: 'users', component: () => import('pages/Users/Index.vue') },
      { path: '/seguradoras', component: () => import('pages/Seguradoras/Index.vue') },
      { path: '/planos', component: () => import('pages/Planos/Index.vue') },
      { path: '/status', component: () => import('pages/Status_vendas/Index.vue') },
      { path: '/tipos_planos', component: () => import('pages/Tipos_planos/Index.vue') }
    ],
    beforeEnter (_, __, next) { if (isSignedIn()) { return next() } return next('/') }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
