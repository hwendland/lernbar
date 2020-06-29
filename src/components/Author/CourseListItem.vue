<template>
    <div class="row py-2 border-bottom">
      <div class="col-1">
        <input type="checkbox" class="form-control" v-model="checked" @input="$emit('input', $event)">
      </div>
      <div class="col-md-3" @click="openEditor" style="cursor: pointer">
        <img :src="course.previewImage" class="placeholder">
      </div>
      <div class="col">
        <div class="mb-2 font-weight-bold" @click="openEditor" style="cursor: pointer">
          {{course.title}} - created {{ course.created | date }}
        </div>
        <div class="small">View item description</div>
        <div class="small">Subject: {{ course.subject }}</div>
        <div class="small">Material type: {{ course.materialType }}</div>
      </div>
      <div class="col-3">
        <span class="ml-5 font-italic">{{ course.status }}</span>
      </div>
    </div>
</template>

<script>
import { date } from '../../filters/date'
import { Course } from '../../models/course'
export default {
  name: 'CourseListItem',
  filters: { date },
  props: { course: Course, value: Array },
  data () { return { checked: false } },
  methods: {
    openEditor () {
      this.$store.commit('setCourse', this.course)
      this.$router.push({ path: `/edit/${this.course.id}` })
    }
  }
}
</script>

<style scoped>
  .placeholder {
    max-height: 15vh;
    width: 100%;
    height: auto;
    max-width: 15vw
  }
  .form-control:focus {
    box-shadow: none;
    border: none
  }
</style>
