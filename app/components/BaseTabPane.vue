<template>
  <div :id="paneId" class="tab-pane" role="tabpanel" tabindex="0">
    <slot />
  </div>
</template>

<script setup>
  // import BaseSection from '../../layout/BaseSection.vue';

  defineOptions({
    name: 'BaseTabPane',
  });

  const props = defineProps({
    paneId: {
      type: String,
      required: false,
    },
  });
</script>

<style lang="css" scoped>
  .tab-pane:focus {
    box-shadow: 0 0 10px #487ce4;
  }
</style>
