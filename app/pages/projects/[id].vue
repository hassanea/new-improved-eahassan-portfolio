<template>
  <base-project-card
    :project="currentProject"
    @handle-toggle-tags="handleShownTags"
  />
</template>

<script setup lang="ts">
  import BaseProjectCard from '@/components/BaseProjectCard.vue';
  import { usePortfolioStore } from '../../../stores/usePortfolioStore';

  const store = usePortfolioStore();
  const { projectID, currentProject } = storeToRefs(store);

  watch(
    () => useRoute().params.id,
    currentValue => {
      // @ts-ignore
      projectID.value = currentValue;
    },
    { immediate: true },
  );

  definePageMeta({
    name: 'Project',
    layout: 'project-layout',
    depth: 3,
  });

  const toggledTags = ref(false);

  const handleShownTags = () => {
    toggledTags.value = !toggledTags.value;
  };

  onMounted(() => {
    const { name: routeName } = useRoute();
    useHead({
      titleTemplate: `%s | ${routeName} | ${currentProject?.value.title}`,
    });
  });

  if (!currentProject.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Project Not Found',
      fatal: true,
    });
  }
</script>
