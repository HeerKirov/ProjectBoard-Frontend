<template lang='pug'>
  div.main-header
    label.mid-title(v-show='showTitle === undefined ? true : showTitle') PROJECT
    div.profile-box.text-right
        el-link {{profile.name}}
    div.avatar-box
        img.avatar(:src='signAvatar(profile.avatarId)')
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Profile, EMPTY_PROFILE } from '@/common/models'
import { SDK } from '@/common/sdk'
import '@/styles/board-layout.css'
import '@/styles/layout.css'

@Component
export default class TopBar extends Vue {
private readonly EMPTY_AVATAR = require('@/assets/empty_avatar.jpg')

    private profile: Profile = EMPTY_PROFILE
    @Prop() private showTitle!: boolean

    private created() {
      SDK.profile.get().then(r => { if(r.ok) this.profile = r.data })
    }

    private signAvatar(filename: string): string {
        return filename ? SDK.resourceImages.signURL(filename) : this.EMPTY_AVATAR
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
.profile-box {
    position: absolute;
    right: 0;
    height: 100%;
    line-height: 60px;
    width: 100px;
    padding-right: calc(12px + 36px + 5px);
}
.avatar-box {
    position: absolute;
    right: 0;
    top: 22.5%;
    height: 55%;
    padding-right: 12px;
}
.avatar {
    height: 100%;
    border-radius: 50%;
}
</style>
