<template lang='pug'>
    textarea(:class='[classTheme, classMaxSize]', 
            ref='textareaBox', 
            v-model='text', 
            @keydown.tab.prevent='onTab').resize-none.markdown-family
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import '@/styles/board-layout.css'
import '@/styles/layout.css'
import '@/styles/font.css';

function generateSpace(size: number): string {
    let ret = ''
    for(let i = 0; i < size; ++i) ret += ' '
    return ret
}

const TAB_SPACE_SIZE = 4
const TAB_SPACE = generateSpace(TAB_SPACE_SIZE)

@Component
export default class TextBox extends Vue {
    @Prop() private theme!: string
    @Prop() private value!: string
    @Prop() private autoResize!: boolean

    private text: string = this.value || ''

    private mounted() {
        if(this.autoResize === true || this.autoResize === undefined) {
            TextBox.expandTextArea(this.$refs.textareaBox as Element)
        }
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

    private get classTheme() {
        if(!this.theme || this.theme === 'element') return 'el-textarea__inner'
        else if(this.theme === 'empty') return 'empty-block'
        else return ''
    }
    private get classMaxSize() {
        if(this.autoResize === false) return 'max-height'
        else return null
    }

    private static expandTextArea(el: Element) {
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

<style scoped>
    .max-height {
        height: 100%;
    }
    .resize-none {
        resize: none;
    }
    .empty-block {
        display: inline-block;
        width: 100%;
        border: 0;
        outline-width: 0;
        padding: 5px 5px 0px 5px;
        box-sizing: border-box;
        font-size: inherit;
    }
    .markdown-family {
        font-family: monaco
    }
</style>
