<template>
  <widget-frame ref="widget" :size="size">
    <template v-slot:content="{ showSettings }">
      <iframe class="iframe__embed" v-show="value.url" :src="value.url"></iframe>
      <div v-if="!showSettings && value.url === ''" class="d-flex justify-content-center align-items-center" style="height: 300px">
        <span>Go to settings to enter embed url!</span>
      </div>
    </template>
    <template v-slot:settings>
      <div class="row w-100 mb-5">
        <div class="col w-100 d-flex">
            <input class="iframe__input" @paste.stop v-model="value.url" @input="$emit('input', value)"
                   type="text" placeholder="URL"/>
        </div>
      </div>
    </template>
  </widget-frame>
</template>

<script>
import WidgetFrame from './Widget'
export default {
  name: 'IframeWidget',
  components: { WidgetFrame },
  props: ['value', 'size']
}
</script>

<style lang="scss">
  @import '../../../assets/sass/variables';
  .iframe {
    &__embed {
      width: 100%;
      height: 15rem;
      border: 0;
    }
    &__input {
      display: block;
      width: 100%;
      font: inherit;
      border: 0;
      border-radius: 0;
      background-color: rgba($color-black, 0.1);
      padding: 0.3rem 0.5rem;
    }
  }
</style>
