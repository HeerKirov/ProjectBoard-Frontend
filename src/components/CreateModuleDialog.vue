<template lang='pug'>
    el-dialog(title='新建模块', :visible.sync='visible')
        el-row
            b 模块名称
            el-input(v-model='name', placeholder='模块名称')
            el-alert.mt-1(v-if='alert && alert.name', :title='alert.name', type='error', effect='dark', :closable='false')
        el-row
            b 描述
            el-input(v-model='description', placeholder='用一句话简要描述模块的作用')
            el-alert.mt-1(v-if='alert && alert.description', :title='alert.description', type='error', effect='dark', :closable='false')
        div(slot='footer').dialog-footer
            el-button(type='primary', @click='onOK', :disabled='loading', v-loading='loading') 创建
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { Profile, EMPTY_PROFILE } from '@/common/models'
import { SDK } from '@/common/sdk'
import TextBox from '@/components/TextBox.vue'
import '@/styles/board-layout.css'
import '@/styles/layout.css'

interface AlertType {name?: string, description?: string}

@Component({components: {TextBox}})
//event: created
export default class CreateModuleDialog extends Vue {
    @Prop() private projectId!: string
    private name: string = ''
    private description: string = ''

    private alert: AlertType | null = null

    private loading: boolean = false
    private visible: boolean = false
    //gui event
    private onOK() {
        this.alert = this.validate()
        if(this.alert == null) {
            this.createModule()
        }
    }
    //public method
    open() {
        this.visible = true
    }
    close() {
        this.visible = false
    }
    clear() {
        this.name = ''
        this.description = ''
    }
    //method
    private validate(): AlertType | null {
        let ret: AlertType = {}
        let flag = false
        if(!this.name) {
            ret.name = '模块名称不能为空。'
            flag = true
        }
        return flag ? ret : null
    }
    private async createModule() {
        this.loading = true
        let {ok, status, data} = await SDK.modules.create({project: this.projectId}, {name: this.name, description: this.description})
        if(ok) {
            this.close()
            this.clear()
            this.$emit('created', data.id)
        }else{
            Message({message: `服务器发生意料之外的错误: ${status}, ${data}`, type: 'error'})
        }
        this.loading = false
    }
}
</script>

<style scoped>
    .el-row {
        margin: 10px 0;
    }
</style>
