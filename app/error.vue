<template>
  <div class="bg-gray-200 text-dark dark:bg-gray-400">
    <nuxt-layout name="error-layout">
      <base-section
        class="mx-auto h-auto w-full max-w-125 rounded-lg border-[3px] border-solid border-dark bg-[#e6e8fa] p-8 text-center shadow-2xl"
      >
        <template #default>
          <div class="flex flex-col items-center justify-center">
            <font-awesome
              v-if="error?.status === 500"
              class="inline-block rounded align-middle text-3xl text-dark md:text-4xl"
              icon="fa-solid fa-bomb"
            />
            <font-awesome
              v-else
              class="inline-block rounded align-middle text-3xl text-dark md:text-4xl"
              icon="fa-solid fa-do-not-enter"
            />
            <h1
              class="my-5 text-5xl leading-normal font-bold tracking-wide text-dark md:my-6 md:text-6xl"
            >
              {{ error?.status }}
            </h1>
            <p
              class="mb-4 font-sans2 text-lg leading-normal font-medium text-dark italic md:text-xl"
            >
              {{ error?.message }}
            </p>
            <base-button
              variant="btn"
              label="Clear Error and Redirect to Home"
              @click="handleClearErrorNavigateToHome"
              @keydown.enter="handleClearErrorNavigateToHome"
            >
              Go To Home
            </base-button>
          </div>
        </template>
      </base-section>
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore
  import type { NuxtError } from '#app';
  import BaseSection from '@/components/BaseSection.vue';
  import BaseButton from '@/components/BaseButton.vue';

  const props = defineProps({
    error: Object as () => NuxtError,
  });

  useScriptMatomoAnalytics({
    matomoUrl: 'https://www.eahassan.com/matomo/',
    siteId: '1',
    trackPageView: true,
    enableLinkTracking: true,
  });

  const handleClearErrorNavigateToHome = () => {
    clearError({ redirect: '/' });
  };

  onMounted(() => {
    useHead({
      title: `${props.error?.status} Error`,
    });
  });
</script>

<style lang="css" scoped>
  /* .error-icon {
    @apply inline-block rounded align-middle text-3xl text-dark md:text-4xl;
    bg-[#f9d3d9] dark:bg-[#f4a7b3] 
     :class="{ 'bg-yellow-100': error?.statusCode === 400, 'bg-[#f9d3d9] dark:bg-[#f4a7b3]': error?.statusCode === 500 }" 
  } */
</style>
