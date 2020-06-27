<template>
  <widget-frame :size="size">
    <template v-slot:content>
      <formatting-menu :editor="editor"></formatting-menu>
      <editor-content class="editor__content" :editor="editor"/>
    </template>
    <template v-slot:settings></template>
  </widget-frame>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Blockquote, BulletList, CodeBlock, Heading, ListItem, OrderedList, Bold, Code, Italic, Link, Strike, Underline
} from 'tiptap-extensions'
import FormattingMenu from '../FormattingMenu'
import WidgetFrame from './Widget'

export default {
  name: 'TextWidget',
  components: { EditorContent, FormattingMenu, WidgetFrame },
  props: ['value', 'size'],
  data () {
    return {
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Blockquote(), new BulletList(), new CodeBlock(), new Heading({ levels: [1, 2, 3] }), new ListItem(),
          new OrderedList(), new Link(), new Bold(), new Code(), new Italic(), new Strike(), new Underline()
        ],
        onUpdate: ({ getHTML }) => {
          this.$emit('input', { text: getHTML() })
        }
      })
    }
  },
  mounted () {
    this.editor.setContent(this.value.text)
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style scoped lang="scss" src="../../../assets/sass/editor.scss">
</style>
