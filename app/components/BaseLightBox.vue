<template>
  <base-backdrop
    v-if="show"
    :tabindex="setTabIndex"
    @[backDropClickEvent].self="closeLightBox"
    @[backDropKeyboardEvent].esc="closeLightBox"
  >
    <div
      v-if="show"
      ref="trapRef"
      role="dialog"
      :aria-modal="show ? true : null"
      :aria-label="label"
      class="fixed top-0 left-0 z-2000 h-full w-full overflow-y-scroll rounded-xl bg-primary p-6 md:top-[1%] md:left-[10%] md:h-auto md:max-w-[80%] md:min-w-[50%] md:p-7 lg:top-0 lg:left-[25%] lg:max-h-[98%] lg:max-w-[50%] lg:min-w-[35%] lg:p-8 xl:top-[3%] xl:max-h-[auto]"
    >
      <div
        class="absolute top-0 right-0 bottom-0 left-0 mx-auto my-0 flex h-14 w-full items-center justify-center rounded-[5px] bg-[#082e66] p-1 align-middle opacity-50 md:justify-evenly md:p-2"
      >
        <p
          class="m-3 inline-block align-middle font-sans2 text-lg leading-normal font-bold text-light italic md:text-xl"
        >
          {{ currentSlideOutput }}
        </p>
        <base-button
          v-tooltip.right="'Close Lightbox'"
          variant="btn-close"
          class="btn-toolbar"
          label="Close"
          @click="closeLightBox"
          @keydown.enter="closeLightBox"
          v-focus
        >
          <font-awesome icon="fa-solid fa-xmark" />
        </base-button>
        <base-button
          v-tooltip.bottom="'Play'"
          variant="btn-toolbar"
          label="Play slideshow"
          @click="handleLightBoxPlay"
          @keydown.enter="handleLightBoxPlay"
        >
          <font-awesome icon="fa-solid fa-play" />
        </base-button>
        <base-button
          v-tooltip.bottom="'Pause'"
          variant="btn-toolbar"
          label="Pause slideshow"
          @click="handleLightBoxPause"
          @keydown.enter="handleLightBoxPause"
        >
          <font-awesome icon="fa-solid fa-pause" />
        </base-button>
        <base-button
          v-tooltip.bottom="'Toggle captions'"
          variant="btn-toolbar"
          label="Toggle captions"
          @click="handleToggleCaptions"
          @keydown.enter="handleToggleCaptions"
        >
          <font-awesome icon="fa-solid fa-note" />
        </base-button>
        <base-button
          v-tooltip.bottom="'Show thumbnails'"
          variant="btn-toolbar"
          label="Show image thumbnails"
          class="btn-toolbar"
          @click="handleDisplayThumbnails"
          @keydown.enter="handleDisplayThumbnails"
        >
          <font-awesome icon="fa-solid fa-images" />
        </base-button>
        <base-button
          v-if="!isMobile"
          v-tooltip.bottom="'Toggle fullscreen'"
          variant="btn-toolbar"
          label="Toggle fullscreen mode"
          @click="toggle"
          @keydown.enter="toggle"
        >
          <font-awesome icon="fa-solid fa-expand" />
        </base-button>
      </div>
      <div
        class="relative flex h-auto w-full flex-col flex-nowrap items-center justify-center overflow-y-scroll"
      >
        <figure v-if="currentImage">
          <Transition name="fade">
            <nuxt-img
              :src="endPointDir + currentImage"
              provider="imagekit"
              :alt="currentAltDescription"
              :style="wheelTransformStyle"
              class="mx-auto mt-12 mb-2 block h-auto w-full rounded-xl object-cover md:mt-12.5 md:mb-3"
              @wheel.passive="handleZoomOnProjectImage"
            />
          </Transition>
          <base-caption
            v-if="showCaptions && images[currentSlide]"
            :project="images[currentSlide]"
          />
        </figure>
        <div
          v-else
          role="status"
          class="mx-auto mt-12.5 mb-3 block h-auto w-full animate-pulse space-y-8 rounded-xl object-cover md:flex md:items-center md:space-y-0 md:space-x-8 rtl:space-x-reverse"
        >
          <div
            class="mx-auto flex h-60 w-full items-center justify-center rounded bg-gray-300 sm:w-96 dark:bg-gray-700"
          >
            <svg
              class="h-20 w-20 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
              />
            </svg>
          </div>
        </div>
        <!-- <iframe v-show="" src="" title="" allowfullscreen></iframe> -->
        <div
          v-if="showThumbNails && numberOfSlides"
          class="mx-0 my-4 flex h-auto w-full flex-row flex-nowrap items-center justify-around gap-2 overflow-x-scroll md:my-5 md:gap-3"
        >
          <button
            v-for="(image, index) in images"
            :key="image.id"
            class="btn-lightbox-slide-control"
            @click="handleImageSelection(index)"
            @keydown.enter="handleImageSelection(index)"
            :aria-label="`Slide ${index + 1} of ${numberOfSlides}`"
          >
            <nuxt-img
              :src="endPointDir + image.image"
              provider="imagekit"
              :alt="image.title"
              class="lightbox-thumbnail-img"
              :class="{
                'lightbox-thumbnail-img-active': currentSlide === index,
              }"
            />
          </button>
        </div>
        <div
          class="mx-auto my-0 flex items-center justify-between px-4.5 py-0 md:px-5 lg:px-6"
        >
          <base-button
            v-tooltip.left="'Previous'"
            variant="btn-lightbox"
            label="Previous slide"
            class="absolute top-1/2 left-0 translate-x-0 -translate-y-1/2"
            @click="handlePreviousSlide"
            @keydown.left="handlePreviousSlide"
            @keydown.page-down="handlePreviousSlide"
          >
            <template #default>
              <font-awesome icon="fa-solid fa-arrow-left" />
            </template>
          </base-button>
          <base-button
            v-tooltip.right="'Next'"
            variant="btn-lightbox"
            label="Next slide"
            class="absolute top-1/2 right-0 translate-x-0 -translate-y-1/2"
            @click="handleNextSlide"
            @keydown.right="handleNextSlide"
            @keydown.page-up="handleNextSlide"
          >
            <template #default>
              <font-awesome icon="fa-solid fa-arrow-right" />
            </template>
          </base-button>
        </div>
      </div>
    </div>
  </base-backdrop>
</template>

<script setup>
  import { useFullscreen, useMediaQuery } from '@vueuse/core';
  import BaseBackdrop from '@/components/BaseBackdrop.vue';
  import { useFocusTrap } from '@/composables/useFocusTrap';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseCaption from '@/components/BaseCaption.vue';

  defineOptions({
    name: 'BaseLightBox',
  });
  const { endPointDir } = useRuntimeConfig().public;

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    showThumbNails: {
      type: Boolean,
      required: false,
      default: false,
    },
    showCaptions: {
      type: Boolean,
      required: false,
      default: true,
    },
    media: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    videos: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    images: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    duration: {
      type: Number,
      required: false,
      default: 2500,
    },
    modelValue: {
      type: Number,
      required: false,
      default: 0,
    },
  });

  const emit = defineEmits([
    'closeModal',
    'showThumbs',
    'toggleCaptions',
    'toggleFullScreen',
    'updateSlideDuration',
    'update:modelValue',
  ]);

  const { trapRef } = useFocusTrap();

  useTemplateRef < HTMLElement > 'trapRef';

  const { toggle } = useFullscreen(trapRef);

  const currentSlide = ref(props.modelValue);

  const currentSlideDuration = ref(props.duration);

  const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 480px)');

  const backDropClickEvent = computed(() => {
    return isMobile.value ? '' : 'click';
  });

  const backDropKeyboardEvent = computed(() => {
    return isMobile.value ? '' : 'keydown';
  });

  const zoomScale = ref(1);

  let handleLightBox = null;

  const handleImageSelection = index => {
    currentSlide.value = index;
  };

  const handleDisplayThumbnails = () => {
    emit('showThumbs');
  };

  const handleToggleCaptions = () => {
    emit('toggleCaptions');
  };

  const handleZoomOnProjectImage = e => {
    zoomScale.value += e.deltaY * -0.01;
    zoomScale.value = Math.min(Math.max(0.125, zoomScale.value), 4);
  };

  const numberOfSlides = computed(() => {
    if (props.images.length === 0) return 0;
    else return props.images.length;
  });

  const wheelTransformStyle = computed(() => {
    return { transform: `scale(${zoomScale.value})` };
  });

  const closeLightBox = () => {
    emit('closeModal');
  };

  const currentImage = computed(() => {
    if (props.images.length < 0) return '';
    else return props.images[currentSlide.value]?.image;
  });

  const currentSlideOutput = computed(() => {
    return `${currentSlide.value + 1} / ${numberOfSlides.value}`;
  });

  const currentAltDescription = computed(() => {
    if (props.images.length < 0) return '';
    else return props.images[currentSlide.value]?.title;
  });

  const setTabIndex = computed(() => {
    return props.show ? 0 : -1;
  });

  const handleNextSlide = () => {
    if (currentSlide.value < numberOfSlides.value - 1) {
      currentSlide.value++;
    } else {
      currentSlide.value = 0;
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide.value === 0) {
      currentSlide.value = numberOfSlides.value - 1;
    } else {
      currentSlide.value--;
    }
  };

  onMounted(() => {
    if (typeof window !== undefined) {
      handleLightBox = setInterval(() => {
        handleNextSlide();
      }, currentSlideDuration.value);
    }
  });

  onUnmounted(() => {
    clearInterval(handleLightBox);
    handleLightBox = null;
  });

  const handleLightBoxPlay = () => {
    currentSlide.value = 0;
    handleLightBox = setInterval(() => {
      handleNextSlide();
    }, currentSlideDuration.value);
  };

  const handleLightBoxPause = () => {
    clearInterval(handleLightBox);
    handleLightBox = null;
  };

  watch(currentSlide, updatedSlide => {
    emit('update:modelValue', updatedSlide);
  });

  watch(
    () => props.duration,
    newSlideDuration => {
      currentSlideDuration.value = newSlideDuration;
    },
    { immediate: true },
  );

  // watch(
  //   currentSlideDuration,
  //   value => {
  //     emit('updateSlideDuration', value);
  //   },
  //   { immediate: true },
  // );

  watch(
    () => props.modelValue,
    newSlide => {
      currentSlide.value = newSlide;
    },
    { immediate: true },
  );
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .lightbox {
    max-width: 65%;
    min-width: 50%;
    height: auto;
    position: fixed;
    top: 16%;
    left: 12%;
    transform: translate(0, -15%);
    z-index: 2000;
    padding: 2rem;
    border-radius: 12px;
    overflow-y: scroll;
  }

  .lightbox .lightbox-content {
    width: 100%;
    height: auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-y: scroll;
    @apply bg-primary;
  }

  .lightbox .lightbox-toolbar {
    width: 100%;
    height: 3.75rem;
    /* position: absolute;
      top: 0;
      left: 0; */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    vertical-align: middle;
    padding: 0.5rem;
    margin: 0 auto;
    background: rgba(8, 46, 102, 0.5);
    border-radius: 5px;
    z-index: 1;
  }

  .lightbox-img {
    display: block;
    width: 100%;
    height: auto;
    margin: 3.125rem auto 0.75rem auto;
    object-fit: cover;
    border-radius: 12px;
  }

  .lightbox-slide-output {
    display: inline-block;
    vertical-align: middle;
    margin: 0.75rem;
    @apply font-sans2 text-xl leading-normal font-bold text-dark italic;
  }

  .lightbox-thumbnails {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-flow: row nowrap;
    width: 100%;
    height: auto;
    gap: 0.75rem;
    margin: 1rem 0;
    overflow-x: scroll;
  }

  .lightbox-thumbnail-img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    filter: grayscale(1);
  }

  .lightbox-thumbnail-img:hover {
    border-bottom: 4px solid #ffff00;
    padding: 0.5rem;
    filter: none;
  }

  .lightbox-thumbnail-img-active {
    filter: none;
    padding: 0.25rem;
    @apply border-4 border-solid border-dark;
  }

  .prev {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(0, -50%);
  }

  .next {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(0, -50%);
  }

  .btn-lightbox-slide-control {
    display: inline-block;
    width: 25%;
    height: 25%;
    cursor: pointer;
    border: 0;
  }

  .lightbox-controls {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    margin: 0 auto;
  }
</style>
