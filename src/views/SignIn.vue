<template>
    <div class="row justify-content-around">
      <div class="col-md-5 col-sm-5">
        <strong>Already have an account?</strong>
        <p>Sign in</p>
        <hr>
        <form>
          <div class="form-group">
            <label for="email1">Email address</label>
            <input autocomplete="email" v-model="authData.email" type="email" class="form-control" id="email1">
          </div>
          <div class="form-group">
            <label for="password1">Password</label>
            <input autocomplete="password" v-model="authData.password" type="password" class="form-control" id="password1">
          </div>
          <button type="submit" class="btn btn-success" @click.prevent="signIn" :disabled="!validated">Sign in</button>
        </form>
      </div>
    </div>
</template>

<script>

export default {
  name: 'SignIn',
  data () {
    return {
      authData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('signIn', this.authData).then(() => this.$router.push('Dashboard'))
    }
  },
  computed: {
    validated () {
      return this.authData.name !== '' && this.authData.password !== ''
    }
  }
}
</script>

<style scoped>
  .col-md-5 {
    padding-top: 5rem;
  }
  button {
    border-radius: 0;
  }
  input {
    border-radius: 0;
  }
</style>
