<template>
<div v-if="!isMinimized" style="max-width: 40%; min-width: 200px"
     class="col-md-2 col-sm-1 col-lg-2 h-100 pr-0 bg-light shadow text-secondary d-flex flex-column">
  <div class="row p-2" style="overflow: hidden">
    <div class="col">
      <span class="material-icons nav-button" @click="saveAndClose">arrow_back</span>
    </div>
    <div class="col d-flex justify-content-end">
      <span class="material-icons nav-button" style="cursor: pointer;"
            @click="isMinimized=!isMinimized">menu_open</span>
    </div>
  </div>
  <div style="overflow: auto">
    <div class="list-group-flush pt-5 pl-0 course-title">
      <div id="title" class="list-group-item" @click="select({chapter: -1, content: -1})"
          :class="titleClass">
        <span class="material-icons pr-2">school</span>
        <span class="cursor">{{course.title}}</span>
      </div>
      <draggable :list="course.courseStructure.chapters">
      <div class="list-group-item"
          v-for="chapter in course.courseStructure.chapters" :key="chapter.id">
        <div class="row" @mouseenter="showDelete(chapter.id, -1, $event)" @mouseleave="hideDelete(chapter.id, -1, $event)">
          <div class="col pr-0 mr-0" @click="select({chapter: chapter.id, content: -1})"
               :class="isSelected(chapter.id)">
            <span class="material-icons pr-2">book</span>
            <span class="cursor">{{chapter.title}}</span>
          </div>
          <div class="col p-0 m-0 justify-content-end d-flex flex-row" style="flex-grow: 0">
            <span class="material-icons pr-2 delete" :id="'delete' + '_' + chapter.id"
                  @click="deleteChapter(chapter.id)">delete</span>
            <span class="material-icons pr-2" @click="invertExpansion(chapter.id)"
                  v-if="!isChapterExpanded[chapter.id]">expand_more</span>
            <span class="material-icons pr-2" v-else
                  @click="invertExpansion(chapter.id)">expand_less</span>
          </div>
        </div>
        <draggable class="list-group sublist py-2" v-if="isChapterExpanded[chapter.id]"
                   :list="chapter.content" group="chapterContent">
          <div v-for="content in chapter.content" :key="content.id">
            <div class="row" @mouseenter="showDelete(chapter.id, content.id, $event)"
                 @mouseleave="hideDelete(chapter.id, content.id, $event)">
              <div class="col pr-0 mr-0" @click="select({chapter: chapter.id, content: content.id})"
                   :class="isSelected(chapter.id, content.id)">
                <span v-if="content.contentType==='section'" class="material-icons pr-2">description</span>
                <span v-else class="material-icons pr-2">create</span>
                <span class="cursor">{{content.title}}</span>
              </div>
              <div class="col p-0 m-0 justify-content-end d-flex flex-row" style="flex-grow: 0">
                <span class="material-icons pr-2 delete" :id="'delete' + '_' + chapter.id + '_' + content.id"
                      @click="deleteContent(chapter.id, content.id)">delete</span>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </draggable>
  </div>
  <button v-if="buttonExpanded" @click="newChapter"
          class="btn btn-light btn-sm btn-small-circle" style="bottom: 200px">
    <span class="material-icons">book</span>
  </button>
  <button v-if="buttonExpanded" @click="newContent('section')"
          class="btn btn-light btn-sm btn-small-circle" style="bottom: 140px">
    <span class="material-icons">description</span>
  </button>
  <button v-if="buttonExpanded" @click="newContent('task')"
          class="btn btn-light btn-sm btn-small-circle" style="bottom: 80px">
    <span class="material-icons">create</span>
  </button>
  <button class="btn btn-warning text-white btn-large-circle" @click="buttonExpanded=!buttonExpanded">
    <span v-if="!buttonExpanded" class="material-icons nav-button">add</span>
    <span v-else class="material-icons nav-button">close</span>
  </button>
</div>
</div>
<div v-else class="h-100 pr-0 bg-light shadow text-secondary" style="width: 70px">
  <div class="row p-2">
    <div class="col d-flex justify-content-end">
      <span class="material-icons nav-button" @click="isMinimized=!isMinimized">menu_open</span>
    </div>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'SideNav',
  components: { draggable },
  data () {
    return {
      isMinimized: false,
      buttonExpanded: false,
      isChapterExpanded: {}
    }
  },
  computed: {
    course () { return this.$store.state.editor.course },
    selected () { return this.$store.state.editor.selected },
    titleClass () {
      return { selected: this.selected.chapter === -1 && this.selected.content === -1 }
    }
  },
  methods: {
    saveAndClose () {
      this.$router.push({ name: 'Author' })
      // persist
    },
    newChapter () {
      this.$store.dispatch('newChapter').then(newChapterId => {
        this.$set(this.isChapterExpanded, newChapterId, true)
      })
    },
    newContent (contentType) {
      this.$store.dispatch('newContent', contentType)
    },
    select (newSelection) {
      this.$store.commit('select', newSelection)
    },
    invertExpansion (chapterId) {
      this.isChapterExpanded[chapterId] = !this.isChapterExpanded[chapterId]
    },
    isSelected (chapterId, contentId = -1) {
      if (contentId >= 0) {
        return { selected: this.selected.content === contentId }
      }
      return { selected: this.selected.chapter === chapterId && this.selected.content === -1 }
    },
    showDelete (chapterId, contentId = -1, event) {
      let id = 'delete' + '_' + chapterId
      if (contentId !== -1) {
        id = id + '_' + contentId
      }
      document.getElementById(id).style.display = 'inline-block'
    },
    hideDelete (chapterId, contentId = -1, event) {
      let id = 'delete' + '_' + chapterId
      if (contentId !== -1) {
        id = id + '_' + contentId
      }
      document.getElementById(id).style.display = 'none'
    },
    deleteChapter (chapterId) {
      if (this.isSelected(chapterId)) {
        this.select({ chapter: -1, content: -1 })
      }
      this.$store.commit('deleteChapter', chapterId)
    },
    deleteContent (chapterId, contentId) {
      if (this.isSelected(chapterId, contentId)) {
        this.select({ chapter: chapterId, content: -1 })
      }
      this.$store.commit('deleteContent', { chapterId, contentId })
    }
  },
  created () {
    this.course.courseStructure.chapters.forEach((chapter) => {
      this.$set(this.isChapterExpanded, chapter.id, true)
    })
  }
}
</script>

<style scoped lang="scss">
  .nav-button {
    font-size: xx-large;
  }
  .list-group-item {
    background-color: #f8f9fa!important;
    font-size: smaller;
    padding-left: 10px
  }
  .list-group-flush:first-child .list-group-item:first-child {
    border-top: 1px solid rgba(0, 0, 0, .125);
    z-index: 19;
  }
  .cursor {
    cursor: pointer;
  }
  .sublist {
    padding-left: 20px;
    list-style: none;
  }
  .btn-large-circle {
    border-radius: 50px;
    text-align: center;
    line-height: 1.4;
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: xx-large;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 100;
  }

  .btn-small-circle {
    border-radius: 50px;
    text-align: center;
    line-height: 2;
    position: absolute;
    right: 15px;
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 100;
    color: #6c757d!important
  }
  .shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .selected {
    color: #ffc107;
    font-weight: bold;
  }
  .material-icons {
    cursor: pointer;
  }
  .delete {
    font-size: medium;
    transform: translate(0px, 10px);
    display: none;
  }
  #title {
    border-top: 0
  }
</style>
