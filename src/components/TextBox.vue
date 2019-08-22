<template lang='pug'>
    textarea.el-textarea__inner(ref='textareaBox', style='resize: none', v-model='text', @keydown.tab.prevent='onTab')
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import '@/styles/board-layout.css'
import '@/styles/layout.css'

function generateSpace(size: number): string {
    let ret = ''
    for(let i = 0; i < size; ++i) ret += ' '
    return ret
}

const TAB_SPACE_SIZE = 4
const TAB_SPACE = generateSpace(TAB_SPACE_SIZE)

@Component
export default class TextBox extends Vue {
    @Prop() private value!: string
    private text: string = this.value || ''

    private mounted() {
        TextBox.expandTextArea(this.$refs.textareaBox as Element)
    }

    @Watch('value') private onValueChange(val: string) {
        this.text = val
    }
    @Watch('text') private onTextChange(val: string) {
        this.$emit('input', val)
    }

    private onTab() {
        let el = (this.$refs.textareaBox as any)
        let start = el.selectionStart, end = el.selectionEnd
        el.value = (el.value as string).substring(0, start) + TAB_SPACE + (el.value as string).substring(end)
        el.selectionStart = el.selectionEnd = start + TAB_SPACE_SIZE
        this.$emit('input', el.value)
    }

    static expandTextArea(el: Element) {
        let timer: number | null = null
        function setStyle(el: any, auto: boolean = false) {
            if (auto) el.style.height = 'auto';
            el.style.height = el.scrollHeight + 5 + 'px';
        }
        el.addEventListener('input', () => setStyle(el, true), false);
        setStyle(el)
    }
}
</script>

<style>
    .markdown-textarea {
        display: inline-block;
        width: 100%;
        line-height: 25px;
        border-top: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
        border-left: 0;
        border-right: 0;
        border-radius: 4px;
        /* outline-style: ridge; */
        outline-width: 2px;
        padding: 5px 15px;
        box-sizing: border-box;
        font-size: inherit;
        resize: vertical;
    }
</style>
