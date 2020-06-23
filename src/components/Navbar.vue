<template>
  <nav class="navbar navbar-light bg-light navbar-expand sticky-top" :style="{height: '100px'}">
    <router-link tag="div" class="nav-link pr-0" to="/">
      <img alt="lernbar Logo" class="logo" src="../../public/img/lernbarLogo.png"/>
    </router-link>
    <ul class="navbar-nav mr-auto d-flex align-items-center">
      <router-link tag="li" class="nav-item nav-link navbar-brand" to="/">lernbar</router-link>
      <router-link tag="li" class="nav-item nav-link" to="Author" v-if="canUserAccess('author')">Author</router-link>
      <router-link tag="li" class="nav-item nav-link" to="Trainer" v-if="canUserAccess('trainer')">Trainer</router-link>
      <router-link tag="li" class="nav-item nav-link" to="Trainee" v-if="canUserAccess('trainee')">Trainee</router-link>
    </ul>
    <ul class="navbar-nav" v-if="userIsLoggedIn">
      <router-link tag="li" class="nav-item nav-link" to="Dashboard">
        <span class="material-icons mr-2">speed</span>Dashboard</router-link>
      <li class="nav-item dropdown">
        <div class="nav-link dropdown-toggle" role="button" @click="show=!show">
          <span class="material-icons">person</span>
          Hi {{ $store.state.user.name }}</div>
        <div class="dropdown-menu dropdown-menu-right" :class="{show: show}" @mouseleave="show=!show">
          <a class="dropdown-item">Settings</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click="logout">Logout</a>
        </div>
      </li>
    </ul>
    <ul v-else class="navbar-nav">
      <router-link tag="li" class="nav-item nav-link" to="SignIn">Sign in</router-link>
      <router-link tag="li" class="nav-item nav-link" to="SignUp">Sign up</router-link>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      show: false
    }
  },
  computed: mapGetters(['canUserAccess', 'userIsLoggedIn']),
  methods: {
    logout () {
      return this.$store.dispatch('logout').then(() => {
        if (this.$route.name !== 'Home') this.$router.push('/').then()
      })
    }
  }
}
</script>

<style scoped>
  .logo {
    width: 50px;
    height: 50px;
    padding: 0;
  }
  .nav-link {
    cursor: pointer;
  }
  .navbar-brand {
    color: grey;
  }
</style>
