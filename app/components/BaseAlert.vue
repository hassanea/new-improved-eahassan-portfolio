<template>
  <div v-if="display" role="alert" class="alert" :class="alertClasses">
    <slot />
    <base-button
      variant="btn-close"
      label="Close!"
      @click="handleCloseAlert"
      @keydown.enter="handleCloseAlert"
    >
      <template #icon>
        <font-awesome icon="fa-solid fa-xmark" />
      </template>
    </base-button>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import BaseButton from './BaseButton.vue';

  defineOptions({
    name: 'BaseAlert',
  });

  const props = defineProps({
    display: {
      type: Boolean,
      required: false,
      default: false,
    },
    variant: {
      type: String,
      required: false,
      default: 'info',
      validator(value) {
        return [
          'success',
          'danger',
          'warning',
          'light',
          'dark',
          'info',
          'alt',
          'quinary',
          'quaternary',
          'tertiary',
          'secondary',
          'primary',
        ].includes(value);
      },
    },
  });

  const emit = defineEmits(['close-alert']);

  const { variant } = props;

  const handleCloseAlert = () => {
    emit('close-alert');
  };

  const alertClasses = computed(() => {
    return {
      'alert-success': variant === 'success',
      'alert-danger': variant === 'danger',
      'alert-warning': variant === 'warning',
      'alert-light': variant === 'light',
      'alert-dark': variant === 'dark',
      'alert-info': variant === 'info',
      'alert-alternative': variant === 'alt',
      'alert-quinary': variant === 'quinary',
      'alert-quaternary': variant === 'quaternary',
      'alert-tertiary': variant === 'tertiary',
      'alert-secondary': variant === 'secondary',
      'alert-primary': variant === 'primary',
    };
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .alert {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60%;
    max-width: 80%;
    position: fixed;
    z-index: 900;
    top: 10vh;
    left: 50%;
    transform: translate(-50%, -10vh);
    padding: 1rem;
    border-radius: 10px;
    @apply bg-light text-dark;
  }

  .alert-primary {
    @apply bg-primary text-light;
  }

  .alert-secondary {
    @apply bg-secondary text-light;
  }

  .alert-tertiary {
    @apply bg-tertiary text-dark;
  }

  .alert-quaternary {
    @apply bg-quaternary text-dark;
  }

  .alert-quinary {
    @apply bg-quinary text-light;
  }

  .alert-alternative {
    @apply bg-alternative text-dark;
  }

  .alert-info {
    @apply bg-blue-500 text-dark;
  }

  .alert-success {
    background: #99ff99;
    @apply text-dark;
  }

  .alert-warning {
    background: #ffff99;
    @apply text-dark;
  }

  .alert-danger {
    background: #efb2b2;
    @apply text-dark;
  }

  .alert-light {
    @apply bg-light text-dark;
  }

  .alert-dark {
    @apply bg-dark text-light;
  }
</style>
