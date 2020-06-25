<template>
  <widget v-on:delete="$emit('delete')" :size="size" @updateSize="$emit('updateSize', $event)">
    <template v-slot:content="{ showSettings }">
      <iframe class="iframe__embed" v-show="value.url" :src="value.url"></iframe>
      <div v-if="!showSettings && value.url === ''" class="d-flex justify-content-center align-items-center" style="height: 300px">
        Go to settings to enter embed url!
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
  </widget>
</template>

<script>
import Widget from './Widget'
export default {
  name: 'IframeWidget',
  components: { Widget },
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
