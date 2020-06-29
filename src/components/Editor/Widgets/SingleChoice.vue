<template>
  <widget-frame ref="widget" :size="size">
    <template v-slot:content>
      <div class="row flex-column p-5">
        <formatting-menu :editor="questionEditor"></formatting-menu>
        <editor-content class="editor__content" :editor="questionEditor"></editor-content>
        <hr>
        <draggable :list="value.options">
          <label v-for="(option, index) in value.options" :key="option.text" class="form-group form-inline">
            <input type="radio" class="form-check-input radio" v-model.lazy="checkedOption"
                   @input="check(option, $event)" :value="index">
            <textarea class="form-control" placeholder="new option" rows="1" style="width: 90%"
                   v-model.lazy="option.text" @change="$emit('input', value)"></textarea>
            <span class="material-icons delete" @click="deleteOption(index)">delete</span>
          </label>
        </draggable>
        <div style="transform: translateX(-5px)">
          <label class="form-group form-inline">
            <span class="material-icons" style="width: 5%; transform: none" @click="addOption">add</span>
            <textarea class="form-control" placeholder="new option" rows="1" style="width: 90%"
                      v-model.lazy="newOption.text"></textarea>
          </label>
        </div>
      </div>
    </template>
    <template v-slot:settings>
      <div class="row w-100 mb-5">
      </div>
    </template>
  </widget-frame>
</template>

<script>
import WidgetFrame from './Widget'
import draggable from 'vuedraggable'
import { Editor, EditorContent } from 'tiptap'
import {
  BulletList, ListItem, OrderedList, Bold, Italic, Link, Blockquote, CodeBlock, Heading, Strike, Code, Underline
} from 'tiptap-extensions'
import FormattingMenu from '../FormattingMenu'

export default {
  name: 'SCWidget',
  components: { EditorContent, WidgetFrame, draggable, FormattingMenu },
  props: ['value', 'size'],
  data () {
    return {
      checkedOption: undefined,
      newOption: { text: '', isChecked: false, isCorrect: false },
      questionEditor: new Editor({
        extensions: [
          new Blockquote(), new BulletList(), new CodeBlock(), new Heading({ levels: [1, 2, 3] }), new ListItem(),
          new OrderedList(), new Link(), new Bold(), new Code(), new Italic(), new Strike(), new Underline()
        ],
        onUpdate: ({ getHTML }) => {
          this.$emit('input', { question: getHTML(), options: this.value.options })
        }
      })

    }
  },
  methods: {
    check (option, event) {
      option.isChecked = true
      this.$emit('input', this.value)
    },
    addOption () {
      this.value.options.push(this.newOption)
      this.newOption = { text: '', isChecked: false, isCorrect: false }
      this.$emit('input', this.value)
    },
    deleteOption (index) {
      this.value.options.splice(index, 1)
      this.$emit('input', this.value)
    }
  },
  mounted () {
    this.questionEditor.setContent(this.value.question)
  },
  beforeDestroy () {
    this.questionEditor.destroy()
  }
}
</script>

<style scoped lang="scss">
  @import "../../../assets/sass/editor.scss";
  .radio {
    padding-right: 10px
  }
  .form-control {
    border: none;
  }
  .form-group {
    margin-bottom: 0;
  }
  .form-control:focus {
    box-shadow: none;
    border: none;
  }
  .delete {
    font-size: medium;
    padding-left: 10px;
  }
  .material-icons {
    cursor: pointer;
    color: #6c757d;
  }
</style>
