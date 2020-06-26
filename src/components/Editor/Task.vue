<template>
<div><h1>{{task.title}}</h1></div>
</template>

<script>

export default {
  name: 'CourseTask',
  props: ['chapterId', 'contentId'],
  computed: {
    task () {
      return this.$store.state.editor.course.getContent(this.chapterId, this.contentId)
    }
  }
}
</script>

<style scoped>

</style>
