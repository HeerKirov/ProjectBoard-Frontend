<template lang="pug">
  div#app
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SDK } from '@/common/sdk'

@Component({components: {}})
export default class App extends Vue {
    beforeCreate() {
        SDK.initialize().finally()
    }
    created() {

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
