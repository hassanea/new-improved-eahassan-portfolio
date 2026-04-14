<template>
  <template v-if="!isMobile">
    <video
      ref="video"
      :class="videoClasses"
      :poster="endPoint + endPointDir + poster"
      playsinline
      autoplay
      muted
      loop
    >
      <source
        v-for="source in sources"
        :key="source.type"
        :src="endPoint + endPointDir + source.source"
        :type="source.type"
      />
      <p>Sorry, Your Browser Does Not Support the embeded Video!</p>
    </video>
  </template>
</template>

<script lang="ts" setup>
  const props = defineProps({
    variant: {
      type: String,
      required: false,
      default: 'media',
      validator(value: string) {
        return ['header', 'media'].includes(value);
      },
    },
    sources: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    poster: {
      type: String,
      required: false,
      default: '',
    },
    isMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
  });

  const { endPoint, endPointDir } = useRuntimeConfig().public;

  const videoClasses = computed(() => {
    return {
      'header-video': props.variant === 'header',
      'media-video': props.variant === 'media',
    };
  });
</script>

<style lang="css" scoped>
  .header-video {
    @apply absolute top-1/2 left-1/2 z-[-1] block aspect-video h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover;
  }
  .media-video {
    @apply absolute top-1/2 left-1/2 block aspect-video h-auto max-w-full -translate-x-1/2 -translate-y-1/2 object-cover;
  }
</style>
