import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      // Admin section
      {
        path: 'admin',
        children: [
          {
            path: 'block',
            children: [
              { path: '', component: () => import('src/pages/admin/block/IndexBlockPage.vue') },
              { path: 'new', component: () => import('src/pages/admin/block/NewBlockPage.vue') },
              { path: 'edit/:id', component: () => import('src/pages/admin/block/EditBlockPage.vue') }
            ]
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
