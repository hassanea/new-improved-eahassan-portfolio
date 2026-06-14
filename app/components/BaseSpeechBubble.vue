<template>
  <p class="speech-bubble">
    <slot />
  </p>
</template>

<script setup>
  defineOptions({
    name: 'BaseSpeechBubble',
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .speech-bubble {
    @apply bg-secondary font-sans2 text-[1.0625rem] leading-[1.8] font-bold not-italic;
    position: relative;
    width: 100%;
    height: auto;
    -webkit-box-shadow: 4px 4px 10px #bbb;
    box-shadow: 4px 4px 10px #bbb;
    color: #eae6e5;
    text-align: left;
    border: 2px solid #000;
    border-radius: 20px;
    margin: 2rem auto 3.25rem;
    padding: 2rem;
  }

  .speech-bubble::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 7%;
    left: -8.45%;
    border-left: 28px solid #eae6e5;
    border-right: 28px solid transparent;
    border-top: 28px solid #eae6e5;
    border-bottom: 28px solid transparent;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  @media only screen and (max-width: 768px) {
    .speech-bubble {
      text-align: left;
      margin-bottom: 2rem;
    }
    .speech-bubble::after {
      top: 7%;
      left: -8.55%;
      border-left: 20px solid #eae6e5;
      border-right: 20px solid transparent;
      border-top: 20px solid #eae6e5;
      border-bottom: 20px solid transparent;
    }
  }
  @media only screen and (max-width: 767px) {
    .speech-bubble {
      text-align: left;
      background: 0 0;
      border: none;
      border-radius: 0;
      margin: 1rem 0;
      padding: 0;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .speech-bubble::after {
      content: '';
      border: none;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 970px) {
    .speech-bubble::after {
      top: 7%;
      left: -8.2%;
      border-left: 24px solid #eae6e5;
      border-right: 24px solid transparent;
      border-top: 24px solid #eae6e5;
      border-bottom: 24px solid transparent;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 930px) and (orientation: landscape) {
    .speech-bubble::after {
      top: 7%;
      left: -8.65%;
    }
  }
</style>
