<template>
  <modal v-if="value" @close="discard">
    <div slot="header">
        <h3>Add a new resource</h3>
    </div>
    <meta-info v-model="this.course" slot="body"></meta-info>
    <div slot="footer">
      <button type="button" class="btn btn-light" @click.prevent="discard">Discard</button>
      <button type="submit" class="btn btn-success" @click.prevent="create">Continue</button>
    </div>
  </modal>
</template>

<script>
import Modal from '../Modal'
import { Course } from '../../models/course'
import MetaInfo from '../Editor/MetaInfo'

export default {
  name: 'AddResourceModal',
  components: { MetaInfo, Modal },
  props: ['value'],
  data () {
    return {
      course: new Course()
    }
  },
  methods: {
    discard () {
      this.course = new Course()
      this.course.author = this.$store.state.user.name
      this.$emit('input', false)
    },
    create () {
      this.$store.dispatch('newCourse', this.course).then(id =>
        this.$router.push({ path: `/edit/${id}` })
      )
    }
  },
  created () {
    this.course.author = this.$store.state.user.name
  }
}
</script>

<style scoped>
  .label {
    font-size: small;
    color: darkgray;
  }
  input, select, textarea {
    margin-top: 5px;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid black
  }
  button {
    border-radius: 0;
    margin-left: 10px
  }
</style>
