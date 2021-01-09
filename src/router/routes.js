
const routes = [
  { path: '/', component: () => import('pages/Login/Index.vue') },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/Dashboard/Index.vue') },
      { path: '/comidas', component: () => import('pages/Comidas/Index.vue') },
      { path: '/bebidas', component: () => import('pages/Bebidas/Index.vue') },
      { path: '/sobremesas', component: () => import('pages/Sobremesas/Index.vue') },
      { path: '/fitness', component: () => import('pages/Fitness/Index.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
