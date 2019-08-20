<template lang="pug">
    el-container
        //- el-header
        //-     el-row
        //-         el-col(:span='12') &nbsp;
        //-         el-col(:span='12').text-right
                    //- label {{profile.name}}
        //- label.mid-title PROJECT
        el-main

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, Project, EMPTY_PROFILE, EMPTY_PROJECT, Module } from '@/common/models'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'

@Component({components: {}})
export default class Board extends Vue {
    project: Project = EMPTY_PROJECT
    projectId: string = ''

    created() {
        this.projectId = this.$route.params.project
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
}
</script>

<style scoped>

</style>
