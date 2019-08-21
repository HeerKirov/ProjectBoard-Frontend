import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/board',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/board/:project',
      component: () => import('@/views/Board.vue'),
      children: [
        {
          path: '',
          name: 'board',
          component: () => import('@/views/Board-Summary.vue')
        },
        {
          path: 'note',
          name: 'board-note',
          component: () => import('@/views/Board-Note.vue')
        },
        {
          path: 'module/:module/:type/:content',
          name: 'board-module-detail',
          component: () => import('@/views/Board-Module-Detail.vue')
        },
        {
          path: 'module/:module',
          name: 'board-module',
          component: () => import('@/views/Board-Module.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})
