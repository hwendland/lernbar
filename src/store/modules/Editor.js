import { Course } from '../../models/course'
import axios from 'axios'
import { plainToClass } from 'class-transformer'

export const EditorStore = {
  state: () => ({
    course: new Course(),
    selected: { chapter: -1, content: -1 }
  }),
  getters: {
  },
  mutations: {
    setCourse (state, courseData) {
      state.course = courseData
    },
    newChapter (state) {
      const runningId = state.course.courseStructure.chapters.length + 1
      state.course.courseStructure.addChapter(runningId)
    },
    deleteChapter (state, chapterIndex) {
      state.course.courseStructure.deleteChapter(chapterIndex)
    },
    newSection (state, chapterIndex) {
      state.course.courseStructure.chapters[chapterIndex].addSection()
    },
    newTask (state, chapterIndex) {
      state.course.courseStructure.chapters[chapterIndex].addTask()
    },
    deleteContent (state, { chapterIndex, contentIndex }) {
      state.course.courseStructure.chapters[chapterIndex].deleteContent(contentIndex)
    },
    select (state, newSelection) {
      state.selected = newSelection
    }
  },
  actions: {
    newCourse: ({ dispatch, state, rootState }, courseData) => {
      return new Promise(resolve => {
        axios.post('/authoredItems/' + rootState.user.id + '.json', courseData).then(res => {
          const id = res.data.name
          axios.patch('/authoredItems/' + rootState.user.id + '/' + id + '.json', { id: id })
            .then((res) => {
              dispatch('getCourse', res.data.id).then((course) => {
                resolve(course.id)
              })
            })
        })
      })
    },
    getCourse: ({ commit, dispatch, state, rootState }, courseId) => {
      return new Promise(resolve => {
        console.log('store fetching course ', courseId + ' for user ', rootState.user.id)
        axios.get('/authoredItems/' + rootState.user.id + '/' + courseId + '.json').then(res => {
          commit('setCourse', plainToClass(Course, res.data))
          resolve(state.course)
        })
      })
    },
    persist: ({ state, rootState }) => {
      return new Promise((resolve, reject) => {
        axios.put('/authoredItems/' + rootState.user.id + '/' + state.course.id + '.json', state.course)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  }
}
