<template lang="pug">
    div
        top-bar
        div.main-container.p-2
            div.board-view
                el-card(v-for='project in projects', :key='project.id')
                    el-link.project-title(@click='onClickProject(project.id)', :underline='false') {{project.name}}
                    div.project-desc {{project.description}}
                el-card(shadow='hover')
                    el-link.project-title(@click='onClickProjectNew', :underline='false') 
                        i.el-icon-plus
                        = '新建项目'
                    div.project-desc &nbsp;
        create-project-dialog(ref='createProjectDialog', @created='onProjectCreated')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, EMPTY_PROFILE } from '@/common/models'
import CreateProjectDialog from '@/components/CreateProjectDialog.vue'
import TopBar from '@/components/TopBar.vue'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'

@Component({components: {TopBar, CreateProjectDialog}})
export default class Home extends Vue {
    private profile: Profile = EMPTY_PROFILE
    private projects: any[] = []

    private async created() {
        this.requestForProjectList()
        SDK.profile.get().then(r => { if(r.ok) this.profile = r.data })
    }

    private async requestForProjectList() {
        let r = await SDK.projects.list({})
        if(r.ok) {
            this.projects = r.data.result
        }else{
            this.projects = []
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }

    private onClickProject(projectId: string) {
        this.$router.push({name: 'board', params: {project: projectId}})
    }
    private onClickProjectNew() {
        (this.$refs.createProjectDialog as CreateProjectDialog).open()
    }
    private onProjectCreated(projectId: string) {
        this.$router.push({name: 'board', params: {project: projectId}})
    }
}
</script>

<style scoped>
    .board-view {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fit, 300px);
        overflow: auto;
        max-height: 100%;
    }
    .project-title {
        font-size: 16px;
        margin-bottom: 5px
    }
    .project-desc {
        font-size: 14px
    }
</style>
