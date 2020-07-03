<template>
  <div class="col">
    <div class="row form-group justify-content-between">
      <label class="label">Title
        <input placeholder="Title" class="form-control form-control-lg title" v-model="task.title">
      </label>
      <div class="d-flex justify-content-end mb-5" style="flex-grow: 0">
        <span @click="addWidget('mc-widget')" class="material-icons">check_box_outline_blank</span>
        <span @click="addWidget('single-choice-widget')" class="material-icons">radio_button_unchecked</span>
        <span class="material-icons">star_half</span>
        <span class="material-icons">question_answer</span>
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
import { widgetMethods } from '../../mixins/Editor/widgetMethods'
import draggable from 'vuedraggable'
import SingleChoiceWidget from './Widgets/SingleChoice'

export default {
  name: 'CourseTask',
  props: ['chapterId', 'contentId'],
  components: { draggable, SingleChoiceWidget },
  mixins: [widgetMethods],
  computed: {
    task () { return this.$store.state.editor.course.getContent(this.chapterId, this.contentId) },
    widgets () { return this.task.widgets }
  }
}
</script>

<style scoped>
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
