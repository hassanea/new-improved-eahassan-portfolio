<template>
  <div>
    <nuxt-link
      :to="to"
      class="sr-only-focusable sr-only absolute top-0 -left-2500 z-100 h-px w-px overflow-hidden rounded-[5px] bg-tertiary p-2.5 font-black text-dark outline-0 hover:cursor-pointer hover:bg-dark hover:text-tertiary hover:underline focus:static focus:inset-0 focus:h-auto focus:w-auto focus:border-[3px] focus:border-solid focus:border-light active:cursor-pointer active:bg-dark active:text-tertiary active:underline motion-reduce:transition-none motion-reduce:duration-0"
      :label="label"
      :title="label"
    >
      {{ label }}
    </nuxt-link>
  </div>
</template>

<script setup>
  defineOptions({
    name: 'BaseSkipLink',
  });

  const props = defineProps({
    to: {
      type: String,
      required: true,
      validator(value) {
        return value.startsWith('#');
      },
    },
    label: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="css" scoped></style>
