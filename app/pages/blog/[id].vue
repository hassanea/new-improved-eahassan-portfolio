<template>
  <div>
    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'blog-layout',
    name: 'Blog Post',
    depth: 3,
  });
</script>

<style lang="css" scoped></style>
