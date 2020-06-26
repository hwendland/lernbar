<template>
    <div class="col">
      <div class="row form-group">
        <label class="label">Title
          <input placeholder="Title" class="form-control form-control-lg" v-model="chapter.title"></label>
      </div>
      <div class="row w-100 justify-content-center py-5 m-0">
        <div class="card w-100">
          <div class="card-body">
            <h1 class="display-4 text-center pt-2">Banner</h1>
            <div class="d-flex text-secondary justify-content-end" style="margin: -5px; flex-grow: 0">
              <span class="material-icons">insert_photo</span>
              <span class="material-icons">theaters</span>
              <span class="material-icons">music_note</span>
              <span class="material-icons">map</span>
              <span class="material-icons">insert_link</span>
            </div>
          </div>
        </div>
      </div>
      <draggable class="row" :list="chapter.content">
        <div class="col-xl-3 col-md-4 col-sm-6 col-xs-12 mb-4" v-for="(content) in chapter.content" :key="content.id">
          <div class="card" @mouseenter="showDelete(content.id, $event)" @mouseleave="hideDelete(content.id, $event)">
            <img class="card-img-top" :src="content.previewImage" alt="preview"
                 @click="$store.commit('select', {chapter: chapter.id, content: content.id})">
            <div class="card-footer bg-white pb-0">
              <div class="row">
                <div class="col d-flex justify-content-start"
                     @click="$store.commit('select', {chapter: chapter.id, content: content.id})">
                  <h5 class="card-title">{{content.title}}</h5>
                </div>
                <div class="col justify-content-end d-flex text-secondary m-0 p-0" style="flex-grow: 0">
                  <span :id="'delete_' + content.id" class="material-icons pr-2 delete" style="display: none"
                        @click="deleteContent(content.id)">delete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'CourseChapter',
  components: { draggable },
  props: ['chapterId'],
  computed: {
    chapter () {
      return this.$store.state.editor.course.getChapter(this.chapterId)
    }
  },
  methods: {
    showDelete (id, event) {
      document.getElementById('delete' + '_' + id).style.display = 'inline-block'
    },
    hideDelete (id, event) {
      document.getElementById('delete' + '_' + id).style.display = 'none'
    },
    deleteContent (id) {
      this.$store.commit('deleteContent', { chapterId: this.chapterId, contentId: id })
    }
  }
}
</script>

<style scoped>
  .label {
    font-size: small;
    color: darkgray;
  }
  input {
    margin-top: 5px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #ffc107
  }
  .card {
    border-radius: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .material-icons, .card-title, .card-img-top {
    cursor: pointer;
  }
  .delete {
    transform: translate(0px, 0px);
  }
</style>
