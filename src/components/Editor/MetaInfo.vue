<template>
  <form>
    <div class="form-group">
      <label class="label">Resource title
        <input placeholder="Title" class="form-control form-control-lg" v-model="value.title"></label>
    </div>
    <div class="row justify-content-between">
      <div class="col-3 form-group">
        <div class="row">
          <div class="col">
            <label class="label w-75">Resource type
              <input placeholder="Type" v-model="value.materialType" class="form-control form-control-sm">
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="label w-75"> Subject
              <input placeholder="subject" v-model="value.subject" class="form-control form-control-sm">
            </label>
          </div>
        </div>
      </div>
      <div class="col form-group">
        <div class="row">
          <div class="col">
            <label class="label w-75">Interactivity
              <select class="form-control form-control-sm" v-model="value.interactivity">
                <option value="explanatory">explanatory</option>
              </select>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="label w-75"> Language
              <select class="form-control form-control-sm" v-model="value.language">
                <option>German</option>
                <option>English</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group col-3">
        <div class="row">
          <div class="col-6">
            <label class="label">Duration
              <input placeholder="0:30" v-model="value.duration" class="form-control form-control-sm">
            </label>
          </div>
          <div class="col-6" style="max-width: 60%">
            <label class="label">Age group
              <input placeholder="7-9" v-model="value.ages" class="form-control form-control-sm">
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="label w-75">Author
              <input placeholder="Enter name" v-model="value.author" class="form-control form-control-sm">
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="label">
        <textarea placeholder="Description" v-model="value.description" rows="4" cols="50" class="form-control form-control-sm"></textarea>
      </label>
    </div>
  </form>

</template>

<script>
import { Course } from '../../models/course'

export default {
  name: 'MetaInfo',
  props: {
    value: {
      type: Course,
      default: function () { return this.$store.state.editor.course }
    }
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
  .col-3.form-group {
    flex: 0 0 33%;
    max-width: 33%;
  }
  .form-control-lg {
    border-bottom: 1px solid #ffc107
  }
</style>
