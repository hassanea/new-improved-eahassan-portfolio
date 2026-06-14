<template>
  <base-bread-crumbs :items="routes" />
  <base-main>
    <slot />
    <div
      class="absolute right-[10%] bottom-[1%] z-300 rounded-xl bg-quinary p-2 text-center text-light"
    >
      <base-drop-down-menu
        variant="up"
        :toggle="switched"
        @handle-toggle="handleDropDownChange"
        @handle-close="handleDropDownClose"
        label="Settings"
        v-tooltip="'Settings'"
        :show-label="true"
        class="nav-link-effects"
      >
        <template #icon>
          <span class="mr-0 inline-block align-middle lg:mr-2">
            <font-awesome icon="fa-solid fa-gear" />
          </span>
        </template>

        <template #default>
          <client-only>
            <div
              role="group"
              aria-label="User Website Preferences"
              class="grid h-auto w-full grid-cols-1 gap-2.5"
            >
              <p
                class="my-1 text-center font-sans2 text-sm leading-normal font-bold text-balance text-dark capitalize italic md:text-base"
              >
                <time :datetime="currentDate"> {{ currentFormatDate }} </time>
              </p>

              <lazy-base-button
                variant="btn-no-mg"
                @click="removeLocalStorageData"
                @keydown.enter="removeLocalStorageData"
                label="Clear LocalStorage Data"
                v-tooltip.left="'Clear LocalStorage Data'"
              >
                <template #icon>
                  <lazy-font-awesome icon="fa-solid fa-eraser" />
                </template>
              </lazy-base-button>

              <lazy-base-switch
                :label="setColorSwitchLabel"
                :model-value="isDark"
                :mode="colorOption"
                description="Set preferred color scheme on website."
                @update:model-value="handleColorThemeChange"
              >
                <template #icon>
                  <lazy-font-awesome :icon="setColorSwitchIcon" />
                </template>
              </lazy-base-switch>
            </div>
          </client-only>
        </template>
      </base-drop-down-menu>
    </div>
  </base-main>
  <lazy-base-footer :social-links :year="currentYear" />
</template>

<script setup lang="ts">
  import { useMyColorMode } from '~/composables/useMyColorMode';
  import { useLocaleDate } from '~/composables/useLocale';
  import { removeLocalStorageData } from '@/utils';
  import BaseMain from '@/components/BaseMain.vue';
  import BaseBreadCrumbs from '@/components/BaseBreadCrumbs.vue';
  import BaseDropDownMenu from '@/components/BaseDropDownMenu.vue';
  import resume from '@/assets/data/resume.json';

  import { usePortfolioStore } from '../../stores/usePortfolioStore';

  const store = usePortfolioStore();

  const { currentDate, currentYear } = storeToRefs(store);

  const { locale } = useI18n();

  const currentFormatDate = useLocaleDate(currentDate, locale.value);

  const { socialLinks } = resume;

  const router = useRouter();

  // @ts-ignore
  const { setColorSwitchIcon, setColorSwitchLabel, handleColorThemeChange } =
    useMyColorMode();

  const colorOption = useState('color-mode');
  const isDark = useState('is-dark-mode');

  const switched = ref(false);

  const handleDropDownChange = () => {
    switched.value = !switched.value;
  };

  const handleDropDownClose = () => {
    return (switched.value = false);
  };

  const routes = router
    .getRoutes()
    .filter(route => !route.path.startsWith('/blog'));
</script>
