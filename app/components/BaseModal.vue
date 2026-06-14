<template>
  <base-backdrop
    v-if="modelValue"
    @keydown.esc="closeModalOnEscape"
    @click.self="closeModal"
  >
    <template #default>
      <div
        v-if="modelValue"
        ref="trapRef"
        class="modal"
        :class="[modalSizeClasses, modalPositionClasses]"
        :role="type"
        :aria-modal="isActiveModal"
        :aria-labelledby="titleId"
        :aria-describedby="descId"
        :tabindex="setTabIndex"
      >
        <div class="modal-content">
          <div class="flex flex-row items-center justify-between align-middle">
            <slot name="actions">
              <base-button
                variant="btn-close"
                label="Close"
                @click="closeModal"
                @keydown.enter="closeModal"
                v-focus
              >
                <template #icon>
                  <font-awesome icon="fa-solid fa-xmark" />
                </template>
              </base-button>
            </slot>
          </div>
          <slot name="header">
            <h2 :id="titleId" class="modal-title">
              {{ title }}
            </h2>
            <p :id="descId" class="modal-desc">
              {{ description }}
            </p>
          </slot>
          <slot />
        </div>
      </div>
      <!-- <dialog v-else-if="variant === 'native'"></dialog>
      <div v-else>Lightbox</div> -->
    </template>
  </base-backdrop>
</template>

<script setup>
  import { useEventListener } from '@vueuse/core';
  // import { useOnClickOutside } from '@/composables/useOnClickOutside.js';
  import { useFocusTrap } from '@/composables/useFocusTrap.js';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseBackdrop from '@/components/BaseBackdrop.vue';

  defineOptions({
    name: 'BaseModal',
  });

  const props = defineProps({
    type: {
      type: String,
      required: false,
      default: 'dialog',
      validator(value) {
        return ['dialog', 'alertdialog'].includes(value);
      },
    },
    // variant: {
    //   type: String,
    //   required: false,
    //   default: 'custom',
    //   validator(value) {
    //     return ['custom', 'native', 'lightbox'].includes(value);
    //   },
    // },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: String,
      required: false,
      default: 'small',
      validator(value) {
        return ['small', 'medium', 'large', 'fullscreen'].includes(value);
      },
    },
    position: {
      type: String,
      required: false,
      default: 'center',
      validator(value) {
        return [
          'top',
          'top-left',
          'top-right',
          'center',
          'bottom',
          'bottom-left',
          'bottom-right',
        ].includes(value);
      },
    },
  });

  const opened = ref(props.modelValue);
  const titleId = useId();
  const descId = useId();
  let escapeHandler = null;

  defineExpose({ titleId, descId });

  //
  const emits = defineEmits(['close-modal', 'update:modelValue']);
  const { position, size } = props;
  const { trapRef } = useFocusTrap();
  // const backdroplInstance = ref(null);
  // useOnClickOutside(backdroplInstance, e => console.log(e.target));

  const modalPositionClasses = computed(() => {
    return {
      top: position === 'top',
      'top-left': position === 'topLeft',
      'top-right': position === 'topRight',
      center: position === 'center',
      bottom: position === 'bottom',
      'bottom-left': position === 'bottomLeft',
      'bottom-right': position === 'bottomRight',
    };
  });

  const modalSizeClasses = computed(() => {
    return {
      small: size === 'small',
      medium: size === 'medium',
      large: size === 'large',
      'full-screen': size === 'fullscreen',
    };
  });

  const closeModal = () => {
    opened.value = false;
    emits('update:modelValue', opened.value);
    emits('close-modal');
  };
  const closeModalOnEscape = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Create template ref to point at backdrop element.
  // const closeModal2 = e => {
  //   const currentElement = e.target
  //   if (backdropInstance.value.contains(currentElement)) {
  //     closeModal()
  //   } else {
  //     return
  //   }
  // }

  const isActiveModal = computed(() => {
    return props.modelValue ? true : null;
  });

  const setTabIndex = computed(() => {
    return props.modelValue ? null : -1;
  });

  onMounted(() => {
    escapeHandler = useEventListener(document, 'keydown', closeModalOnEscape);
  });

  onBeforeUnmount(() => {
    escapeHandler();
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .modal {
    position: fixed;
    overflow: auto;
    padding: 2rem;
    background: #e2d5d3;
    border-radius: 20px;
    box-shadow: 0 0 5px #323232;
    z-index: 2000;
  }

  .modal .modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
  }

  .modal-title {
    font-weight: bold;
    font-size: 2.5rem;
    text-transform: uppercase;
    letter-spacing: 0.13rem;
    margin-bottom: 0.75rem;
    transform: skewX(-14deg);
    text-align: center;
    line-height: 1.5;
    @apply font-sans;
  }
  .modal-desc {
    font-weight: 500;
    font-size: 1.125rem;
  }

  .small {
    max-width: 70%;
  }

  .medium {
    max-width: 85%;
  }

  .large {
    padding: 2rem 0;
    max-width: 70%;
    overflow-y: scroll;
    max-height: 70%;
  }

  .full-screen {
    position: fixed;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  .top {
    top: 6vh;
    left: 44%;
    transform: translate(-6vh, -44%);
  }

  /* .top-left {} */

  /* .top-right */

  .center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bottom {
    top: 88%;
    left: 48%;
    transform: translate(-48%, -88%);
  }

  /* .bottom-left {} */

  /* .bottom-right {} */
</style>
