<template lang="pug">
    div.main-container
        h4 module
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile, Project, EMPTY_PROFILE, EMPTY_PROJECT, Module } from '@/common/models'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'
import '@/styles/board-layout.css'

@Component({components: {}})
export default class BoardModule extends Vue {
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