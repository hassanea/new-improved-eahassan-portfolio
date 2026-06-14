<template>
  <client-only>
    <article
      class="relative mx-auto my-10 block h-auto w-full max-w-80 rounded-md bg-tertiary md:mt-24 md:mb-auto md:max-w-sm lg:mb-16 lg:max-w-md"
    >
      <div
        v-if="Object.values(project).length > 0"
        class="grid h-auto w-auto grid-cols-1 place-content-center place-items-center p-3 text-center md:p-4 lg:p-5"
      >
        <lazy-base-ribbon v-if="project.isFavorite">
          <span class="mr-1"
            ><font-awesome icon="fa-solid fa-star" class="text-[#ff0]"
          /></span>
          Favorite
        </lazy-base-ribbon>
        <nuxt-img
          :src="projectImageSource"
          :alt="project.title"
          provider="imagekit"
          class="block max-w-full rounded-2xl object-cover align-middle shadow-md shadow-secondary hover:grayscale"
        />
        <h1
          class="mx-0 mt-3.5 mb-2 line-clamp-3 font-sans2 text-4xl leading-normal font-semibold tracking-wide text-[#00004F] not-italic md:mt-4.5 md:mb-3 md:text-4-5xl md:tracking-wider lg:text-[2.75rem] xl:text-5xl"
        >
          {{ project.title }}
        </h1>
        <p
          class="mb-2.5 font-sans2 text-base leading-normal font-normal text-pretty text-[#00004F] not-italic md:mb-3.5 md:text-lg"
        >
          {{ project.description }}
        </p>
        <div
          v-if="projectTags.length > 0"
          class="my-2 flex flex-row flex-wrap items-center justify-center gap-3.5 md:my-3 md:gap-4"
          :id="badgeWrapId"
        >
          <base-badge
            v-for="projectTag in shownProjectTags"
            :key="projectTag.toLowerCase()"
            :content="projectTag"
          />
          <button
            type="button"
            v-if="projectTags.length > 4"
            @click="toggleShowProjectTags"
            @keydown.space="toggleShowProjectTags"
            :aria-expanded="isTagsExpanded"
            :aria-controls="badgeWrapId"
            class="cursor-pointer focus:rounded-full focus:border-[3px] focus:border-dotted focus:border-lime-400 focus:outline-none"
          >
            <font-awesome
              :icon="projectTagBtnExpanderIcon"
              class="text-indigo-950 hover:text-website active:text-website"
            />
          </button>
        </div>
        <nuxt-link
          :to="project.url"
          target="_blank"
          class="m-3 inline-block cursor-pointer text-center text-lg font-bold text-indigo-950 transition-all duration-100 ease-in-out hover:rounded-full hover:border-4 hover:border-solid hover:border-light hover:bg-indigo-950 hover:p-3 hover:text-light focus:rounded-sm focus:bg-lime-400 focus:outline-none md:m-4"
          external
        >
          <span class="mr-2">
            <font-awesome
              icon="fa-solid fa-eye"
              class="text-website hover:text-light"
            />
          </span>
          Visit
        </nuxt-link>
      </div>
      <div
        v-else
        class="grid h-auto w-auto grid-cols-1 place-content-center place-items-center p-3 text-center md:p-4 lg:p-5"
      >
        <h1
          class="mx-0 mt-3.5 mb-2 line-clamp-3 font-sans2 text-4xl leading-normal font-semibold tracking-wide text-[#00004F] not-italic md:mt-4.5 md:mb-3 md:text-4-5xl md:tracking-wider lg:text-[2.75rem] xl:text-5xl"
        >
          Project Not Exist!
        </h1>
      </div>
    </article>
  </client-only>
</template>

<script lang="ts" setup>
  import BaseBadge from '@/components/BaseBadge.vue';

  const props = defineProps({
    project: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
  });

  const emits = defineEmits(['handleToggleTags']);

  const { endPointDir } = useRuntimeConfig().public;

  const showRemaingTags = ref(false);
  const badgeWrapId = useId();

  const toggleShowProjectTags = () => {
    emits('handleToggleTags');
    showRemaingTags.value = !showRemaingTags.value;
  };

  const projectImageSource = computed(() => {
    if (!props.project) return;
    else return `${endPointDir}${props.project.image}`;
  });

  const projectTags = computed(() => {
    if (props.project?.tags?.length === 0) return [];
    // @ts-ignore
    else
      return props.project.tags.split(',').map(tag => tag.trim().toLowerCase());
  });

  const shownProjectTags = computed(() => {
    if (projectTags.value.length === 0) return;
    else if (projectTags.value.length <= 4) return projectTags.value;
    else {
      if (showRemaingTags.value) return projectTags.value;
      else return projectTags.value.slice(0, 4);
    }
  });

  const isTagsExpanded = computed(() => {
    return showRemaingTags.value ? true : false;
  });

  const projectTagBtnExpanderIcon = computed(() => {
    return showRemaingTags.value ? 'fa-solid fa-minus' : 'fa-solid fa-plus';
  });
</script>

<style lang="css" scoped></style>
