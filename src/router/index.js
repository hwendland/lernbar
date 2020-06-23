import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    component: () => import(/* webpackChunkName: "author" */ '../views/Author.vue')
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: () => import(/* webpackChunkName: "trainer" */ '../views/Trainer.vue')
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
    component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signuo" */ '../views/SignUp.vue')
  },
  {
    path: '/edit/:resource',
    name: 'Editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
