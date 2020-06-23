<template>
    <nav class="navbar bg-secondary text-white navbar-expand sticky-top w-100 justify-content-between shadow">
      <div class="navbar-brand pl-2">
        {{ course.title }}
      </div>
      <div class="pr-2">
        <span class="material-icons pr-2">palette</span>
        <span class="material-icons">more_vert</span>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'TopNav',
  computed: {
    course () { return this.$store.state.editor.course }
  }
}
</script>

<style scoped>
  .material-icons {
    transform: none;
    cursor: pointer;
  }
  .shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>
