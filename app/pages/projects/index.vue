<template>
  <base-section
    class="grid grid-rows-1 px-6 py-8 text-light md:px-8 md:py-10 lg:px-10 lg:pt-12 lg:pb-16 xl:px-12"
  >
    <h1
      class="relative mt-0 mb-5 text-center font-sans text-3xl leading-normal font-bold uppercase not-italic md:mb-6 md:text-4xl lg:text-[2.5rem] xl:text-5xl"
    >
      Project Listing:
    </h1>
    <ul
      v-if="projects.length > 0"
      class="container mx-auto grid h-auto w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 lg:gap-y-2 xl:grid-cols-3 2xl:max-w-[1400px]"
    >
      <li
        v-for="project in projects"
        :key="project.id"
        class="inline-block h-auto w-auto list-none"
      >
        <nuxt-link
          v-tooltip.bottom="`View ${project.title}`"
          :aria-label="`View ${project.title} project details`"
          :to="`/projects/${project.id}`"
          class="inline-block cursor-pointer hover:brightness-125 focus:border-4 focus:border-dotted focus:border-[#007fff] focus:outline-none active:border-4 active:border-dotted active:border-primary dark:hover:grayscale"
        >
          <nuxt-img
            :src="`${endPointDir}${project.image}`"
            :alt="project.title"
            provider="imagekit"
            class="rounded-lg drop-shadow-md transition duration-75 ease-in-out"
          />
        </nuxt-link>
      </li>
    </ul>
  </base-section>
</template>

<script setup lang="ts">
  import BaseSection from '@/components/BaseSection.vue';
  import { usePortfolioStore } from '../../../stores/usePortfolioStore';

  const store = usePortfolioStore();

  const { projects } = storeToRefs(store);

  definePageMeta({
    name: 'Projects',
    layout: 'project-layout',
    depth: 2,
    keepalive: true,
  });

  const { endPointDir } = useRuntimeConfig().public;

  onMounted(() => {
    useHead({
      meta: [
        {
          name: 'keywords',
          content:
            'Evan Hassan, Projects, Portfolio projects, Web Developer, IT Specialist, IT Solutions, For Hire, Bloomfield Hills, Michigan',
        },
        { name: 'description', content: '' },
        { property: 'og:description', content: '' },
      ],
    });
  });

  if (!projects.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Project Listing Data Failed To Load',
      fatal: true,
    });
  }
</script>
