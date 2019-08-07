<template lang="pug">
    el-container()
        el-aside(width="200px")
            el-menu
        el-container
            el-header(style="background")
            el-main
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({components: {}})
export default class Home extends Vue {}
</script>

<style>
    .el-header {
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
    }
</style>
