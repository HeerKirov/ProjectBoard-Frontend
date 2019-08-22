<template lang="pug">
    el-card.center-dialog.layout-center
        el-row.text-center
            label PROJECT
        el-row
            label 404 NotFound
        el-row
            span 没有找到页面。
        el-row
            div.text-right
                el-link.mt-1(type="primary", @click='onBack') << 返回
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import '@/styles/layout.css'

@Component({components: {}})
export default class NotFound extends Vue{
    private onBack() {
        this.$router.back()
    }
}
</script>

<style scoped>
    .center-dialog {
        width: 350px;
        padding: 0 5px;
    }
    .el-row {
        margin: 10px 0;
    }
</style>
