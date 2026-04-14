<template>
  <header
    id="home"
    ref="headerEl"
    class="main-header"
    :style="headerBackgroundStyle"
    :class="headerBackgroundClasses"
    @pointerenter="showPlayPauseButton = true"
    @pointerleave="showPlayPauseButton = false"
  >
    <base-navbar
      :class="navbarScrollClass"
      :logo="baseLogo"
      :hash-links="navItems"
      :links="routes"
      label="Main navigation"
    />
    <video
      v-if="!isMobile"
      ref="video"
      class="header-video absolute top-1/2 left-1/2 z-[-1] block h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      :poster="mediaPoster"
      playsinline
      autoplay
      muted
      loop
    >
      <source
        v-for="media in videoSource.medias"
        :key="media.type"
        :src="endPoint + endPointDir + media.source"
        :type="media.type"
      />
      <p>Sorry, Your Browser Does Not Support the embeded Video!</p>
    </video>
    <div class="header-content d-flex flex-column">
      <div>
        <font-awesome
          v-if="!isMobile"
          icon="fa-solid fa-hand-wave"
          size="xl"
          class="mb-5 inline-block h-12.5 w-12.5 rotate-40 align-middle text-[#e3d4ad]"
        />
        <h1 class="header-title">
          <Typed :options>
            <span class="typed typing"></span>
          </Typed>
        </h1>
        <p class="header-summary">
          {{ description }}
        </p>
        <template v-if="showPlayPauseButton && !isMobile">
          <base-button
            variant="btn-media"
            v-tooltip="videoBtnToolTip"
            :label="videoLabel"
            @click="handleVideoPlayPause"
            @keydown.enter="handleVideoPlayPause"
            class="absolute bottom-0 left-0 z-[2] rounded-full md:bottom-[6rem] md:left-4 lg:bottom-[-1rem] xl:bottom-[-11.5rem] xl:left-[2%]"
          >
            <template #icon>
              <font-awesome :icon="videoPlayPauseIcon" />
            </template>
          </base-button>
        </template>
      </div>
    </div>
    <nuxt-link
      id="to-about"
      v-tooltip.right="'Go to About'"
      to="#about"
      class="btn-up-down"
      aria-label="Go to About section"
    >
      <font-awesome icon="fa-solid fa-chevron-down" />
    </nuxt-link>
  </header>
</template>

<script setup lang="ts">
  import { Typed } from '@duskmoon/vue3-typed-js';
  import type { TypedOptions } from '@duskmoon/vue3-typed-js';
  import { useMediaQuery, useMediaControls } from '@vueuse/core';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseNavbar from '@/components/BaseNavbar.vue';
  // import BaseVideo from "@/components/UI/BaseVideo.vue";
  import useNavbarScroll from '~/composables/useNavbarScroll';
  import validateColor from 'validate-color';
  // **REFERENCE: https://www.npmjs.com/package/validate-color

  defineOptions({
    name: 'BaseHeader',
  });

  const props = defineProps({
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'transparent',
      validator(value: string) {
        return validateColor(value);
      },
    },
    video: {
      type: Object,
      required: false,
    },
    background: {
      type: String,
      required: false,
      default: '',
      validator(value: string) {
        return (
          value.endsWith('.jpg') ||
          value.endsWith('.png') ||
          value.endsWith('.webp') ||
          value.endsWith('.avif') ||
          value.endsWith('.svg') ||
          value === ''
        );
      },
    },
  });

  const {
    headerEl,
    navbarScrollClass,
    handleNavbarScroll,
    handleNavbarScrollReset,
  } = useNavbarScroll();

  const showPlayPauseButton = ref(false);
  const video = useTemplateRef('video');
  const { playing } = useMediaControls(video, {
    src: 'https://images.eahassan.com/portfolio/output-vp9.webm',
  });

  onMounted(() => {
    handleNavbarScroll();
  });

  onBeforeUnmount(() => {
    handleNavbarScrollReset();
  });

  const routes = useRouter()
    .getRoutes()
    .filter(route => !route.path.includes(':id'))
    .sort((a, b) => a?.meta?.depth - b?.meta?.depth);

  const navItems = [
    // { name: 'Blog', to: 'https://blog.eahassan.me', target: '_blank' },
    { name: 'About', to: '#about' },
    { name: 'Resumé', to: '#resume' },
    { name: 'Works', to: '#service' },
    { name: 'Results', to: '#portfolio' },
  ];

  const options: TypedOptions = {
    strings: [props.heading],
    typeSpeed: 200,
    loop: true,
  };

  const image = useImage();

  const handleVideoPlayPause = () => {
    playing.value = !playing.value;
  };

  const videoPlayPauseIcon = computed(() => {
    return playing.value ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  });

  const videoBtnToolTip = computed(() => {
    return playing.value ? 'Pause Video' : 'Play Video';
  });

  const videoLabel = computed(() => {
    return playing.value ? 'Pause video background' : 'Play video background';
  });

  const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 480px)');
  const { endPoint, endPointDir } = useRuntimeConfig().public;

  const mediaPoster = computed(() => {
    const url = image(
      `${endPointDir}${videoSource.image}`,
      { preload: true },
      { provider: 'imagekit' },
    );
    return url;
  });

  const headerBackgroundImage = computed(() => {
    if (!props.background) return '';
    else {
      const url = image(
        `${endPointDir}${props.background}`,
        { preload: true },
        { provider: 'imagekit' },
      );
      return url;
    }
  });

  const headerBackgroundStyle = computed(() => {
    if (!headerBackgroundImage.value) return '';
    else return { backgroundImage: `url(${headerBackgroundImage.value})` };
  });

  const headerBackgroundClasses = computed(() => {
    if (!headerBackgroundImage.value || !isMobile.value) return '';
    else
      return {
        'bg-img': headerBackgroundImage.value || isMobile.value,
        // "bg-[url('https://images.eahassan.com/portfolio/new-main-showcase-mobile.jpg')]":
        //   isMobile.value,
      };
  });

  const baseLogo = 'logo.jpg';
  const videoSource = {
    image: 'new-main-showcase.jpg',
    medias: [
      { source: 'output-vp9.webm', type: 'video/webm' },
      { source: 'output.mp4', type: 'video/mp4' },
    ],
  };

  useHead({
    link: [
      {
        rel: 'preload',
        href: 'https://images.eahassan.com/portfolio/output-vp9.webm',
        as: 'fetch',
      },
      {
        rel: 'preload',
        href: 'https://images.eahassan.com/portfolio/output.mp4',
        as: 'fetch',
      },
    ],
  });
</script>

<style lang="css">
  @import '../assets/css/main.css';
  .bg-img {
    @apply bg-cover bg-scroll bg-clip-border bg-center bg-no-repeat bg-origin-border;
  }
</style>

<style lang="css" scoped>
  .dark .main-header::before,
  .tranparent-no-pref {
    background: rgb(20, 20, 50);
    opacity: 0.75;
  }

  .light .main-header::before,
  .tranparent-no-pref {
    background: rgb(63, 63, 109);
    opacity: 0.5;
  }

  .tranparent-reduce .main-header::before {
    opacity: 0.9;
  }

  .main-header {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .main-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: auto;
    width: 100%;
    height: 100%;
  }

  .header-content {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0 1.25rem;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-transform: translateY(-260px);
    transform: translateY(-260px);
  }

  .header-content * {
    z-index: 100;
  }

  .header-title {
    font-size: 5.5rem;
    font-weight: 700;
    margin: 0 auto 1rem;
    max-width: 46.25rem;
    color: #e7feff;
    letter-spacing: -4px;
  }
  .header-summary {
    color: #e7feff;
    font-size: 1.25rem;
    font-weight: 700;
    max-width: 37.5rem;
    line-height: 1.8;
    margin: 0 auto;
  }

  a.btn-up-down {
    color: #99c1b9;
    display: inline-block;
    width: 3rem;
    height: 3rem;
    font-size: 3rem;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
    padding: 2px 0 0 0;
    -webkit-transition:
      color,
      filter 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    transition:
      color,
      filter 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  a.btn-up-down:hover {
    color: #9ec6d6;
  }

  a.btn-up-down:active {
    color: #00c7f0;
  }

  a.btn-up-down:focus {
    outline: 0;
    -webkit-filter: drop-shadow(2px 2px 0 #fff);
    filter: drop-shadow(2px 2px 0 #fff);
  }

  #to-about {
    position: absolute;
    top: 93%;
    left: 49%;
    z-index: 2;
  }

  #back-to-top {
    position: absolute;
    bottom: 108%;
    left: 50%;
    width: 3.125rem;
    height: 3.125rem;
    z-index: 1000;
  }

  @media only screen and (max-width: 1024px) {
    .main-header .header-content {
      -webkit-transform: none;
      transform: none;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
    .header-title {
      font-size: 5rem;
      letter-spacing: -1px;
      padding-top: 3rem;
    }
    #to-about {
      top: 90%;
      left: 47%;
    }
  }
  @media only screen and (max-width: 900px) {
    .header-title {
      font-size: 4.875rem;
      line-height: 1.1;
      letter-spacing: -1px;
    }
    .header-summary {
      font-size: 1.125rem;
      line-height: 1.9;
    }
  }

  @media only screen and (max-width: 768px) {
    .header-title {
      font-size: 4.5rem;
    }
    #to-about {
      top: 91%;
      left: 47%;
    }
  }
  @media only screen and (max-width: 767px) {
    .header-title {
      font-size: 3.75rem;
      letter-spacing: -1px;
    }
    #back-to-top {
      bottom: 108%;
      left: 47%;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 930px) and (orientation: landscape) {
    .header-title {
      font-size: 3.125rem;
    }
    .header-summary {
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
    #to-about {
      top: 82.25%;
      left: 47%;
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    .main-header .container {
      padding: 0;
    }
    .main-header .header-content {
      padding: 0;
    }
    .header-title {
      font-size: 2.5rem;
    }
    .header-summary {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }
    #to-about {
      top: 78%;
      left: 46%;
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 420px) {
    .main-header .header-content {
      padding: 0 2.5rem;
    }
  }
  @media only screen and (min-width: 393px) and (max-width: 400px) {
    .main-header .header-content {
      padding: 0 2rem;
    }
  }
  @media only screen and (min-width: 350px) and (max-width: 370px) {
    .main-header .header-content {
      padding: 0 0.7rem;
    }
  }
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .main-header {
      background: url('https://images.eahassan.com/portfolio/new-main-showcase-mobile.jpg')
        no-repeat center / cover border-box scroll;
    }
    .main-header .header-content {
      -webkit-transform: none;
      transform: none;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
    .header-title {
      padding: 0;
      font-size: 2.3rem;
    }
    .header-summary {
      line-height: 1.7;
      font-size: 1.0625rem;
      margin-bottom: 1rem;
    }
    #to-about {
      top: 86%;
      left: 45%;
    }
  }
  @media only screen and (max-width: 320px) {
    .main-header .header-content {
      padding: 0 1.3rem;
      margin-top: -2rem;
    }
    .header-title {
      padding: 0;
      font-size: 2rem;
    }
    .header-summary {
      margin-bottom: 3rem;
      line-height: 1.7;
      font-size: 1rem;
    }
    #to-about {
      top: 87%;
      left: 44%;
    }
  }
  @media screen and (prefers-reduced-motion: reduce) {
    a.btn-up-down {
      -webkit-transition: none;
      transition: none;
    }
  }
</style>
