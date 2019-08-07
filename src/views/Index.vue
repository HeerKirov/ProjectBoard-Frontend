<template lang="pug">
    el-card.login-dialog.layout-center(v-loading="loading")
        el-row.text-center
            label PROJECT
        el-row
            b 用户名
            el-input(v-model='username')
        el-row
            b 密码
            el-input(v-model='password', show-password=true)
        el-row
            el-alert(v-if='alert.title', :title='alert.title', :type='alert.type', effect='dark', :closable='false')
        el-row.pt-1
            el-col(:span="12")
                el-button(type="success", @click='doLogin') 登 录
            el-col(:span="12")
                div.text-right
                    el-link.mt-1.mb-1(type="primary", @click='doRegister') 注册 >>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SDK, AuthResult } from "@/common/sdk"
import '@/styles/layout.css'
import '@/styles/margin.css'
import '@/styles/padding.css'

const ALERTS = {
    INPUT_REQUIRED: {title: '请正确输入用户名和密码。', type: 'warning'},
    AUTH_FAILED: {title: '登录失败。请检查用户名或密码。', type: 'error'},
    EXPIRED: {title: '登录认证已经失效，请重新登录。', type: 'warning'},
    EXCEPTION: {title: '远程服务器发生预料之外的错误。', type: 'error'},
    DEFAULT: {title: '', type: 'info'}
}

@Component({components: {}})
export default class Index extends Vue {
    loading: boolean = true
    username: string = ''
    password: string = ''
    alert = {title: '', type: 'info'}

    private setAlertByAuthResult(result: AuthResult | null) {
        switch(result) {
            case AuthResult.AUTH_FAILED:
                this.alert = ALERTS.AUTH_FAILED
                break
            case AuthResult.EXPIRED:
                this.alert = ALERTS.EXPIRED
                break
            case AuthResult.EXCEPTION:
                this.alert = ALERTS.EXCEPTION
                break
            default:
                this.alert = ALERTS.DEFAULT
        }
    }

    async created() {
        let state = SDK.getState() == null ? await SDK.initialize() : SDK.getState();
        if(state === AuthResult.OK) {
            this.$router.push({name: 'home'})
        }else{
            this.loading = false
            this.setAlertByAuthResult(state)
        }
    }

    async doLogin() {
        if(!this.username || !this.password) {
            this.alert = ALERTS.INPUT_REQUIRED
            return
        }
        this.alert = ALERTS.DEFAULT
        this.loading = true
        let result = await SDK.authenticate(this.username, this.password)
        if(result === AuthResult.OK) {
            this.$router.push({name: 'home'})
        }else{
            this.loading = false
            this.setAlertByAuthResult(result)
        }
    }
    doRegister() {
        console.log('register')
    }
}
</script>

<style>
    .login-dialog {
        width: 350px;
        padding: 0 5px;
    }
    .el-row {
        margin: 10px 0;
    }
</style>
