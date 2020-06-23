<template>
  <div id="app">
    <navbar v-if="!$route.path.includes('edit')"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    const userId = localStorage.getItem('userId')
    if (userId) {
      this.$store.dispatch('getUserData', userId)
    }
  }
}
</script>

<style>
  body, html, #app {
    height: 100%;
    overflow: hidden;
  }
  .material-icons {
    transform: translateY(5px);
  }
</style>
