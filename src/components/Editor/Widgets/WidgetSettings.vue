<template>
  <div class="container p-5">
    <slot></slot>
    <div class="row w-100">
      <div class="col">
          <label>How many columns should the widget occupy?
            <select class="form-control" :value="size" @input="$emit('updateSize', $event.target.value)">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        <div class="col pl-0">
          <button @click.prevent="$emit('delete')" class="btn btn-danger delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetSettings',
  props: ['size']
}
</script>

<style scoped>
  button, select {
    border-radius: 0;
  }
  .delete {
    border-radius: 0;
    max-width: 50%
  }
</style>
