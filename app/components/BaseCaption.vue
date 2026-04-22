<template>
  <figcaption
    v-if="project"
    class="block h-auto w-full overflow-y-scroll rounded-t-[1.875rem] rounded-l-[1.25rem] rounded-r-[1.875rem] rounded-b-[1.25rem] border-[5px] border-solid border-secondary bg-[#b2c4c8] text-dark"
  >
    <div
      class="mx-auto my-0 grid h-auto w-full min-w-80 grid-cols-1 place-content-center place-items-center p-6 text-center font-sans2 md:max-w-[80%] md:p-7 lg:max-w-[90%] lg:p-8 xl:max-w-[90%] 2xl:max-w-[80%]"
    >
      <h3
        class="lightbox-title mx-0 my-4 line-clamp-3 font-sans text-xl leading-normal font-bold text-pretty text-dark uppercase italic md:my-5 md:text-2xl lg:my-6 lg:text-[1.625rem] xl:text-2-5xl"
      >
        {{ project.title }}
      </h3>
      <p
        class="mb-6 font-sans2 text-base leading-snug font-medium text-pretty not-italic md:mb-6 md:text-lg md:leading-normal lg:mb-7.5 lg:text-xl"
      >
        {{ project.description }}
      </p>
      <div>
        <base-badge
          :content="project.category.toLowerCase()"
          class="mb-4.5 text-sm font-bold md:mb-5"
        />
      </div>
      <div
        class="mt-1 flex flex-row flex-wrap items-center justify-center gap-1 md:gap-2"
      >
        <nuxt-link
          v-if="project.url"
          :to="project.url"
          target="_blank"
          external
          title="Project URL"
          class="mx-2 my-0 inline-block cursor-pointer p-1 text-base font-extrabold text-quinary transition-all duration-150 ease-in hover:rounded hover:bg-light focus:border-[3px] focus:border-dotted focus:border-secondary focus:outline-none active:bg-light motion-reduce:transition-none motion-reduce:duration-0"
          :class="LinkMobileClass"
        >
          <span class="mr" :class="IconMobileClass">
            <font-awesome icon="fa-solid fa-link" />
          </span>
          <span v-if="!isMobile">Visit Live Project</span>
        </nuxt-link>

        <nuxt-link
          v-if="project.sourceCodeURL"
          :to="project.sourceCodeURL"
          target="_blank"
          external
          title="Source Code URL"
          class="mx-2 my-0 inline-block cursor-pointer p-1 text-base font-extrabold text-quinary transition-all duration-150 ease-in hover:rounded hover:bg-light focus:border-[3px] focus:border-dotted focus:border-secondary focus:outline-none active:bg-light motion-reduce:transition-none motion-reduce:duration-0"
          :class="LinkMobileClass"
        >
          <span class="mr" :class="IconMobileClass"
            ><font-awesome icon="fa-solid fa-code"
          /></span>
          <span v-if="!isMobile">Go to Source Code</span>
        </nuxt-link>
        <nuxt-link
          :to="completeProjectPath"
          title="Project Page"
          class="mx-2 my-0 inline-block cursor-pointer p-1 text-base font-extrabold text-quinary transition-all duration-150 ease-in hover:rounded hover:bg-light focus:border-[3px] focus:border-dotted focus:border-secondary focus:outline-none active:bg-light motion-reduce:transition-none motion-reduce:duration-0"
          :class="LinkMobileClass"
        >
          <span class="mr" :class="IconMobileClass"
            ><font-awesome icon="fa-solid fa-eye"
          /></span>
          <span v-if="!isMobile"> View Project Page </span>
        </nuxt-link>
      </div>
    </div>
  </figcaption>
</template>

<script setup>
  import { useMediaQuery } from '@vueuse/core';
  import BaseBadge from './BaseBadge.vue';
  defineOptions({
    name: 'BaseCaption',
  });
  const props = defineProps({
    project: {
      type: Object,
      required: true,
    },
  });

  const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 480px)');

  const completeProjectPath = computed(() => {
    if (!props.project) return '';
    return `/projects/${props.project.id}`;
  });

  const LinkMobileClass = computed(() => {
    return { 'hover:rounded-full': isMobile.value };
  });

  const IconMobileClass = computed(() => {
    return { 'mr-0': isMobile.value };
  });
</script>

<style lang="css" scoped>
  .lightbox-title {
    text-shadow: 5px 2.5px 10px #0a4aaa;
  }
</style>
