<template lang="pug">
    el-card.center-dialog.layout-center(v-loading="loading")
        el-row.text-center
            label PROJECT
        el-row
            label 404 NotFound
        el-row
            span 没有找到页面。
</template>

<style scoped>
    .center-dialog {
        width: 350px;
        padding: 0 5px;
    }
    .el-row {
        margin: 10px 0;
    }
</style>
