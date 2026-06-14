<template>
  <li
    :class="goalClasses"
    class="mb-0 list-inside indent-2 font-sans2 text-base leading-normal font-semibold md:text-lg"
  >
    {{ goal }}
  </li>
</template>

<script setup>
  defineOptions({
    name: 'BaseGoal',
  });
  const props = defineProps({
    goal: {
      type: String,
      required: false,
    },
    variant: {
      type: String,
      required: false,
      default: 'goal',
      validator(value) {
        return ['goal', 'cert'].includes(value);
      },
    },
  });

  const goalClasses = computed(() => {
    return {
      'marker:content-["⭐️"]': props.variant === 'goal',
      'marker:content-["📜"]': props.variant === 'cert',
    };
  });
</script>
