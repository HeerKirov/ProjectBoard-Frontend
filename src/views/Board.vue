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
            
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { SDK } from '@/common/sdk'
import { Profile } from '@/common/models'
import '@/styles/layout.css'
import '@/styles/padding.css'
import '@/styles/margin.css'

@Component({components: {}})
export default class Home extends Vue {
    profile: Profile = {username: '', name: '', dateJoined: 0, isStaff: false}

    async created() {
        this.requestForProjectList()
        SDK.profile.get().then(r => { if(r.ok) this.profile = r.data })
    }

    async requestForProjectList() {
        
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
</style>
