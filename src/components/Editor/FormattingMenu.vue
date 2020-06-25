<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
    <div class="menubar is-hidden" :class="{ 'is-focused': focused }">
      <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
        <span class="material-icons">format_bold</span>
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
        <span class="material-icons">format_italic</span>
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
        <span class="material-icons">format_strikethrough</span>
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
        <span class="material-icons">format_underline</span>
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
        <span class="material-icons">code</span>
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">
        P
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">
        H1
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
        H2
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">
        H3
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
        <span class="material-icons">format_list_bulleted</span>
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
        <span class="material-icons">format_list_numbered</span>
      </button>
<!--      <button class="menubar__button" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">-->
<!--        <span class="material-icons">format_quote</span>-->
<!--      </button>-->
<!--      <button class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click="commands.code_block">-->
<!--        <span class="material-icons">code</span>-->
<!--      </button>-->
    </div>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'
export default {
  name: 'FormattingMenu',
  components: { EditorMenuBar },
  props: ['editor']
}
</script>

<style scoped lang="scss" src="../../assets/sass/menubar.scss">
</style>
