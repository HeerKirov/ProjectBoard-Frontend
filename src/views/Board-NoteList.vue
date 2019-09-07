<template lang="pug">
    div
        div.header-container
            div.left
                el-link.pl-1.pr-1(@click='onBack')
                    i.el-icon-d-arrow-left
                    = '模块总览'
            div.right.text-right
                el-link.pl-1.pr-1(@click='onNoteCreate')
                    i.el-icon-document-add
                    = '新建'
        div.main-container
            div.overflow-area
                el-table(:data='notes', height='100%', :default-sort='{prop: "title", order: "ascending"}')
                    el-table-column(prop='title', label='文件名', sortable)
                        template(slot-scope='scope')
                            el-link(@click='onNoteItem(scope.row)') {{scope.row.title}}
                    el-table-column(v-if='showModuleColumn', prop='module', label='模块', sortable)
                    el-table-column(prop='updateTime', label='修改时间', width='125px', sortable, :formatter='tableFormatUpdateTime')
                    el-table-column(prop='createTime', label='创建时间', width='125px', sortable, :formatter='tableFormatCreateTime')
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, Project, EMPTY_PROFILE, EMPTY_PROJECT, Module, Note } from '@/common/models'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'
import '@/styles/board-layout.css'
import { DateFormatter } from '../common/utils';

@Component({components: {}})
export default class BoardNote extends Vue {
    private notes: Note[] = []
    private projectId!: string
    private moduleId!: string

    private showModuleColumn!: boolean

    private created() {
        this.onCreated()
        this.onUpdate()
    }
    @Watch('$route') private onRouteChanged(to: Route, from: Route) {
        this.onUpdate()
    }

    protected onCreated() { }
    protected onUpdate() {
        this.showModuleColumn = this.$route.name !== 'board-module-note'
        if(this.moduleId !== this.$route.params.module) {
            this.projectId = this.$route.params.project
            this.moduleId = this.$route.params.module
            this.requestForNoteList()
        }
    }

    private onBack() {
        this.$router.push({name: 'board-module', params: {project: this.projectId, module: this.moduleId}})
    }
    private onNoteItem(note: Note) {
        this.$router.push({name: 'board-module-note-detail', params: {project: this.projectId, module: this.moduleId, note: note.id}})
    }
    private onNoteCreate() {
        this.$router.push({name: 'board-module-note-new', params: {project: this.projectId, module: this.moduleId}})
    }

    private async requestForNoteList() {
        let r = await SDK.moduleNotes.list({project: this.projectId, module: this.moduleId})
        if(r.ok) {
            this.notes = r.data.result
        }else{
            this.notes = []
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }

    private tableFormatUpdateTime(row: Note): string {
        return DateFormatter.toFriendly(row.updateTime)
    }
    private tableFormatCreateTime(row: Note): string {
        return DateFormatter.toFriendly(row.createTime)
    }
}
</script>

<style scoped>
    .overflow-area {
        /* overflow: auto; */
        box-sizing: border-box;
        /* margin-top: 1px; */
        padding-top: 1px;
        height: 100%;
    }
</style>
