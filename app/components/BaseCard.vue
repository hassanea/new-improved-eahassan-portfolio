<template>
  <div class="card">
    <div class="card-header">
      <slot name="header" />
    </div>
    <div class="card-content">
      <slot />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
  defineOptions({
    name: 'BaseCard',
  });
</script>

<style lang="css" scoped></style>
