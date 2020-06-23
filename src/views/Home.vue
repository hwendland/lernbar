<template>
  <div class="container-fluid p-0 h-100" id="home">
    <div class="row" style="height: 100%">
      <div class="col h-100 d-flex align-items-center flex-column">
        <h1 class="text-white big mt-auto">all is learnable</h1>
        <h2 class="text-white subtitle">Start learning from inspiring teachers for free!</h2>
        <div class="button-group mb-auto mt-5">
          <button class="btn btn-lg btn-success"><span class="material-icons">keyboard_arrow_right</span></button>
          <button class="btn btn-lg btn-success">VIEW ALL COURSES
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
  }
}
</script>

<style scoped>
  #home {
    background-image: url("../../public/img/backgroundHome.jpg");
    background-size: 100% 100%;
    background-blend-mode: darken;
    background-color: rgba(0, 0, 0, .4);
    overflow: hidden;
  }
  .big {
    font-size: 6vmin;
    font-weight: 200;
  }
  .subtitle {
    font-size: 4vmin;
    font-weight: 200;
  }
  button {
    border-radius: 0;
    font-weight: bold;
    height: 100%;
  }
  .material-icons {
    transform: translateY(5px);
  }
</style>
