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
          path: 'note/new',
          name: 'board-note-new',
          component: () => import('@/views/Board-Note-Detail.vue')
        },
        {
          path: 'note/:note',
          name: 'board-note-detail',
          component: () => import('@/views/Board-Note-Detail.vue')
        },
        {
          path: 'task/:task',
          name: 'board-task-detail',
          component: () => import('@/views/Board-Task-Detail.vue')
        },
        {
          path: 'note',
          name: 'board-note',
          component: () => import('@/views/Board-Note.vue')
        },
        {
          path: 'task',
          name: 'board-task',
          component: () => import('@/views/Board-Task.vue')
        },
        {
          path: 'module/:module/note/new',
          name: 'board-module-note-new',
          component: () => import('@/views/Board-Note-Detail.vue')
        },
        {
          path: 'module/:module/task/new',
          name: 'board-module-task-new',
          component: () => import('@/views/Board-Task-Detail.vue')
        },
        {
          path: 'module/:module/note/:note',
          name: 'board-module-note-detail',
          component: () => import('@/views/Board-Note-Detail.vue')
        },
        {
          path: 'module/:module/task/:task',
          name: 'board-module-task-detail',
          component: () => import('@/views/Board-Task-Detail.vue')
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
