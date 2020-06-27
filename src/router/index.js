import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/author',
    name: 'Author',
    component: () => import(/* webpackChunkName: "author" */ '../views/Author.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.canUserAccess('author')) { next() } else next('/')
    }
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: () => import(/* webpackChunkName: "trainer" */ '../views/Trainer.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.canUserAccess('trainer')) { next() } else next('/')
    }
  },
  {
    path: '/trainee',
    name: 'Trainee',
    component: () => import(/* webpackChunkName: "trainee" */ '../views/Trainee.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.userIsLoggedIn) { next({ name: 'Dashboard' }) } else next()
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignUp.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.userIsLoggedIn) { next({ name: 'Dashboard' }) } else next()
    }
  },
  {
    path: '/edit/:resource',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      if (store.getters.canUserAccess('author')) { next() } else next('/')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters.userIsLoggedIn || ['Home', 'SignIn', 'SignUp'].includes(to.name)) {
    next()
  } else if (!store.getters.userIsLoggedIn && localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    store.dispatch('getUserData', userId).then(() => next())
  } else {
    next({ name: 'SignIn' })
  }
})

export default router
