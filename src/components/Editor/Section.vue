<template>
  <div class="col">
    <div class="d-flex justify-content-end mb-5" style="flex-grow: 0">
      <span @click="addWidget('text-widget')" class="material-icons">text_fields</span>
      <span @click="addWidget('iframe-widget')" class="material-icons">insert_link</span>
      <span class="material-icons">insert_photo</span>
      <span class="material-icons">theaters</span>
      <span class="material-icons">music_note</span>
    </div>
    <draggable :list="widgets" class="row">
      <component @delete="deleteWidget(index)" v-model=widget.content
                 :size="widget.columns" @updateSize="widget.columns=$event"
                 :is="widget.type" v-for="(widget, index) in widgets" :key="widget.id"></component>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TextWidget from './Widgets/Text'
import IframeWidget from './Widgets/IFrame'

export default {
  name: 'CourseSection',
  components: { TextWidget, IframeWidget, draggable },
  props: ['chapterIndex', 'contentIndex'],
  computed: {
    section () {
      return this.$store.state.editor.course.getContent(this.chapterIndex, this.contentIndex)
    },
    widgets: {
      get () { return this.section.widgets },
      set (value) {
        this.$store.commit('reorderWidgets', {
          chapterIndex: this.chapterIndex,
          contentIndex: this.contentIndex,
          widgets: value
        })
      }
    }
  },
  methods: {
    addWidget (widgetType) {
      this.$store.commit('addWidget', {
        chapterIndex: this.chapterIndex,
        contentIndex: this.contentIndex,
        widgetType: widgetType
      })
    },
    deleteWidget (index) {
      this.$store.commit('deleteWidget', {
        chapterIndex: this.chapterIndex,
        contentIndex: this.contentIndex,
        widgetIndex: index
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
