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
        //总览页面
        {
          path: '',
          name: 'board',
          component: () => import('@/views/Board-Summary.vue')
        },
        //project下的note系列页面(复用)
        {
          path: 'note/new',
          name: 'board-note-new',
          component: () => import('@/views/Board-NoteNew.vue')
        },
        {
          path: 'note/:note',
          name: 'board-note-detail',
          component: () => import('@/views/Board-NoteDetail.vue')
        },
        {
          path: 'note',
          name: 'board-note',
          component: () => import('@/views/Board-NoteList.vue')
        },
        //module下的note系列页面
        {
          path: 'module/:module/note/new',
          name: 'board-module-note-new',
          component: () => import('@/views/Board-NoteNew.vue')
        },
        {
          path: 'module/:module/note/:note',
          name: 'board-module-note-detail',
          component: () => import('@/views/Board-NoteDetail.vue')
        },
        {
          path: 'module/:module/note',
          name: 'board-module-note',
          component: () => import('@/views/Board-NoteList.vue')
        },
        //module下的task系列页面
        {
          path: 'module/:module/task',
          component: () => import('@/views/Board-Task.vue'),
          children: [
            {
              path: '',
              name: 'board-module-task',
              component: () => import('@/views/Board-Task-Summary.vue')
            },
            {
              path: ':task',
              name: 'board-module-task-detail',
              component: () => import('@/views/Board-Task-Detail.vue')
            },
            {
              path: 'new',
              name: 'board-module-task-new',
              component: () => import('@/views/Board-Task-New.vue')
            },
          ]
        },
        //module总览页
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
