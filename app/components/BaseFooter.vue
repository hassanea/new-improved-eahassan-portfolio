<template>
  <footer
    class="relative flex h-40 w-full items-center justify-center bg-primary p-6 text-light md:p-8"
  >
    <nav class="mx-0 my-4 flex list-none flex-col">
      <client-only>
        <ul class="social-list mx-0 my-4 flex list-none flex-row">
          <li v-for="socialLink in shownLinks" :key="socialLink.id">
            <nuxt-link
              :key="socialLink.id"
              :to="socialLink.to"
              :class="{
                'hover:bg-google hover:text-light':
                  socialLink.name === 'Google',
                'hover:text-linkedin': socialLink.name === 'LinkedIn',
                'hover:text-github': socialLink.name === 'GitHub',
                'hover:text-gitlab': socialLink.name === 'GitLab',
                'hover:text-stackoverflow': socialLink.name === 'StackOverflow',
                'hover:text-upwork': socialLink.name === 'UpWork',
              }"
              :aria-label="socialLink.name"
              target="_blank"
              external
              class="footer-nav-link mx-3 my-0 text-light focus:bg-[0] focus:text-[#ff0] focus:outline-0 active:bg-[0] active:text-[#ff0] active:outline-0 motion-safe:transition-all motion-safe:duration-150 motion-safe:ease-in-out md:mx-3.5"
            >
              <font-awesome :icon="socialLink.icon" :size="iconSizeClass" />
            </nuxt-link>
          </li>
        </ul>
      </client-only>
      <p
        class="mb-4 text-center font-sans2 text-lg leading-normal font-bold text-light not-italic"
      >
        {{ copyRight }}
        <nuxt-link
          to="https://www.eahassan.com/"
          target="_blank"
          external
          class="footer-nav-link text-light hover:text-website focus:bg-[0] focus:text-[#ff0] focus:outline-0 active:bg-[0] active:text-[#ff0] active:outline-0 motion-safe:transition-all motion-safe:duration-150 motion-safe:ease-in-out"
          aria-label="Evan Hassan's Personal Website"
        >
          <span class="my-0 mr-2 ml-[0.33rem]">|</span> Evan Hassan
        </nuxt-link>
      </p>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
  import { useMediaQuery } from '@vueuse/core';

  defineOptions({
    name: 'BaseFooter',
  });

  const props = defineProps({
    developer: {
      type: String,
      required: false,
    },
    socialLinks: {
      type: Array,
      required: false,
    },
    year: {
      type: Number,
      required: true,
      validator(value: number) {
        return Number.isInteger(value);
      },
    },
  });

  const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 480px)');

  const iconSizeClass = computed(() => {
    return isMobile.value ? 'lg' : 'xl';
  });

  const shownLinks = computed(() => {
    if (props?.socialLinks.length === 0) return;
    return props?.socialLinks.slice(0, props?.socialLinks.length - 1);
  });

  const copyRight = computed(() => {
    if (!props.year || props.year <= 0) return '';
    else return `© Copyright ${props.year}`;
  });
</script>

<style lang="css" scoped>
  @media screen and (prefers-reduced-motion: reduce) {
    a.footer-nav-link {
      @apply motion-reduce:transition-none motion-reduce:duration-0;
    }
  }
</style>
