<template>
  <div>
    <h1>Evan A. Hassan Portfolio</h1>
    <nuxt-img provider="imagekit" src="portfolio/logo.jpg" />
    <div v-show="$pwa?.needRefresh">
      <span>New content available, click on reload button to update.</span>
    </div>
    <u-button
      label="Reload"
      color="neutral"
      variant="outline"
      @click="$pwa?.updateServiceWorker()"
    ></u-button>

    <u-button
      label="Show toast!"
      color="neutral"
      variant="outline"
      @click="handleOffLineToastMessage"
    ></u-button>

    <!-- <u-button
      label="Reset token in template"
      color="neutral"
      variant="outline"
      @click="turnstile?.reset()"
    ></u-button>

    <u-button
      label="Reset token from handler"
      color="neutral"
      variant="outline"
      @click="reset()"
    ></u-button>

    <u-button
      label="Validate"
      color="neutral"
      variant="outline"
      @click="handleValidateTurnstile"
    ></u-button> -->

    <ClientOnly> PWA Installed: {{ $pwa?.isPWAInstalled }} </ClientOnly>
    <!-- <nuxt-turnstile v-model="turnstile" /> -->
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "default" });

const toast = useToast();
const { $pwa } = useNuxtApp();

// const turnstile = ref(null);

// const reset = () => {
//   turnstile.value?.reset();
// };

// const handleValidateTurnstile = async () => {
//   await $fetch("/api/validateTurnstile", {
//     method: "POST",
//     body: { token: turnstile.value },
//   });
// };

const handleOffLineToastMessage = () => {
  toast.add({
    title: "Work Offline?",
    description: "App ready to work offline.",
  });
};

onMounted(() => {
  if ($pwa?.offlineReady) {
    toast.add({
      title: "Work Offline?",
      description: "App ready to work offline.",
    });
  }
});
</script>

<style></style>
