<template>
  <form class="form-inline justify-content-between" style="margin-bottom: 1.5rem">
    <div>
      <button @click.prevent="$emit('save')" class="btn btn-light">
        <span class="material-icons">folder_open</span>
      </button>
      <button @click.prevent="$emit('delete')" class="btn btn-light">
        <span class="material-icons">delete_outline</span>
      </button>
    </div>
    <div class="input-group border-bottom">
      <label>
        <input placeholder="Search my items" class="form-control search"
               @input="$emit('search', searchTerm)" v-model="searchTerm">
      </label>
      <span class="material-icons">search</span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CourseListNav',
  data () {
    return {
      searchTerm: ''
    }
  }
}
</script>

<style scoped>
  button {
    border: none;
    border-radius: 0;
    margin: 5px;
  }
  .search {
    border: none
  }
</style>
