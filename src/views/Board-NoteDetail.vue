<template lang="pug">
    div.root-container
        div.h-100.aside
            el-menu.aside-menu(:collapse-transition='false')
                el-menu-item(index='home')
                    i.el-icon-s-home
                    span(slot='title') 主页
        div.content-container
            h4 note detail
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, Project, EMPTY_PROFILE, EMPTY_PROJECT, Module } from '@/common/models'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'
import '@/styles/board-layout.css'

@Component({components: {}})
export default class BoardNoteDetail extends Vue {
    private project: Project = EMPTY_PROJECT
    private projectId: string = ''

    private created() {
        this.onCreated()
        this.onUpdate()
    }
    @Watch('$route') private onRouteChanged(to: Route, from: Route) {
        this.onUpdate()
    }

    protected onCreated() {

    }
    protected onUpdate() {
        
    }
    
}
</script>

<style scoped>
    .root-container {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .aside {
        position: absolute;
        width: 200px;
        background-color: #fff;
        border-right: 1px solid #d7dae2;
    }
    .aside-header {
        height: 60px;
        border-bottom: 1px solid #d7dae2;
    }
    .aside-menu {
        border-right: 0;
    }
    .content-container {
        top: 60px;
        left: 200px;
        position: absolute;
        overflow: auto;
        height: calc(100% - 60px);
        width: calc(100% - 200px);
    }
</style>
