<template lang='pug'>
  div.main-header
    label.mid-title(v-show='showTitle === undefined ? true : showTitle') PROJECT
    div.profile.text-right
        label {{profile.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Profile, EMPTY_PROFILE } from '@/common/models'
import { SDK } from '@/common/sdk'
import '@/styles/board-layout.css'
import '@/styles/layout.css'

@Component
export default class TopBar extends Vue {
    private profile: Profile = EMPTY_PROFILE
    @Prop() private showTitle!: boolean

    private created() {
      SDK.profile.get().then(r => { if(r.ok) this.profile = r.data })
    }
}
</script>

<style scoped>
.main-header {
    position: absolute;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #d7dae2;
}
.mid-title {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    line-height: 60px
}
.profile {
    position: absolute;
    right: 0;
    height: 100%;
    line-height: 60px;
    width: 140px;
    padding-right: 10px;
}
</style>
