<template>
<div class="row h-100">
  <div class="col-3 h-100 ml-2">
    <button class="btn btn-light btn-block py-2" @click="showModal=true">
      <span class="material-icons">add</span>
      Add resource</button>
    <ul class="list-group">
      <li class="list-group-item">Saved items</li>
      <li class="list-group-item">Submitted items</li>
      <li class="list-group-item">Evaluated items</li>
      <li class="list-group-item">Authored items</li>
      <li class="list-group-item">Remixed items</li>
    </ul>
    <ul class="list-group">
      <li class="list-group-item" style="border-bottom: 2px solid black"><strong>My folders</strong></li>
      <li class="list-group-item" v-for="folder in folders" :key="folder.name">{{ folder.name }}</li>
      <li class="list-group-item text-muted form-inline">
        <label class="mb-0" style="justify-content: left">
          <span class="material-icons" style="transform: none">add</span>
          <input placeholder="create folder" class="form-control"
                 v-model.lazy="newFolder" @keyup.enter="addFolder">
        </label>
      </li>
    </ul>
  </div>
  <div class="col-8 h-100 d-flex flex-column" style="overflow: hidden">
    <div class="row mt-5">
      <div class="col" style="overflow-y: hidden; flex-shrink: 0">
        <div class="list-group-item head"><strong>My items ({{courses.length}})</strong></div>
        <div is="course-list-nav" @save="saveToFolder" @delete="deleteSelection" @search="filter=$event"></div>
      </div>
    </div>
    <div class="row" style="overflow-y: auto; max-height: 55vh;">
      <div class="col">
        <ul class="list-group">
          <li is="course-list-item" v-for="course in filteredItems" :key="course.id"
              :course="course" @input="updateSelection($event, course.id)"></li>
        </ul>
      </div>
    </div>
  </div>
  <add-resource-modal v-model="showModal"></add-resource-modal>
</div>
</template>

<script>
import axios from 'axios'
import CourseListItem from '../components/Author/CourseListItem'
import CourseListNav from '../components/Author/CourseListNav'
import AddResourceModal from '../components/Author/AddResourceModal'
import { Course } from '../models/course'
import { plainToClass } from 'class-transformer'

export default {
  name: 'Author',
  components: { CourseListItem, CourseListNav, AddResourceModal },
  data () {
    return {
      folders: [],
      courses: [],
      newFolder: undefined,
      filter: '',
      selection: [],
      showModal: false
    }
  },
  computed: {
    userId () { return this.$store.state.user.id },
    filteredItems () {
      return this.courses.filter(course => course.title.includes(this.filter))
    },
    folderUrl () { return '/folders/' + this.userId + '.json' },
    courseUrl () { return '/authoredItems/' + this.userId + '.json' }
  },
  methods: {
    addFolder () {
      this.folders.push({ name: this.newFolder, courses: [] })
      axios.put('/folders/' + this.userId + '/' + this.newFolder + '.json',
        { name: this.newFolder, courses: [] })
        .then(() => {
          this.newFolder = undefined
        })
    },
    saveToFolder () {},
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
    }
  },
  created () {
    axios.get(this.folderUrl).then(res => {
      for (const k in res.data) {
        this.folders.push(res.data[k])
      }
    })
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
  button {
    border-radius: 0;
    border: none;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .list-group-item {
    border-right: none;
    border-left: none;
    cursor: pointer;
    border-radius: 0;
  }
  .list-group-item input {
    border: none;
    max-width: 90%;
  }
  .head {
    border-bottom: 2px solid black;
    border-top: none;
    cursor: auto;
  }
</style>
