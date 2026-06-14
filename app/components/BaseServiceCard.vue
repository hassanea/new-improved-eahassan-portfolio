<template>
  <li
    class="flex max-w-68 flex-[272px] grow flex-col flex-nowrap items-center justify-center gap-3 rounded-xl border-4 border-solid border-dark bg-[#323244] p-3 text-center text-base leading-normal font-bold not-italic md:gap-3.5 md:p-4 md:text-lg lg:gap-4 dark:border-light"
  >
    <nuxt-img
      v-if="isSVGImg"
      :src="serviceImgSource"
      alt=""
      width="24"
      height="24"
      class="easel-icon mx-auto inline-block h-6 w-6 align-middle text-2xl leading-normal"
      provider="imagekit"
    />
    <font-awesome v-else :icon="service.icon" />
    {{ service.name }}
  </li>
</template>

<script setup>
  const props = defineProps({
    service: {
      type: Object,
      required: true,
    },
  });

  const { endPointDir, endPointSubDir } = useRuntimeConfig().public;
  const isSVGImg = computed(() => props.service.icon.endsWith('.svg'));
  const serviceImgSource = computed(
    () => `${endPointDir}${endPointSubDir}/${props.service.icon}`,
  );
</script>

<style lang="css" scoped>
  .easel-icon {
    filter: brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(0%)
      hue-rotate(202deg) brightness(106%) contrast(105%);
  }
</style>
