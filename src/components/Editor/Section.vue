<template>
  <div class="col">
    <div class="row form-group justify-content-between">
      <label class="label">Title
        <input placeholder="Title" class="form-control form-control-lg title" v-model="section.title">
      </label>
      <div class="d-flex justify-content-end mb-5" style="flex-grow: 0">
        <span @click="addWidget('text-widget')" class="material-icons">text_fields</span>
        <span @click="addWidget('iframe-widget')" class="material-icons">insert_link</span>
        <span class="material-icons">insert_photo</span>
        <span class="material-icons">theaters</span>
        <span class="material-icons">music_note</span>
      </div>
    </div>
    <draggable :list="widgets" class="row">
      <component @delete="deleteWidget(widget.id)" v-model=widget.content
                 :size="widget.columns" @updateSize="widget.columns=$event"
                 :is="widget.type" v-for="(widget) in widgets" :key="widget.id"></component>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TextWidget from './Widgets/Text'
import IframeWidget from './Widgets/IFrame'
import { widgetMethods } from '../../mixins/Editor/widgetMethods'

export default {
  name: 'CourseSection',
  components: { TextWidget, IframeWidget, draggable },
  props: ['chapterId', 'contentId'],
  mixins: [widgetMethods],
  computed: {
    section () {
      return this.$store.state.editor.course.getContent(this.chapterId, this.contentId)
    },
    widgets () { return this.section.widgets }
  }
}
</script>

<style scoped lang="scss">
  .title {
      margin-top: 5px;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #ffc107
    }
  .label {
    font-size: small;
    color: darkgray;
  }
</style>
