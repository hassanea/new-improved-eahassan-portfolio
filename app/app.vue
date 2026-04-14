<template>
  <div class="bg-alternative text-dark dark:bg-[#A9CBE5]">
    <NuxtPwaManifest />
    <base-skip-link v-focus to="#content" label="Skip to main content" />
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <UApp>
      <NuxtLayout>
        <NuxtPage></NuxtPage>
      </NuxtLayout>
    </UApp>

    <div v-show="$pwa?.needRefresh">
      <span>New content available, click on reload button to update.</span>
    </div>

    <div
      class="absolute bottom-[1%] left-[10%] z-300 rounded-xl bg-light text-center"
    >
      <base-drop-down-menu
        v-tooltip="'A11y Settings'"
        :toggle="showA11y"
        label="Accessibility Settings"
        variant="up"
        @handle-toggle="showA11y = !showA11y"
        @handle-close="showA11y = false"
      >
        <template #icon>
          <lazy-nuxt-img
            :src="`${endPointDir}/${endPointSubDir}/a11y.svg`"
            alt=""
            provider="imagekit"
            width="48"
            height="48"
            loading="lazy"
            class="a11y-icon inline-block h-8 w-8 text-center align-middle"
          />
        </template>
        <template #default>
          <client-only>
            <div
              role="group"
              aria-label="User Website Accessibility Preferences"
              class="grid h-auto w-full grid-cols-1 gap-2"
            >
              <lazy-base-select
                v-model="contrastMode"
                :choices="contrastOptions"
                label="Prefers Contrast Theme"
                description="Set preferred contrast scheme on website."
                @update:model-value="contrastMode = $event"
              />
              <lazy-base-switch
                :label="setReducedMotionSwitchLabel"
                :model-value="isNoPreference"
                :mode="reduceMotion"
                description="Enable or disable animations and transitions on website."
                @update:model-value="handleMotionChange"
              >
                <template #icon>
                  <font-awesome :icon="setReducedMotionSwitchIcon" />
                </template>
              </lazy-base-switch>
              <lazy-base-switch
                :label="setTransparentSwitchLabel"
                :model-value="isTransparent"
                :mode="transparentMode"
                description="Enable or disable tranparency of content on website."
                @update:model-value="handleTransparentChange"
              >
                <template #icon>
                  <font-awesome :icon="setTransparentSwitchIcon" />
                </template>
              </lazy-base-switch>
            </div>
          </client-only>
        </template>
      </base-drop-down-menu>
    </div>
  </div>

  <Teleport v-if="displayCookieBanner" to="#teleports">
    <transition name="fade">
      <lazy-base-modal
        varaint="custom"
        :modelValue="displayCookieBanner"
        title="Cookie Policy"
        description="Managing the website's usage of cookies"
        @update:modelValue="toggleCookieBannerModal"
        @close-modal="closeCookieBannerModal"
        class="cookie-modal"
      >
        <template #default>
          <span
            class="mx-auto inline-flex h-[1.875rem] w-[1.875rem] items-center justify-center align-middle text-3xl"
            ><lazy-font-awesome icon="fa-solid fa-cookie" class="text-red-950"
          /></span>
          <div
            class="flex flex-1 flex-row flex-wrap items-center justify-center gap-3"
          >
            <lazy-base-button label="Accept cookies" class="flex-1/2">
              <template #icon>
                <lazy-font-awesome icon="fa-solid fa-check" />
              </template>
              <template #default> Accept Cookies </template>
            </lazy-base-button>
            <lazy-base-button
              @click="closeCookieBannerModal"
              @keydown.enter="closeCookieBannerModal"
              label="Decline cookies"
              class="decline flex-1/2 text-dark"
            >
              <template #icon>
                <lazy-font-awesome icon="fa-solid fa-xmark" />
              </template>
              <template #default> Decline Cookies </template>
            </lazy-base-button>
          </div>
        </template>
      </lazy-base-modal>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { useReducedMotion } from '@/composables/useReducedMotion';
  import { useLocale } from '@/composables/useLocale';
  import { useContrast } from '@/composables/useContrast';
  import { useTransparency } from '@/composables/useTransparency';
  import BaseSkipLink from '@/components/BaseSkipLink.vue';
  import BaseDropDownMenu from '@/components/BaseDropDownMenu.vue';
  import { NuxtPwaManifest } from '#components';
  // import { usePortfolioStore } from '../stores/usePortfolioStore';

  // const store = usePortfolioStore();

  // callOnce('projects', () => store.handleFetchProjectData());

  const { endPointDir, endPointSubDir } = useRuntimeConfig().public;

  const colorMode = useState('color-mode');
  const reduceMotion = useState('reduce-motion');
  const contrastMode = useState('contrast-mode');
  const transparentMode = useState('transparent-mode');
  const isNoPreference = useState('reduce-switch');
  const isTransparent = useState('tranparent-switch');

  const toast = useToast();
  const { $pwa } = useNuxtApp();
  const displayCookieBanner = ref(false);
  const showA11y = ref(false);
  const currentRoute = useRoute();
  const routeName = ref('');

  // @ts-ignore
  const {
    setReducedMotionSwitchIcon,
    setReducedMotionSwitchLabel,
    handleMotionChange,
  } = useReducedMotion();
  const { contrastOptions } = useContrast();
  const {
    setTransparentSwitchIcon,
    setTransparentSwitchLabel,
    handleTransparentChange,
  } = useTransparency();

  // @ts-ignore
  const { localeCookie, currentLocale, currentWritingDirection } = useLocale();

  useScriptMatomoAnalytics({
    matomoUrl: 'https://www.eahassan.com/matomo/',
    siteId: '1',
    trackPageView: true,
    enableLinkTracking: true,
  });

  onMounted(() => {
    console.log('Mounted');
    callOnce('globalState', () => {
      localeCookie.value = currentLocale.value;
    });
    if ($pwa?.offlineReady) {
      toast.add({
        title: 'Work Offline?',
        description: 'App ready to work offline.',
      });
    }
    useHead({
      titleTemplate(title) {
        return title
          ? `${title} | Aspiring Web Developer | ${routeName.value}`
          : 'Site Title';
      },
      // @ts-ignore
      htmlAttrs: {
        lang: currentLocale,
        dir: currentWritingDirection,
        class: {
          dark: () => colorMode.value === 'dark',
          light: () => colorMode.value === 'light',
          'reduced-motion-no-pref': () =>
            reduceMotion.value === 'no-preference',
          'reduced-motion-reduce': () => reduceMotion.value === 'reduce',
          'contrast-no-pref': () => contrastMode.value === 'no-preference',
          'more-contrast': () => contrastMode.value === 'more',
          'less-contrast': () => contrastMode.value === 'less',
          'tranparent-no-pref': () => transparentMode.value === 'no-preference',
          'tranparent-reduce': () => transparentMode.value === 'reduce',
        },
      },
      // meta: [ { property: 'og:title', content: document?.title,  }, ],
    });
  });

  watch(
    () => currentRoute.name,
    value => {
      // @ts-ignore
      routeName.value = value;
    },
    { immediate: true },
  );

  const toggleCookieBannerModal = () => {
    displayCookieBanner.value = !displayCookieBanner.value;
  };

  const closeCookieBannerModal = () => {
    displayCookieBanner.value = false;
  };
</script>

<style lang="css" scoped>
  @import './assets/css/main.css';
  .a11y-icon {
    filter: brightness(0) saturate(100%) invert(7%) sepia(97%) saturate(7452%)
      hue-rotate(246deg) brightness(106%) contrast(145%);
  }

  .decline {
    @apply bg-red-800 bg-none hover:text-rose-800;
  }

  .cookie-modal:deep(.modal) {
    @apply bg-alternative;
  }
</style>
