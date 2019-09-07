<template lang="pug">
    div.main-container
        h4 task new
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
export default class BoardTaskDetail extends Vue {
    private project: Project = EMPTY_PROJECT
    private projectId!: string

    private created() {
        this.onCreated()
        this.onUpdate()
    }
    @Watch('$route') private onRouteChanged(to: Route, from: Route) {
        this.onUpdate()
    }

    protected onCreated() {}
    protected onUpdate() {}
}
</script>

<style scoped>

</style>
