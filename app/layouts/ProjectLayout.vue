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
          <span class="ml-0 inline-block align-middle lg:ml-2">
            <font-awesome icon="fa-solid fa-gear" />
          </span>
        </template>

        <template #default>
          <client-only>
            <div
              role="group"
              aria-label="User Website Preferences"
              class="grid h-auto w-full grid-cols-1 gap-[0.625rem]"
            >
              <!-- <p
                class="my-1 text-center font-sans2 text-sm leading-normal font-bold text-balance text-dark capitalize italic md:text-base"
              >
                <time :datetime="currentDate"> {{ currentFormatDate }} </time>
              </p> -->

              <lazy-base-button
                variant="btn-no-mg"
                @click="removeLocalStorageData"
                @keydown.enter="removeLocalStorageData"
                label="Clear LocalStorage Data"
                v-tooltip.left="'Clear LocalStorage Data'"
              >
                <template #icon>
                  <font-awesome icon="fa-solid fa-eraser" />
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
                  <font-awesome :icon="setColorSwitchIcon" />
                </template>
              </lazy-base-switch>
            </div>
          </client-only>
        </template>
      </base-drop-down-menu>
    </div>
  </base-main>
  <base-footer :social-links />
</template>

<script setup lang="ts">
  import { useColorMode } from '@/composables/useColorMode';
  import { removeLocalStorageData } from '@/utils';
  import BaseMain from '@/components/BaseMain.vue';
  import BaseFooter from '@/components/BaseFooter.vue';
  import BaseBreadCrumbs from '@/components/BaseBreadCrumbs.vue';
  import BaseDropDownMenu from '@/components/BaseDropDownMenu.vue';
  import socials from '@/assets/data/socials.json';

  const { socialLinks } = socials;

  const router = useRouter();
  //   const links = ref([]);

  //   const { data: socials } = await useFetch('/api/footer', {
  //   transform: (socials) => {
  //     const { socialLinks } = socials;
  //     // @ts-ignore
  //     links.value = socialLinks;
  //     return links;
  //   }
  // });

  // @ts-ignore
  const { setColorSwitchIcon, setColorSwitchLabel, handleColorThemeChange } =
    useColorMode();

  const colorOption = useState('color-mode');
  const isDark = useState('is-dark-mode');

  const switched = ref(false);

  const handleDropDownChange = () => {
    switched.value = !switched.value;
  };

  const handleDropDownClose = () => {
    return (switched.value = false);
  };

  // console.log(router.getRoutes());
  const routes = router
    .getRoutes()
    .filter(route => !route.path.startsWith('/blog'));
  // .map(route => {
  //   if (route.path === '/') route.meta.depth = 1;
  //   else {
  //     route.meta.depth = route.path.split('/').length;
  //   }
  //   return route;
  // })
  // .sort((a, b) => a?.meta?.depth - b?.meta?.depth);
</script>
