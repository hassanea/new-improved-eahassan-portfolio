<template>
  <div>
    <h1>Blog Listing:</h1>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'blog-layout',
    name: 'Blog',
    depth: 2,
  });
  const { data: blogListing } = await useAsyncData('blog', () =>
    queryCollection('content').path('/blog').all(),
  );

  console.log(blogListing);
</script>

<style lang="css" scoped></style>
