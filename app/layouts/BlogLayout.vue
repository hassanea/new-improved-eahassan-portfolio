<template>
  <div>
    <base-main> <slot /> </base-main>
    <base-footer :social-links :year="currentYear" />
  </div>
</template>

<script setup lang="ts">
  import BaseMain from '@/components/BaseMain.vue';
  import BaseFooter from '@/components/BaseFooter.vue';
  import socials from '@/assets/data/socials.json';

  import { usePortfolioStore } from '../../stores/usePortfolioStore';

  const store = usePortfolioStore();

  const { currentYear } = storeToRefs(store);

  const { socialLinks } = socials;
</script>

<style scoped></style>
