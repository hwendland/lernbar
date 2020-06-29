<template>
  <div class="col-8 h-100 d-flex flex-column" style="overflow: hidden">
    <div class="row mt-5">
      <div class="col" style="overflow-y: hidden; flex-shrink: 0">
        <div class="list-group-item head"><strong>My items ({{courses.length}})</strong></div>
        <div is="course-list-nav" @save="saveToFolder" @delete="deleteSelection" @search="filter=$event"></div>
      </div>
    </div>
    <div class="row" style="overflow-y: auto; max-height: 60vh; height: 55vh">
      <div class="col">
        <ul class="list-group">
          <li is="course-list-item" v-for="course in filteredItems" :key="course.id"
              :course="course" @input="updateSelection($event, course.id)"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CourseListItem from './CourseListItem'
import CourseListNav from './CourseListNav'
import { plainToClass } from 'class-transformer'
import { Course } from '../../models/course'

export default {
  name: 'CourseList',
  components: { CourseListItem, CourseListNav },
  data () {
    return {
      courses: [],
      filter: '',
      selection: []
    }
  },
  computed: {
    userId () { return this.$store.state.user.id },
    filteredItems () {
      return this.courses.filter(course => course.title.includes(this.filter))
    },
    courseUrl () { return '/authoredItems/' + this.userId + '.json' }
  },
  methods: {
    deleteSelection () {
      this.courses = this.courses.filter(course => !this.selection.includes(course.id))
      this.selection = []
      const keyedData = {}
      this.courses.forEach(course => {
        keyedData[course.id] = course
      })
      axios.put(this.courseUrl, keyedData).then(res => console.log(res))
    },
    updateSelection (event, id) {
      if (!event.target.checked) {
        const index = this.selection.indexOf(id)
        this.selection.splice(index, 1)
      } else { this.selection.push(id) }
    },
    saveToFolder () {}
  },
  created () {
    axios.get(this.courseUrl).then(res => {
      const courses = []
      for (const k in res.data) {
        courses.push(res.data[k])
      }
      this.courses = plainToClass(Course, courses)
    })
  }

}
</script>

<style scoped>
  .head {
    border: none;
    border-bottom: 2px solid black;
    cursor: auto;
  }
</style>
