<template>
<div><h1>{{task.title}}</h1></div>
</template>

<script>

export default {
  name: 'CourseTask',
  props: ['chapterIndex', 'contentIndex'],
  computed: {
    task () {
      return this.$store.state.editor.course.getContent(this.chapterIndex, this.contentIndex)
    }
  }
}
</script>

<style scoped>

</style>
