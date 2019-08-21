import Vue from 'vue'
import Component from 'vue-class-component'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import App from '@/App.vue'
import router from '@/router'
import '@/plugins/element'

Vue.config.productionTip = false
Vue.use(VueAxios, Axios)

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
