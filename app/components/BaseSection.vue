<template>
  <section :id class="h-auto w-full">
    <slot />
  </section>
</template>

<script setup>
  defineOptions({
    name: 'BaseSection',
  });

  const props = defineProps({
    id: {
      type: String,
      required: false,
    },
  });
  const { id } = props;
</script>
