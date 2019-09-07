<template lang="pug">
    div
        div.header-container
            div.left
                el-link.pl-1.pr-1(@click='onBack')
                    i.el-icon-d-arrow-left
                    = '笔录'
        div.main-container.pt-1.pl-1.pr-1
            div.title-text-div
                text-line.title-text(v-model='title', placeholder='在此处书写标题')
            div.content-text-div
                text-box(theme='empty', :auto-resize='false', placeholder='在此处书写内容。支持Markdown语法与工具·')
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, Project, EMPTY_PROFILE, EMPTY_PROJECT, Module } from '@/common/models'
import TextLine from '@/components/TextLine.vue'
import TextBox from '@/components/TextBox.vue'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'
import '@/styles/board-layout.css'

@Component({components: {TextLine, TextBox}})
export default class BoardNoteNew extends Vue {
    private title: string = ''
    private content: string = ''

    private projectId!: string
    private moduleId!: string

    private created() {
        //创建时同时执行created和update事件。
        this.onCreated()
        this.onUpdate()
    }
    @Watch('$route') private onRouteChanged(to: Route, from: Route) {
        this.onUpdate()
    }

    protected onCreated() { }
    protected onUpdate() {
        if(this.moduleId !== this.$route.params.module) {
            this.projectId = this.$route.params.project
            this.moduleId = this.$route.params.module
        }
    }

    private onBack() {
        this.$router.push({name: 'board-module-note', params: {project: this.projectId, module: this.moduleId}})
    } 
}
</script>

<style scoped>
    .title-text-div {
        border-bottom: 1px solid #DCDFE6;
    }
    .title-text {
        font-size: 18px;
        line-height: 25px;
    }
    .content-text-div {
        height: calc(100% - 36px);
        box-sizing: border-box;
        /* padding: 5px; */
        /* overflow: auto; */
    }
</style>
