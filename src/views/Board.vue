<template lang="pug">
    div.container
        div.h-100.aside-color(:class='collapse ? "aside-collapse" : "aside"')
            div.aside-header
                template(v-if='!collapse')
                    div.aside-header-title
                        label(style='line-height: 60px; color: #fff') {{project.name}}
                    div.aside-header-dropdown
                        el-link(:underline='false', style='color: #fff', @click='onProjectDropdown')
                            i(:class='openProjectList ? "el-icon-arrow-up" : "el-icon-arrow-down"')
            el-menu.aside-menu(:default-active='projectId', v-if='openProjectList',
                    :collapse-transition='false', @select='onSelectProjectList',
                    background-color='#646c74', text-color='#fff', active-text-color="#ffd04b")
                el-menu-item(index='home')
                    i.el-icon-s-home
                    span(slot='title') 主页
                el-menu-item(v-for='(item, index) in projects', :key='item.id', 
                        :index='item.id')
                    i.el-icon-notebook-1
                    span(slot='title') {{item.name}}
                el-link.aside-menu-button(:underline='false', @click='onProjectNew') 
                    i.el-icon-plus
                    span 新建项目…
            el-menu.aside-menu(:default-openeds='["module"]', v-else,
                    :default-active='asideActiveIndex', @select='onSelectAside',
                    :collapse='collapse', :collapse-transition='false',
                    background-color='#545c64', text-color='#fff', active-text-color="#ffd04b")
                el-menu-item(index='summary')
                    i.el-icon-house
                    span(slot='title') 总览
                el-menu-item(index='note')
                    i.el-icon-notebook-2
                    span(slot='title') 笔记
                el-submenu(index='module')
                    template(slot='title')
                        i.el-icon-folder
                        span(slot='title') 模块
                    el-menu-item(v-for='(item, index) in modules', :key='item.id', 
                                :index='`module-${item.id}`', :class='{"aside-menu-item": !collapse}') 
                        span(slot='title') {{item.name}}
                    el-link.aside-menu-button(:underline='false', @click='onModuleNew') 
                        i.el-icon-plus
                        span 新建模块…
        div(:class='collapse ? "main-collapse" : "main"')
            top-bar
            router-view
        create-project-dialog(ref='createProjectDialog')
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Project, EMPTY_PROJECT, Module } from '@/common/models'
import { FormHandler } from '@/common/form'
import TopBar from '@/components/TopBar.vue'
import CreateProjectDialog from '@/components/CreateProjectDialog.vue'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'
import '@/styles/board-layout.css'

const COLLAPSE_PX = 800

@Component({components: {TopBar, CreateProjectDialog}})
export default class Board extends Vue {
    //data
    projects: Project[] = []
    project: Project = EMPTY_PROJECT
    modules: Module[] = []
    projectId: string = ''
    
    collapse: boolean = false                   //控制左侧aside是否折叠
    openProjectList: boolean = false            //控制开启左侧的项目菜单列表
    asideActiveIndex: string = 'summary'        //aside中激活的item
    //lifetime event
    mounted() {
        //在挂载之后，将窗口大小变化的事件注册到handler，然后手动调用一次事件。
        //这个事件用于控制侧边栏的响应式变化。
        this.onWindowResize(document.documentElement.clientWidth, document.documentElement.clientHeight)
        FormHandler.onWindowResize(this.onWindowResize)
    }
    created() {
        //创建时同时执行created和update事件。
        this.onCreated()
        this.onUpdate()
    }
    @Watch('$route') onRouteChanged(to: Route, from: Route) {
        this.onUpdate()
    }
    destroyed() {
        //销毁这个组件时注销该事件，以防事件堆积。
        FormHandler.cancelWindowResize(this.onWindowResize)
    }
    //gui event
    onWindowResize(width: number, height: number) {
        //窗口大小改变时，根据窗口宽度决定是否要进入collapse模式。
        this.collapse = width < COLLAPSE_PX
        if(this.collapse) {
            this.openProjectList = false
        }
    }
    onSelectAside(index: string) {
        //激活侧边栏按钮时，进行子页面跳转。
        if(index === 'summary') {
            this.$router.push({name: 'board', params: {project: this.projectId}})
        }else if(index === 'note') {
            this.$router.push({name: 'board-note', params: {project: this.projectId}})
        }else if(index !== null && index.startsWith('module-')) {
            let module = index.slice('module-'.length)
            this.$router.push({name: 'board-module', params: {project: this.projectId, module}})
        }
    }
    onSelectProjectList(index: string) {
        if(index === 'home') {
            this.$router.push({name: 'home'})
        }else{
            this.$router.push({name: 'board', params: {project: index}})
        }
        this.openProjectList = false
    }
    onProjectDropdown() {
        if(this.projects.length <= 0) {
            this.requestForProjectList().finally()
        }
        this.openProjectList = !this.openProjectList
    }
    onProjectNew() {
        (this.$refs.createProjectDialog as CreateProjectDialog).open()
    }
    onModuleNew() {

    }
    //logic event
    onCreated() {
        //create
    }
    onUpdate() {
        //更新project id
        if(this.projectId !== this.$route.params.project) {
            this.projectId = this.$route.params.project
            //更新project信息和模块列表
            this.requestForProject()
            this.requestForModuleList()
        }
        //监视route的变化，以更改侧边栏按钮的选中状态。
        if(this.$route.name === 'board') this.asideActiveIndex = 'summary'
        else if(this.$route.name!.startsWith('board-note')) this.asideActiveIndex = 'note'
        else if(this.$route.name!.startsWith('board-module')) this.asideActiveIndex = `module-${this.$route.params.module}`
        else this.asideActiveIndex = ''
    }
    //method
    async requestForProjectList() {
        let r = await SDK.projects.list()
        if(r.ok) {
            this.projects = r.data.result
        }else{
            this.projects = []
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }
    async requestForProject() {
        let r = await SDK.projects.retrieve(this.projectId)
        if(r.ok) {
            this.project = r.data
        }else{
            this.project = EMPTY_PROJECT
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }
    async requestForModuleList() {
        //更新模块列表。
        let r = await SDK.modules.list({project: this.projectId})
        if(r.ok) {
            this.modules = r.data.result
        }else{
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
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
        width: 164px;
    }
    .aside-collapse {
        position: absolute;
        width: 64px;
    }
    .aside-color {
        background-color: #545c64
    }
    .aside-menu {
        border-right: 0;
    }
    .aside-menu-item {
        min-width: 164px;
    }
    .aside-header {
        height: 60px;
        border-bottom: 1px solid #444c54;
    }
    .aside-header-title {
        margin-left: 15px;
        display: inline-block;
        width: calc(100% - 1em - 25px)
    }
    .aside-header-dropdown {
        text-align: right;
        display: inline-block;
        width: 1em
    }
    .aside-menu-button {
        color: #ccc; 
        line-height: 30px; 
        padding-left: 20px; 
        font-size: 11px
    }
    .aside-menu-button [class^=el-icon] {
        font-size: 11px;
        text-align: left;
        margin-right: 0;
        width: 12px;
        vertical-align: auto
    }
</style>
