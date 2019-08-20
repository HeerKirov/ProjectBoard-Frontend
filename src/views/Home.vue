<template lang="pug">
    el-container
        el-header
            el-row
                el-col(:span='4') &nbsp;
                el-col(:span='16').text-center
                    label PROJECT
                el-col(:span='4').text-right
                    label {{profile.name}}
        el-main
            div.board-view
                el-card.box-card(v-for='project in projects', :key='project.id')
                    el-link.project-title(@click='OnClickProject(project.id)', :underline='false') {{project.name}}
                    div.project-desc {{project.description}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, EMPTY_PROFILE } from '@/common/models'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'

@Component({components: {}})
export default class Home extends Vue {
    profile: Profile = EMPTY_PROFILE
    projects: any[] = []

    async created() {
        this.requestForProjectList()
        SDK.profile.get().then(r => { if(r.ok) this.profile = r.data })
    }

    async requestForProjectList() {
        let r = await SDK.projects.list()
        if(r.ok) {
            this.projects = r.data.result
        }else{
            this.projects = []
            Message({message: `服务器发生错误：${r.status}`, type: "error"})
        }
    }

    OnClickProject(projectId: string) {
        this.$router.push({name: 'board', params: {project: projectId}})
    }
}
</script>

<style scoped>
    .el-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .el-header {
        border-bottom: 1px solid #d7dae2;
        line-height: 60px
    }
    .board-view {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fit, 300px);
    }
    .project-title {
        font-size: 16px;
        margin-bottom: 5px
    }
    .project-desc {
        font-size: 14px
    }
</style>
