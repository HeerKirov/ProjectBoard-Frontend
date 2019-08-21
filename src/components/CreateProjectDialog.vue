<template lang='pug'>
    el-dialog(title='新建项目', :visible.sync='visible')
        el-row
            b 项目名称
            el-input(v-model='name')
        el-row
            b 简介
            el-input(type='textarea', :autosize='{minRows: 2}', v-model='description', placeholder='支持使用Markdown语法')
        div(slot='footer').dialog-footer
            el-button(@click='onCancel') 取消
            el-button(type='primary', @click='onOK') 确定
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Profile, EMPTY_PROFILE } from '@/common/models'
import { SDK } from '@/common/sdk'
import '@/styles/board-layout.css'
import '@/styles/layout.css'

@Component
export default class CreateProjectDialog extends Vue {
    private name: string = ''
    private description: string = ''

    private visible: boolean = false

    created() {
      
    }

    onCancel() {
        this.visible = false
    }
    onOK() {

    }

    open() {
        this.visible = true
    }
}
</script>

<style scoped>
    .el-row {
        margin: 10px 0;
    }
</style>
