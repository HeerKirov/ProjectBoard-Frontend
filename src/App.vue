<template lang="pug">
  div#app
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SDK } from '@/common/sdk'

@Component({components: {}})
export default class App extends Vue {
    private beforeCreate() {
        /**TODO 有关登录认证系统，以后需要做的：
         * 1. 现在已经有了进入index页时检查登录状态并跳转的代码；
         * 2. 初始化时，检查登录状态。只要不在登录状态，都必须跳转到index；
         * 3. 在发送请求时要隐式检查登录认证的过期时间。如果接近过期时间了，就要隐式请求更新认证时间；
         * 4. 在程序中就算什么也不做，隔一段时间也要隐式检查并刷新登录状态。在3执行的状态下本条不会重复执行，只会在没有动作时执行；
         */
        SDK.initialize().finally()
    }
    private created() {

    }
}
</script>

<style>
  body {
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
