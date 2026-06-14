<template>
  <div class="progress-label">
    <span :id="skillId" class="progress-chip"> {{ label }} </span>
  </div>
  <div
    class="progress"
    role="progressbar"
    :aria-labelledby="skillId"
    :aria-valuenow="currentValue"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuetext="skillLabel"
  >
    <div class="progress-bar" :style="skillLevelWidth">
      <div class="progress-status">
        {{ currentValue }}
      </div>
    </div>
  </div>
</template>

<script setup>
  defineOptions({
    name: 'BaseProgressBar',
  });

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    currentValue: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: 100,
    },
  });
  const { label, currentValue, min, max } = props;
  const skillId = `${label.toLowerCase()}-${useId()}`;

  const skillLabel = computed(() => {
    return `${label} Skill level`;
  });

  const skillLevelWidth = computed(() => {
    return { width: currentValue };
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .progress-label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    @apply font-sans text-xl leading-normal font-bold text-dark italic;
  }

  .progress-chip {
    position: relative;
    border: 2px solid #4f5559;
    padding: 0.5rem 0.625rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: bold;
    @apply text-dark;
  }

  .progress-chip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 20%;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid #4f5559;
  }

  .progress {
    width: 98%;
    height: 2.8rem;
    display: inline-block;
    vertical-align: middle;
    margin: 1.25rem auto 2rem;
    background: #004e4d;
    border-radius: 80px;
  }

  .progress .progress-bar {
    width: 0;
    height: 100%;
    position: relative;
    border-radius: 80px;
    transition: width 0.4s linear;
    @apply bg-primary text-dark;
  }

  .progress .progress-bar .progress-status {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-20%, -10%);
    padding: 0.25rem;
    @apply font-sans2 text-lg leading-normal font-extrabold text-light not-italic;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .progress {
      width: 100%;
      margin: 1.125rem auto 1.5rem;
    }
  }
</style>
