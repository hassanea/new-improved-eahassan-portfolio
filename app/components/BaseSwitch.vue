<template>
  <button
    :class="SwitchClasses"
    :aria-checked="isChecked"
    :aria-label="label"
    :aria-describedby="description ? switchDescId : null"
    :title="toolTipLabel"
    type="button"
    class="switch"
    role="switch"
    @click="toggleSwitch"
    @keydown.enter="toggleSwitch"
  >
    <span class="switch-inner" :class="switchInnerClasses">
      <slot name="icon" />
    </span>
    <slot />
    <p v-if="description" :id="switchDescId" class="sr-only">
      {{ description }}
    </p>
  </button>
</template>

<script setup>
  defineOptions({
    name: 'BaseSwitch',
  });

  const props = defineProps({
    mode: {
      type: String,
      required: false,
      default: 'light',
      validator(value) {
        return ['light', 'dark', 'no-preference', 'reduce'].includes(value);
      },
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: true,
    },
  });

  const toggled = ref(props.modelValue);

  const switchDescId = useId();

  const emits = defineEmits(['update:modelValue']);

  const toggleSwitch = () => {
    toggled.value = !toggled.value;
  };

  watch(
    () => props.modelValue,
    value => {
      toggled.value = value;
    },
    { immediate: true },
  );

  watch(toggled, value => {
    emits('update:modelValue', value);
  });

  const isChecked = computed(() => {
    return props.mode === 'dark' || props.mode === 'reduce' ? true : false;
  });

  const toolTipLabel = computed(() => {
    if (props.mode === 'dark') return 'Toggle Light Mode!';
    else if (props.mode === 'light') return 'Toggle Dark Mode!';
    else if (props.mode === 'no-preference') return 'Toggle Reduce Mode!';
    else if (props.mode === 'reduce') return 'Toggle No-Preference Mode!';
    else return '';
  });

  const SwitchClasses = computed(() => {
    return {
      dark: props.mode === 'dark' || props.mode === 'no-preference',
      light: props.mode === 'light' || props.mode === 'reduce',
    };
  });

  const switchInnerClasses = computed(() => {
    return { unchecked: !toggled.value, checked: toggled.value };
  });
</script>

<style lang="css" scoped>
  @import '../../app/assets/css/main.css';
  .switch,
  button[role='switch'] {
    width: 4.8rem;
    height: 3rem;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    border-radius: 75px;
    padding: 0.625rem;
    border: 0;
    margin: 0 auto;
    cursor: pointer;
    @apply text-light;
  }

  .switch.dark:hover,
  button[role='switch'].dark:hover,
  .switch.dark:active,
  button[role='switch'].dark:active {
    background: #330867;
    @apply text-light;
  }

  .switch.light:hover,
  button[role='switch'].light:hover,
  .switch.light:active,
  button[role='switch'].light:active {
    background: #ffff8e;
    @apply text-dark;
  }

  .switch:focus,
  button[role='switch']:focus {
    outline: 0;
  }

  .switch.dark:active,
  button[role='switch'].dark:active,
  .switch.dark:focus,
  button[role='switch'].dark:focus {
    border: 3px dashed #ffff8e;
  }

  .switch.light:active,
  button[role='switch'].light:active .switch.light:focus,
  button[role='switch'].light:focus {
    border: 3px dashed #330867;
  }

  .switch-inner {
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    padding: 0.25rem;
    transition: transform 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
    @apply border-2 border-solid border-light;
  }

  .switch-inner:hover {
    @apply border-2 border-solid border-light;
  }

  .switch-inner.unchecked {
    top: 32%;
    left: 18%;
    transform: translate(-32%, -18%);
  }

  .switch-inner.checked {
    top: 20%;
    right: -4%;
    transform: translate(-20%, -4%);
  }

  .switch.dark,
  button[role='switch'].dark {
    background: #330867;
    @apply text-light;
  }
  .switch.light,
  button[role='switch'].light {
    background: #ffff8e;
    @apply text-dark;
  }
</style>
