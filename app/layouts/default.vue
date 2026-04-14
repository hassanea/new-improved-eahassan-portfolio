<template>
  <base-header :heading="mainHeading" :description="description" />
  <base-main> <slot /> </base-main>
  <base-footer :social-links />
</template>

<script setup lang="ts">
  import BaseHeader from '@/components/BaseHeader.vue';
  import BaseMain from '@/components/BaseMain.vue';
  import BaseFooter from '@/components/BaseFooter.vue';
  import resume from '@/assets/data/resume.json';
  import socials from '@/assets/data/socials.json';

  const {
    developer: { name, description },
  } = resume;

  const { socialLinks } = socials;

  //   const myLinks = ref([]);

  //   const { data: socials } = await useFetch('/api/footer', {
  //   transform: (socials) => {
  //     // @ts-ignore
  //     const { socialLinks } = socials;
  //     // @ts-ignore
  //     myLinks.value = socialLinks;
  //     return myLinks;
  //   }
  // });

  const mainHeading = computed(() => {
    if (!name) return '';
    else return `I'm ${name}.`;
  });
</script>

<script lang="ts" setup></script>

<style></style>

<!-- <div>
    <ClientOnly>
      <div
        v-if="$pwa?.offlineReady || $pwa?.needRefresh"
        class="pwa-toast"
        role="alert"
      >
        <div class="message">
          <span v-if="$pwa.offlineReady"> App ready to work offline </span>
          <span v-else>
            New content available, click on reload button to update.
          </span>
        </div>
        <button v-if="$pwa.needRefresh" @click="$pwa.updateServiceWorker()">
          Reload
        </button>
        <button @click="$pwa.cancelPrompt()">Close</button>
      </div>
      <div
        v-if="
          $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
        "
        class="pwa-toast"
        role="alert"
      >
        <div class="message">
          <span> Install PWA </span>
        </div>
        <button @click="$pwa.install()">Install</button>
        <button @click="$pwa.cancelInstall()">Cancel</button>
      </div>
    </ClientOnly>
    <slot />
  </div> -->
<!-- <base-header :heading="mainHeading" :description="description" /> -->
