<template>
  <div>
    <base-main> <slot /> </base-main>
    <base-footer :social-links />
  </div>
</template>

<script setup lang="ts">
  import BaseMain from '@/components/BaseMain.vue';
  import BaseFooter from '@/components/BaseFooter.vue';
  import socials from '@/assets/data/socials.json';

  const { socialLinks } = socials;
</script>

<style scoped></style>
