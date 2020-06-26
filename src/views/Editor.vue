<template>
    <div v-if="!courseNotSet" class="row h-100">
      <side-nav></side-nav>
      <div class="col w-100 d-flex flex-column">
        <div class="row px-0">
          <top-nav></top-nav>
        </div>
        <div class="row px-5 pt-5 h-100 d-flex flex-column" style="overflow-y: auto">
          <component :is="currentComponent" :chapterId="selected.chapter"
                     :contentId="selected.content"></component>
        </div>
      </div>
    </div>
</template>

<script>
import SideNav from '../components/Editor/SideNav'
import TopNav from '../components/Editor/TopNav'
import MetaInfo from '../components/Editor/MetaInfo'
import CourseSection from '../components/Editor/Section'
import CourseTask from '../components/Editor/Task'
import CourseChapter from '../components/Editor/Chapter'

export default {
  name: 'Editor',
  components: { SideNav, TopNav, MetaInfo, CourseSection, CourseTask, CourseChapter },
  props: ['resource'],
  computed: {
    course () { return this.$store.state.editor.course },
    courseNotSet () { return !this.course || this.course.id === undefined || this.course.id !== this.resource },
    selected () { return this.$store.state.editor.selected },
    currentComponent () {
      if (this.selected.chapter === -1 && this.selected.content === -1) {
        return 'meta-info'
      } else if (this.selected.content !== -1) {
        const contentType = this.course.getContent(this.selected.chapter, this.selected.content).contentType
        return 'course-' + contentType
      } else {
        return 'course-chapter'
      }
    }
  },
  created () {
    if (this.courseNotSet) {
      this.$store.dispatch('getCourse', this.resource).then((course) => {
        console.log('course fetched from editor', course)
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('persist')
      .then(() => {
        console.log('persisted')
        next()
      })
      .catch(err => {
        console.log(err)
        next(false)
      })
  }
}
</script>

<style scoped>
</style>
