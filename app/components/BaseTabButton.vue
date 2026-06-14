<template>
  <button
    type="button"
    role="tab"
    :tabindex="setTabIndex"
    :aria-selected="isTabSelected"
    class="tab-button"
    :class="activeTabClass"
  >
    <slot />
  </button>
</template>

<script setup>
  defineOptions({
    name: 'BaseTabButton',
  });

  const props = defineProps({
    isActive: {
      type: Boolean,
      required: true,
    },
  });

  const activeTabClass = computed(() => {
    return { 'tab-button-active': props.isActive };
  });

  const setTabIndex = computed(() => {
    return props.isActive ? null : '-1';
  });

  const isTabSelected = computed(() => {
    return props.isActive ? true : false;
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .tab-button {
    width: 92%;
    height: 4rem;
    position: relative;
    display: inline-block;
    cursor: pointer;
    background: #c5e2ea;
    border: 2px solid #98afc7;
    color: #151616;
    @apply font-sans text-lg leading-[1.8] font-extrabold not-italic;
    border-radius: 15px 15px 0 0;
    padding: 0.8rem 1.5rem;
    margin: 0 0.85rem;
    transition:
      background,
      opacity,
      color,
      transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .tab-button:nth-child(1) {
    width: 88%;
  }

  .tab-button:not(.tab-button-active):hover {
    border-bottom: 2px solid #151616;
  }

  .tab-button:active {
    box-shadow: 0 0 12px #475867;
  }

  .tab-button:focus {
    border: 4px double #023047;
    outline: none;
  }

  .tab-button.tab-button-active {
    background: #98afc7;
    transform: scale(1.05) translateY(-25%);
  }

  .tab-button.tab-button-active:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 26%;
    transform: translate(0, -26%);
    width: 5.5rem;
    height: 0.33rem;
    margin: 0.5rem 0;
    border-radius: 20px;
    background: #2c4e6d;
  }

  @media only screen and (max-width: 767px) {
    .tab-button:nth-child(1),
    .tab-button {
      width: 100%;
    }
    .tab-button {
      height: 3.75rem;
      font-size: 1.0625rem;
      border-radius: 12px 12px 0 0;
      padding: 0.625rem 1rem;
      margin: 0 auto;
      transition:
        background,
        opacity,
        color,
        transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .tab-button.tab-button-active {
      transform: scale(1.1);
    }
  }
</style>
