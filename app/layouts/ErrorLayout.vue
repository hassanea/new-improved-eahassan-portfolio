<template>
  <base-skip-link v-focus to="#content" label="Skip to main content" />
  <base-main class="p-16 md:p-20">
    <slot />
  </base-main>
</template>

<script setup lang="ts">
  import BaseSkipLink from '@/components/BaseSkipLink.vue';
  import BaseMain from '@/components/BaseMain.vue';
</script>
