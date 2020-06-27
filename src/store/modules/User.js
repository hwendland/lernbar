import axios from 'axios'

export const UserStore = {
  state: () => ({
    name: '',
    email: '',
    id: null,
    role: ''
  }),
  getters: {
    userIsLoggedIn: state => { return state.id != null },
    canUserAccess: state => role => {
      if (state.id === null || !state.role) return false
      const rights = {
        author: ['author', 'trainer', 'trainee'],
        trainer: ['trainer', 'trainee'],
        trainee: ['trainee']
      }
      return rights[state.role].includes(role)
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.name = user.name
      state.email = user.email
      state.id = user.id
      state.role = user.role
    }
  },
  actions: {
    signUp: ({ dispatch }, userData) => {
      return new Promise((resolve) => {
        axios.post('/users.json', userData).then(res => {
          const id = res.data.name
          dispatch('getUserData', id).then(() => resolve())
        })
      })
    },
    signIn: ({ commit }, { email, password }) => {
      return new Promise((resolve, reject) => {
        axios.get('/users.json').then(res => {
          const data = Object.entries(res.data)
          const user = data.filter(([key, values]) => {
            return values.email === email && values.password === password
          })[0]
          if (user) {
            localStorage.setItem('userId', user[0])
            commit('setUser', { id: user[0], name: user[1].name, email: user[1].email, role: user[1].role })
            resolve()
          } else {
            reject(Error('no match'))
          }
        })
      })
    },
    getUserData: ({ commit, state }, userId) => {
      return new Promise((resolve, reject) => {
        axios.get('/users/' + userId + '.json').then(res => {
          const user = res.data
          if (user) {
            localStorage.setItem('userId', userId)
            commit('setUser', { id: userId, name: user.name, email: user.email, role: user.role })
            resolve()
          } else { reject(Error('could not retrieve user')) }
        })
      })
    },
    logout: ({ commit }) => {
      localStorage.removeItem('userId')
      commit('setUser', { id: null, name: '', email: '', role: '' })
    }
  }
}
