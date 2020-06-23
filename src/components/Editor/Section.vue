<template>
<div><h1>{{section.title}}</h1></div>
</template>

<script>

export default {
  name: 'CourseSection',
  props: ['chapterIndex', 'contentIndex'],
  computed: {
    section () {
      return this.$store.state.editor.course.getContent(this.chapterIndex, this.contentIndex)
    }
  }

}
</script>

<style scoped>

</style>
