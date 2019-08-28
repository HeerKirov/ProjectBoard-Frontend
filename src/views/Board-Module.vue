<template lang="pug">
    div.main-container
        div.module-top.p-1
            h3 {{module.name}}
            span {{module.description}}
        div.module-task
            el-link.ml-1(@click='onTaskList') 任务
                i.el-icon-d-arrow-right
            div.overflow-area
                el-card(v-if='tasks.length <= 0', shadow='never')
                    div
                        el-link.task-title(@click='onTaskCreate') 新建任务
                            i.el-icon-d-arrow-right
                    div.task-desc 没有待解决的任务。
                el-card.mb-1(v-for='task in tasks', :key='task.id') 
                    div
                        el-link.task-title(@click='onTaskItem(task)') {{task.title}}
                    div.task-desc {{task.description}}
                    div.task-statistics.mt-1
                        div.display-50
                            i.el-icon-s-claim
                            = ' {{task.statistics.todoNum - task.statistics.todoComplete}}/{{task.statistics.todoNum}} '
                            i.el-icon-s-opportunity
                            = ' {{task.statistics.thinkNum - task.statistics.thinkComplete}}/{{task.statistics.thinkNum}} '
                            i.el-icon-s-order
                            = ' {{task.statistics.noteNum}}'
                        div.text-right.display-50(v-if='task.deadline', :class='`task-deadline-${getDeadlineColor(task.deadline)}`')
                            = '完成截止时间：{{toDateTime(task.deadline)}}'
        div.module-note
            el-link.ml-1(@click='onNoteList') 笔录
                i.el-icon-d-arrow-right
            div.overflow-area
                el-card(shadow='never', v-if='notes.length <= 0')
                    label.extra 没有笔录。
                    el-link(@click='onNoteCreate') 新建
                        i.el-icon-d-arrow-right
                el-card(v-else)
                    el-row(v-for='note in notes', :key='note.id').pb-1
                        el-col(:span='16')
                            el-link(@click='onNoteItem(note)') {{note.title}}
                        el-col.text-right(:span='8')
                            span.date {{toFriendlyDate(note.updateTime)}}

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, Project, EMPTY_PROFILE, EMPTY_PROJECT, Module, Note, Task } from '@/common/models'
import { DateFormatter, DAY_MS } from '@/common/utils'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'
import '@/styles/board-layout.css'

@Component({components: {}})
export default class BoardModule extends Vue {
    private module: Module = EMPTY_PROJECT
    private notes: Note[] = []
    private tasks: Task[] = []
    private projectId!: string
    private moduleId!: string

    private created() {
        this.onCreated()
        this.onUpdate()
    }
    @Watch('$route') private onRouteChanged(to: Route, from: Route) {
        this.onUpdate()
    }
    
    private onTaskList() {
        this.$router.push({name: 'board-module-task', params: {project: this.projectId, module: this.moduleId}})
    }
    private onTaskCreate() {
        this.$router.push({name: 'board-module-task-new', params: {project: this.projectId, module: this.moduleId}})
    }
    private onTaskItem(task: Task) {
        this.$router.push({name: 'board-module-task-detail', params: {project: this.projectId, module: this.moduleId, task: task.id}})
    }
    private onNoteList() {
        this.$router.push({name: 'board-module-note', params: {project: this.projectId, module: this.moduleId}})
    }
    private onNoteCreate() {
        this.$router.push({name: 'board-module-note-new', params: {project: this.projectId, module: this.moduleId}})
    }
    private onNoteItem(note: Note) {
        this.$router.push({name: 'board-module-note-detail', params: {project: this.projectId, module: this.moduleId, note: note.id}})
    }

    private onCreated() { }
    private onUpdate() {
        if(this.moduleId !== this.$route.params.module) {
            this.projectId = this.$route.params.project
            this.moduleId = this.$route.params.module
            this.requestForModule()
            this.requestForNoteList()
            this.requestForTaskList()
        }
    }

    private async requestForModule() {
        let r = await SDK.modules.retrieve({project: this.projectId}, this.moduleId)
        if(r.ok) {
            this.module = r.data
        }else{
            this.module = EMPTY_PROJECT
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }
    private async requestForNoteList() {
        //TODO 添加limit限制和updateTime排序
        let r = await SDK.moduleNotes.list({project: this.projectId, module: this.moduleId})
        if(r.ok) {
            this.notes = r.data.result
        }else{
            this.notes = []
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }
    private async requestForTaskList() {
        //TODO 添加limit限制、updateTime&deadline排序和archived过滤
        let r = await SDK.moduleTasks.list({project: this.projectId, module: this.moduleId})
        if(r.ok) {
            this.tasks = r.data.result
        }else{
            this.tasks = []
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }

    private toFriendlyDate = DateFormatter.toFriendly
    private toDateTime = DateFormatter.toDateTime
    private getDeadlineColor(deadline: number) {
        let minus = deadline - new Date().getTime()
        if(minus < 0) return 'out'
        else if(minus <= DAY_MS) return 'danger'
        else if(minus <= DAY_MS * 7) return 'warn'
        else return 'normal'
    }
}
</script>

<style scoped>
    .module-top {
        height: 120px; 
        width: 100%; 
        position: absolute; 
        box-sizing: border-box
    }
    .module-task {
        height: calc(100% - 120px); 
        width: 60%;
        top: 120px; 
        box-sizing: border-box; 
        position: absolute; 
        padding: 10px;
    }
    .module-note {
        height: calc(100% - 120px);
        width: 40%;
        right: 0;
        top: 120px;
        box-sizing: border-box;
        position: absolute;
        padding: 10px;
    }
    .overflow-area {
        overflow: auto;
        position: absolute;
        box-sizing: border-box;
        top: 32px;
        height: calc(100% - 32px);
        left: 10px;
        right: 0;
        padding: 10px;
    }

    .date {
        font-size: 14px;
        color: #999
    }
    .extra {
        font-size: 14px;
        color: #777
    }

    .task-title {
        font-size: 16px;
    }
    .task-desc {
        font-size: 12px
    }
    .task-statistics {
        font-size: 12px
    }
    .task-deadline-normal {
        color: #111
    }
    .task-deadline-warn {
        color: #E6A23C
    }
    .task-deadline-danger {
        color: #F56C6C
    }
    .task-deadline-out {
        color: #aaa
    }
    .display-50 {
        display: inline-block;
        width: 50%
    }
</style>
