<template>
<div class="row h-100">
  <div class="col-3 h-100 ml-2">
    <button class="btn btn-light btn-block py-2" @click="showModal=true">
      <span class="material-icons">add</span>
      Add resource</button>
  <folders></folders>
  </div>
  <course-list></course-list>
  <add-resource-modal v-model="showModal"></add-resource-modal>
</div>
</template>

<script>
import CourseList from '../components/Author/CourseList'
import Folders from '../components/Author/Folders'
import AddResourceModal from '../components/Author/AddResourceModal'

export default {
  name: 'Author',
  components: { CourseList, AddResourceModal, Folders },
  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style scoped>
  button {
    border-radius: 0;
    border: none;
    margin-top: 25px;
    margin-bottom: 25px;
  }
</style>
