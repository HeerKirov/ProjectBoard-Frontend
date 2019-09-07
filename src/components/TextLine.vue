<template lang='pug'>
    input.empty-block(ref='textareaBox', v-model='text')
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import '@/styles/board-layout.css'
import '@/styles/layout.css'

@Component
export default class TextLine extends Vue {
    @Prop() private value!: string
    private text: string = this.value || ''

    private mounted() {
        
    }

    @Watch('value') private onValueChange(val: string) {
        this.text = val
    }
    @Watch('text') private onTextChange(val: string) {
        this.$emit('input', val)
    }
}
</script>

<style scoped>
    .empty-block {
        display: inline-block;
        width: 100%;
        border: 0;
        outline-width: 0;
        padding: 5px 5px;
        box-sizing: border-box;
        font-size: inherit;
    }
</style>
