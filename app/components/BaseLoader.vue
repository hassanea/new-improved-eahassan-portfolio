<template>
  <div role="status" :type="type" :class="loaderClasses" />
</template>

<script setup>
  import { computed } from 'vue';

  defineOptions({
    name: 'BaseLoader',
  });

  const props = defineProps({
    type: {
      type: String,
      required: true,
      default: 'loader',
      validator(value) {
        return ['loader', 'status'].includes(value);
      },
    },
  });

  const { type } = props;

  const loaderClasses = computed(() => {
    return {
      loader: type === 'loader',
      'status-loader': type === 'status',
    };
  });
</script>

<style lang="css" scoped>
  .backdrop {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(120, 110, 260, 0.4);
    mix-blend-mode: luminosity;
    z-index: 1050;
  }

  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2000;
    transform: translate(-50%, -50%);
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
    width: 6.25rem;
    height: 6.25rem;
    border: 10px double var(--text-color-2);
    border-radius: 50%;
    background: #3a555d;
    color: #f9f9f9;
    mix-blend-mode: screen;
    animation: 0.6s spin cubic-bezier(0.85, 0.87, 0.92, 0.18) infinite;
    opacity: 0.9;
    transition:
      background,
      opacity,
      border 0.4s linear;
  }

  .status-loader {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
    @apply border-[5px] border-solid border-primary;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      background: linear-gradient(#0a0dee, #fff, #000);
      border: 5px solid #0a0dee;
      transform: rotate(0deg);
      opacity: 0.85;
    }
    25% {
      background: linear-gradient(#908b03, #2c3a06, #f0ae02);
      transform: rotate(90deg);
      border: 2px solid #f0ae02;
      opacity: 0.8;
    }
    50% {
      background: linear-gradient(#0a0dee, #f9f9f9, #9a9d0e);
      transform: rotate(180deg);
      border: 4px solid #f9f9f9;
      opacity: 0.95;
    }

    75% {
      background: linear-gradient(#a9af1d, #00849b, #9a9d0e);
      transform: rotate(270deg);
      border: 10px solid #a9af1d;
      opacity: 0.9;
    }

    100% {
      background: linear-gradient(#f0f0f0, #009dcc, #ccc);
      transform: rotate(360deg);
      border: 8px solid #009dcc;
      opacity: 0.85;
    }
  }
</style>
