<template>
  <div class="widget-container" :style="{width: 90*size/3 + '%'}">
    <span @click="showSettings=!showSettings" class="material-icons settings">settings</span>
    <slot v-if="!showSettings" name="content" :showSettings="showSettings"></slot>
    <widget-settings ref="settings" v-if="showSettings" :size="size">
      <slot name="settings"></slot>
    </widget-settings>
  </div>
</template>

<script>
import WidgetSettings from './WidgetSettings'
export default {
  name: 'Widget',
  components: { WidgetSettings },
  props: ['size'],
  data () {
    return {
      showSettings: false
    }
  }
}
</script>

<style scoped lang="scss">
  .widget-container {
    border: 1px dashed lightgray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 10px;

    .settings {
      cursor: pointer;
    }
  }
</style>
