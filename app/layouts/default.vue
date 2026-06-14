<template>
  <base-header :heading="mainHeading" :description="description" />
  <base-main> <slot /> </base-main>
  <lazy-base-footer :social-links :year="currentYear" />
</template>

<script setup lang="ts">
  import BaseHeader from '@/components/BaseHeader.vue';
  import BaseMain from '@/components/BaseMain.vue';
  // import BaseFooter from '@/components/BaseFooter.vue';
  import resume from '@/assets/data/resume.json';

  import { usePortfolioStore } from '../../stores/usePortfolioStore';

  const store = usePortfolioStore();

  const { currentYear } = storeToRefs(store);

  const {
    developer: { name, description },
  } = resume;

  const { socialLinks } = resume;

  const mainHeading = computed(() => {
    if (!name) return '';
    else return `I'm ${name}.`;
  });
</script>

<script lang="ts" setup></script>

<style></style>
