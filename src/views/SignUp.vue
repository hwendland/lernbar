<template>
  <div class="row justify-content-around">
    <div class="col-md-5 col-sm-5">
      <strong>Not registered yet?</strong>
      <p>Sign up and get started immediately!</p>
      <hr>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input autocomplete="name" v-model="authData.name" type="text" class="form-control" id="name">
        </div>
        <div class="form-group">
          <label for="role">Select your role</label>
          <select class="form-control" id="role" v-model="authData.role">
            <option value="author">Author</option>
            <option value="trainer">Trainer</option>
            <option value="trainee">Trainee</option>
          </select>
        </div>
        <div class="form-group">
          <label for="email2">Email address</label>
          <input autocomplete="email" v-model="authData.email" type="email" class="form-control" id="email2">
        </div>
        <div class="form-group">
          <label for="password2">Password</label>
          <input autocomplete="pw" v-model="authData.password" type="password" class="form-control" id="password2">
        </div>
        <div class="form-group">
          <label for="password3">Confirm password</label>
          <input autocomplete="confirm-pw" v-model="authData.passwordConfirmation" type="password" class="form-control" id="password3">
        </div>
        <button type="submit" class="btn btn-success" @click.prevent="signUp" :disabled="!validated">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      authData: {
        name: '',
        email: '',
        role: 'trainee',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  computed: {
    validated () {
      return this.authData.password === this.authData.passwordConfirmation &&
        this.authData.name !== '' && this.authData.email !== '' && this.authData.password !== ''
    }
  },
  methods: {
    signUp () {
      this.$store.dispatch('signUp', this.authData).then(() => this.$router.push('Dashboard'))
    }
  }
}
</script>

<style scoped>
  .col-md-5 {
    padding-top: 1rem;
  }
  button {
    border-radius: 0;
  }
  input {
    border-radius: 0;
  }
</style>
