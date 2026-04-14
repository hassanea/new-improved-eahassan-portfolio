<template>
  <ul
    class="mx-auto mt-3 mb-6 flex h-auto w-full list-none flex-col justify-center gap-3 md:mt-4 md:gap-3.5"
  >
    <slot></slot>
  </ul>
</template>

<script setup>
  defineOptions({
    name: 'BaseGoalList',
  });
</script>
