<template>
  <div
    class="backdrop fixed inset-0 z-1080 h-screen w-screen cursor-pointer overflow-y-scroll"
    :style="{ backgroundColor: color }"
  >
    <slot />
  </div>
</template>

<script setup>
  import validateColor from 'validate-color';

  defineOptions({
    name: 'BaseBackdrop',
  });

  const props = defineProps({
    color: {
      type: String,
      required: false,
      default: 'rgb(50, 50, 50)',
      validator(value) {
        return validateColor(value);
      },
    },
  });
</script>

<style lang="css" scoped>
  .tranparent-reduce #teleports .backdrop {
    background-color: v-bind(color);
    opacity: 1;
  }

  .tranparent-no-pref #teleports .backdrop {
    background-color: v-bind(color);
    opacity: 0.97;
  }
</style>
