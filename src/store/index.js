import Vue from 'vue'
import Vuex from 'vuex'
import { UserStore } from './modules/User'
import { EditorStore } from './modules/Editor'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: UserStore,
    editor: EditorStore
  }
})
