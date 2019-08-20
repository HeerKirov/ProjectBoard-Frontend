<template lang="pug">
    div.container
        div.h-100.aside-color(:class='collapse ? "aside-collapse" : "aside"')
            div.aside-header
            el-menu.aside-menu(:default-openeds='["3"]', default-active='1', 
                    :collapse='collapse', :collapse-transition='false',
                    background-color='#545c64', text-color='#fff', active-text-color="#ffd04b")
                el-menu-item(index='1')
                    i.el-icon-house
                    span(slot='title') 总览
                el-menu-item(index='2') 
                    i.el-icon-notebook-2
                    span(slot='title') 笔记
                el-submenu(index='3')
                    template(slot='title') 
                        i.el-icon-folder
                        span(slot='title') 模块
                    el-menu-item-group
                        el-menu-item(v-for='(item, index) in modules', :key='item.id', :index='`3-${index}`') 
                            span(slot='title') {{item.name}}
        div(:class='collapse ? "main-collapse" : "main"')
            div.main-header
                label.mid-title PROJECT
                div.profile.text-right
                    label {{profile.name}}
            router-view

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, Project, EMPTY_PROFILE, EMPTY_PROJECT, Module } from '@/common/models'
import { FormHandler } from '@/common/form'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'

const COLLAPSE_PX = 800

@Component({components: {}})
export default class Board extends Vue {
    profile: Profile = EMPTY_PROFILE
    modules: Module[] = []
    projectId: string = ''

    collapse: boolean = false

    mounted() {
        this.onWindowResize(document.documentElement.clientWidth, document.documentElement.clientHeight)
        FormHandler.onWindowResize(this.onWindowResize)
    }
    created() {
        SDK.profile.get().then(r => { if(r.ok) this.profile = r.data })
    }
    beforeRouteUpdate() {
        console.log('before route update')
        //TODO 这个守卫不生效
        this.projectId = this.$route.params.project
        this.requestForModuleList()
    }
    destroyed() {
        FormHandler.cancelWindowResize(this.onWindowResize)
    }

    async requestForModuleList() {
        let r = await SDK.modules.list({project: this.projectId})
        if(r.ok) {
            this.modules = r.data.result
        }else{
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }

    onWindowResize(width: number, height: number) {
        this.collapse = width < COLLAPSE_PX
    }
}
</script>

<style scoped>
    .container {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .aside {
        position: absolute;
        width: 200px;
    }
    .aside-collapse {
        position: absolute;
        width: 64px;
    }
    .main {
        position: absolute;
        left: 200px;
        width: calc(100% - 200px);
    }
    .main-collapse {
        position: absolute;
        left: 64px;
        width: calc(100% - 64px);
    }
    .aside-color {
        background-color: #545c64
    }
    .aside-menu {
        border-right: 0;
    }
    .aside-header {
        height: 60px;
        border-bottom: 1px solid #444c54;
    }
    
    .main-header {
        position: absolute;
        height: 60px;
        width: 100%;
        border-bottom: 1px solid #d7dae2;
    }
    .mid-title {
        position: fixed;
        left: 50%;
        transform: translate(-50%, 0);
        line-height: 60px
    }
    .profile {
        position: absolute;
        right: 0;
        height: 100%;
        line-height: 60px;
        width: 140px;
        padding-right: 10px;
    }
</style>
