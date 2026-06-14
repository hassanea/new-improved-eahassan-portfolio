<template>
  <main
    id="content"
    class="border-[rgb(50, 50, 50)] flex min-h-screen flex-col flex-nowrap border-solid focus:border-4 focus:outline-0"
    tabindex="-1"
  >
    <slot />
  </main>
</template>

<script setup>
  defineOptions({
    name: 'BaseMain',
  });
</script>
