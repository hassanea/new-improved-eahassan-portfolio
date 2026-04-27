<template>
  <nav
    id="navigation"
    class="navbar nav-text"
    :aria-label="label"
    :class="mobileNavbarClass"
    @keydown.esc="closeMobileNavigation"
  >
    <client-only>
      <div v-if="isLargeDevice" class="navbar-brand">
        <nuxt-link to="#home">
          <lazy-nuxt-img
            :src="setLogo"
            alt="Logo"
            provider="imagekit"
            width="55"
            height="55"
            class="navbar-brand-logo nav-link-effects dark:contrast-[0.8]"
          />
          <span class="sr-only">Home</span>
        </nuxt-link>
      </div>
    </client-only>
    <client-only>
      <lazy-base-button
        v-if="showMobileMenu"
        variant="btn-mobile-nav"
        label="Mobile Navigation button"
        title="Mobile menu button"
        :aria-controls="navId"
        :aria-expanded="setExpanded"
        @click="toggleMobileNavigation"
        @keydown.enter="toggleMobileNavigation"
      >
        <template #icon>
          <lazy-font-awesome :icon="setMobileIcon" size="lg" />
        </template>
      </lazy-base-button>
    </client-only>
    <ul :id="navId" ref="trapRef" class="navbar-nav" :class="toggleMenuClass">
      <li
        v-for="{ name, path } in links"
        :key="name.toLowerCase()"
        ref="regLinks"
      >
        <nuxt-link
          v-if="name !== 'Blog'"
          :to="path"
          :tabindex="!toggle && !showMobileMenu ? null : -1"
          class="nav-link nav-link-effects"
        >
          {{ name }}
        </nuxt-link>
        <dev-only v-else>
          <nuxt-link
            :to="path"
            :tabindex="!toggle && !showMobileMenu ? null : -1"
            class="nav-link nav-link-effects"
          >
            {{ name }}
          </nuxt-link>
        </dev-only>
      </li>
      <li
        v-for="{ name, to, target } in hashLinks"
        :key="name.toLowerCase()"
        ref="hashes"
      >
        <nuxt-link
          :to="to"
          :tabindex="!toggle && !showMobileMenu ? null : -1"
          v-if="!target"
          class="nav-link nav-link-effects"
          @click.prevent="handleScrollToSection"
          @keydown.enter="handleScrollToSection"
        >
          {{ name }}
        </nuxt-link>
      </li>
      <li v-if="!isTablet" ref="dropdown">
        <base-drop-down-menu
          :toggle="changed"
          @handle-toggle="handleDropDownChange"
          @handle-close="handleDropDownClose"
          label="Website Settings"
          v-tooltip="'Settings'"
          arrow-icon-class="text-light"
          class="nav-link-effects"
          :tabindex="!toggle && !showMobileMenu ? null : -1"
        >
          <template #icon>
            <span class="dropdown-text sr-only md:not-sr-only"> Settings </span>
            <span class="ml-0 inline-block align-middle lg:ml-2">
              <font-awesome icon="fa-solid fa-gear" class="text-light" />
            </span>
          </template>

          <template #default>
            <client-only>
              <div
                role="group"
                aria-label="User Website Preferences"
                class="grid h-auto w-full grid-cols-1 gap-2.5"
              >
                <!-- <p
                  class="my-1 text-center font-sans2 text-sm leading-normal font-bold text-balance text-dark capitalize italic ordinal md:text-base"
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
                    <lazy-font-awesome icon="fa-solid fa-eraser" />
                  </template>
                </lazy-base-button>

                <lazy-base-switch
                  :label="setColorSwitchLabel"
                  :model-value="isDark"
                  :mode="colorScheme"
                  description="Set preferred color scheme on website."
                  @update:model-value="handleColorThemeChange"
                >
                  <template #icon>
                    <lazy-font-awesome :icon="setColorSwitchIcon" />
                  </template>
                </lazy-base-switch>

                <lazy-base-button
                  variant="btn-no-mg"
                  @click="$pwa?.install()"
                  @keydown.enter="$pwa?.install()"
                  label="Install PWA App"
                  v-tooltip.left="'Install App'"
                >
                  <template #icon>
                    <lazy-font-awesome icon="fa-solid fa-desktop-arrow-down" />
                  </template>
                </lazy-base-button>

                <lazy-base-button
                  variant="btn-no-mg"
                  @click="$pwa?.updateServiceWorker()"
                  @keydown.enter="$pwa?.updateServiceWorker()"
                  label="Reload for New Data"
                  v-tooltip.left="'Reload'"
                >
                  <template #icon>
                    <lazy-font-awesome icon="fa-solid fa-arrow-rotate-right" />
                  </template>
                </lazy-base-button>

                <ClientOnly>
                  <span>
                    PWA
                    {{ $pwa?.isPWAInstalled ? 'Installed' : 'Not Installed' }}:
                    <nuxt-img
                      v-if="$pwa?.isPWAInstalled"
                      provider="imagekit"
                      src="/pwa-logo.svg"
                      alt=""
                      width="20"
                      height="20"
                    />
                    <font-awesome v-else icon="fa-solid fa-xmark" />
                  </span>
                </ClientOnly>
              </div>
            </client-only>
          </template>
        </base-drop-down-menu>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
  import { useMediaQuery } from '@vueuse/core';
  import { useFocusTrap } from '@/composables/useFocusTrap';
  import { useMyColorMode } from '~/composables/useMyColorMode';
  // import { useLocaleDate } from '@/composables/useLocale';
  import { removeLocalStorageData } from '@/utils';
  import BaseDropDownMenu from './BaseDropDownMenu.vue';

  import { usePortfolioStore } from '../../stores/usePortfolioStore';

  const store = usePortfolioStore();

  const { currentDate } = storeToRefs(store);

  const props = defineProps({
    toggle: {
      type: Boolean,
      required: false,
    },
    links: {
      type: Array,
      required: false,
    },
    hashLinks: {
      type: Array,
      required: false,
    },
    logo: {
      type: String,
      required: false,
      default: 'placeholder.jpg',
    },
    label: {
      type: String,
      required: false,
      default: 'Navigation',
    },
  });

  const emit = defineEmits(['handle-toggle', 'handle-close']);

  // toggle,
  const { links, hashLinks, logo, label } = props;

  const { endPointDir } = useRuntimeConfig().public;

  // @ts-ignore
  const { setColorSwitchIcon, setColorSwitchLabel, handleColorThemeChange } =
    useMyColorMode();

  const colorScheme = useState('color-mode');
  const isDark = useState('is-dark-mode');

  // @ts-ignore
  // const currentFormatDate = useLocaleDate(currentDate);

  defineOptions({
    name: 'BaseNavbar',
  });

  const { initFocusTrap, clearFocusTrap } = useFocusTrap();

  const navId = useId();

  const changed = ref(false);

  const showMobileMenu = useMediaQuery('(max-width: 767px)');

  const isLargeDevice = useMediaQuery('(min-width: 1025px)');

  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 992px)');

  const regLinks = ref(null);

  const hashes = ref(null);

  const dropdown = ref(null);

  const handleDropDownChange = () => {
    changed.value = !changed.value;
  };

  const handleDropDownClose = () => {
    return (changed.value = false);
  };

  const toggleMobileNavigation = () => {
    emit('handle-toggle');
  };

  const closeMobileNavigation = () => {
    emit('handle-close');
  };

  const handleScrollToSection = e => {
    const currentId = e.target.getAttribute('href').replace(/\//g, '');
    const currentLink = document.querySelector(currentId);
    currentLink.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const toggleMenuClass = computed(() => {
    return { active: props.toggle };
  });

  const mobileNavbarClass = computed(() => {
    return { mobile: props.toggle };
  });

  const setLogo = computed(() => {
    return `${endPointDir}${logo}`;
  });

  const setMobileIcon = computed(() => {
    return props.toggle ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
  });

  const setExpanded = computed(() => {
    return props.toggle ? true : false;
  });

  watch(
    () => props.toggle,
    value => {
      const elements = [...regLinks?.value, ...hashes?.value, dropdown?.value];

      if (value) {
        initFocusTrap();
        elements.forEach(el => {
          el.setAttribute('tabindex', 0);
        });
      } else {
        clearFocusTrap();
        elements.forEach(el => {
          el.setAttribute('tabindex', -1);
        });
      }
    },
  );
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';

  .navbar {
    position: sticky;
    width: 100%;
    height: 4.7rem;
    border-radius: 4px;
    display: flex;
    flex-flow: row wrap;
    flex: 1;
    padding: 0.75rem 2rem;
    vertical-align: middle;
    z-index: 201;
    transition:
      background-color,
      transform 0.6s cubic-bezier(0.88, 1.55, 0.88, 1.55);
  }

  .navbar .navbar-nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: flex-end;
    vertical-align: middle;
    margin: 0.625rem 0;
    z-index: 200;
  }

  .navbar .navbar-nav .nav-item {
    list-style: none;
    padding: 0.1rem;
  }

  .nav-link {
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    padding: 0.5rem;
    margin: 0 0.625rem;
    letter-spacing: 0.25rem;
    -webkit-transition: all 0.4s cubic-bezier(1, 0, 0, -0.92);
    transition: all 0.4s cubic-bezier(1, 0, 0, -0.92);
    filter: drop-shadow(0 0 3px #101016);
    @apply font-sans2 text-lg leading-normal font-bold text-light uppercase dark:contrast-[0.8];
  }
  .nav-link.router-link-exact-active {
    @apply bg-sky-700;
  }

  .nav-link:hover,
  nuxt-link:hover {
    border-bottom: 4px solid #ff0;
    color: #eae6e5;
    font-weight: bolder;
  }
  .nav-link:active {
    border: none;
    color: #ff0;
  }
  .nav-link:focus {
    outline: none;
    outline: 2px solid #b3ffff;
  }
  .nav-link.router-link-active {
    @apply border-b-4 border-solid border-sky-400;
  }

  .nav-link-effects {
    @apply hover:border-b-4 hover:border-solid hover:border-b-[#ff0] hover:font-extrabold hover:text-[#eae6e5] focus:outline focus:outline-2 focus:outline-[#b3ffff] focus:outline-none active:border-0 active:text-[#ff0];
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .navbar-nav,
    a,
    a:visited,
    .nav-link {
      -webkit-transition: none;
      transition: none;
    }
  }

  .navbar.nav-bg {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(50, 50, 68, 0.85);
    box-shadow: 0 0 10px #101016;
  }

  .navbar.nav-bg.mobile {
    background: rgba(67, 50, 67, 0.9);
    height: 46%;
  }

  .navbar .nav-text,
  .dropdown-text {
    font-size: 1.125rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    -webkit-transition: all 0.4s cubic-bezier(1, 0, 0, -0.92);
    transition: all 0.4s cubic-bezier(1, 0, 0, -0.92);
    filter: drop-shadow(0 0 3px #101016);
    @apply font-sans2 leading-normal text-light dark:contrast-[0.8];
  }

  .navbar .navbar-brand {
    display: flex;
    justify-content: space-evenly;
    margin: 0.12rem auto 0 0;
    vertical-align: middle;
    z-index: 200;
  }

  .navbar .navbar-brand-logo {
    display: block;
    border-radius: 50%;
    margin: 0 auto;
  }

  .navbar .navbar-brand-logo:hover {
    filter: drop-shadow(0 0 3px #000);
  }

  @media only screen and (max-width: 992px) {
    .navbar {
      justify-content: center;
      font-size: 1rem;
      /* .navbar-brand {
          margin-left: 0;
        } */
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .navbar .navbar-brand {
      margin: 0 0.66rem 0 0;
    }
  }

  @media only screen and (max-width: 767px) {
    .navbar {
      height: auto;
      position: relative;
    }
    .navbar .navbar-nav {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-flow: column wrap;
      flex-flow: column wrap;
      padding: 0.5rem 1.125rem;
      position: absolute;
      top: 20px;
      left: -80%;
      text-align: center;
      -webkit-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      background: rgba(50, 50, 68, 0.75);
      border-radius: 5px;
    }

    .navbar .navbar-nav .nav-item {
      margin: 1rem 0;
    }

    /* &.nav-bg {
        background: transparent;
        box-shadow: none;
        height: 40%;
      } */

    .navbar .navbar-nav.active {
      left: 40%;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    .navbar {
      padding: 0;
    }
    .navbar .navbar-nav.active {
      left: 0;
    }

    .navbar .navbar-nav {
      background: rgba(50, 50, 68, 0.95);
      width: 100%;
      height: auto;
      top: 0;
      left: -120%;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    .navbar .navbar-nav {
      margin: 0;
    }
    .nav-item {
      margin: 0.45rem 0;
    }
    .nav-link {
      margin: 0 0.75rem;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .navbar {
      padding-top: 5.35rem;
    }

    .navbar .navbar-nav {
      @apply border-t-0 border-r-[0.5px] border-b-0 border-l-[0.5px] border-solid border-dark;
    }

    .navbar .navbar-nav.active {
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      z-index: 1020;
    }
    .navbar .navbar-nav .navbar-brand {
      justify-content: center;
    }
  }
</style>
