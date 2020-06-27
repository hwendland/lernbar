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
      state.course.courseStructure.addChapter()
    },
    deleteChapter (state, chapterId) {
      state.course.courseStructure.deleteChapter(chapterId)
    },
    newContent (state, { chapterId, contentType }) {
      if (contentType === 'section') {
        state.course.courseStructure.getChapter(chapterId).addSection()
      } else {
        state.course.courseStructure.getChapter(chapterId).addTask()
      }
    },
    deleteContent (state, { chapterId, contentId }) {
      state.course.courseStructure.getChapter(chapterId).deleteContent(contentId)
    },
    select (state, newSelection) {
      state.selected = newSelection
    },
    addWidget (state, { chapterId, contentId, widgetType }) {
      state.course.getContent(chapterId, contentId).addWidget(widgetType)
    },
    deleteWidget (state, { chapterId, contentId, widgetId }) {
      state.course.getContent(chapterId, contentId).deleteWidget(widgetId)
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
    },
    newChapter: ({ state, commit }) => {
      return new Promise(resolve => {
        commit('newChapter')
        const newChapterId = state.course.courseStructure.getLastChapter().id
        resolve(newChapterId)
      })
    },
    newContent ({ state, commit }, contentType) {
      if (state.selected.chapter !== -1) {
        commit('newContent', { chapterId: state.selected.chapter, contentType })
      } else {
        const lastChapterId = state.course.getLastChapter().id
        commit('newContent', { chapterId: lastChapterId, contentType })
      }
    }
  }
}
