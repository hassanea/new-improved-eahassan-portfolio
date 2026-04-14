<template>
  <span class="badge" :class="contentClasses" v-if="content === 'internship'">
    {{ contentCasing }}
  </span>
  <span
    class="badge"
    :class="contentClasses"
    v-else-if="content === 'personal'"
  >
    <span class="mr-2"> <font-awesome icon="fa-solid fa-hourglass" /> </span>
    {{ contentCasing }}
  </span>
  <span class="badge" :class="contentClasses" v-else-if="content === 'college'">
    <span class="mr-2"> <font-awesome icon="fa-solid fa-diploma" /> </span>
    {{ contentCasing }}
  </span>
  <span class="badge" :class="contentClasses" v-else-if="content === 'udemy'">
    <span class="mr-2">
      <nuxt-img
        :src="udemyImageSource"
        alt=""
        provider="imagekit"
        width="20"
        height="20"
        class="mr-1 ml-auto inline-block h-5 w-5"
      />
    </span>
    {{ contentCasing }}
  </span>
  <span class="badge" :class="contentClasses" v-else-if="content === 'udacity'">
    <span class="mr-2">
      <nuxt-img
        :src="udacityImageSource"
        alt=""
        provider="imagekit"
        width="20"
        height="20"
        class="mr-1 ml-auto inline-block h-5 w-5"
      />
    </span>
    {{ contentCasing }}
  </span>
  <span class="badge" :class="contentClasses" v-else-if="content === 'work'">
    <span class="mr-2"> <font-awesome icon="fa-solid fa-briefcase" /> </span>
    {{ contentCasing }}
  </span>
  <span class="badge" :class="contentClasses" v-else>
    {{ contentCasing }}
  </span>
</template>

<script setup>
  defineOptions({
    name: 'BaseBadge',
  });

  const props = defineProps({
    content: {
      type: String,
      required: false,
    },
  });

  const { endPointDir, endPointSubDir } = useRuntimeConfig().public;

  const contentClasses = computed(() => {
    return {
      html: props.content === 'html',
      css: props.content === 'css',
      javascript: props.content === 'javascript',
      dom: props.content === 'dom',
      jquery: props.content === 'jquery',
      node: props.content === 'node',
      express: props.content === 'express',
      vue: props.content === 'vue',
      pinia: props.content === 'pinia',
      harlem: props.content === 'harlem',
      vaxee: props.content === 'vaxee',
      react: props.content === 'react',
      redux: props.content === 'redux',
      nuxt: props.content === 'nuxt',
      next: props.content === 'next',
      bootstrap: props.content === 'bootstrap',
      tailwind: props.content === 'tailwind',
      supabase: props.content === 'supabase',
      python: props.content === 'python',
      php: props.content === 'php',
      sql: props.content === 'sql',
      mysql: props.content === 'mysql',
      firebase: props.content === 'firebase',
      sqlite: props.content === 'sqlite',
      django: props.content === 'django',
      aws: props.content === 'aws',
      adobe: props.content === 'adobe',
      internship: props.content === 'internship',
      personal: props.content === 'personal',
      college: props.content === 'college',
      udemy: props.content === 'udemy',
      udacity: props.content === 'udacity',
      work: props.content === 'work',
    };
  });

  const contentCasing = computed(() => {
    return props.content.toUpperCase();
  });

  const udemyImageSource = computed(() => {
    return `${endPointDir}${endPointSubDir}/udemy-logo.svg`;
  });

  const udacityImageSource = computed(() => {
    return `${endPointDir}${endPointSubDir}/udacity-logo.svg`;
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .badge {
    @apply inline-flex rounded-md border-2 border-solid border-primary bg-light p-2 text-center font-bold text-dark;
  }
  .html {
    background: linear-gradient(#e44d26 40%, #f16529 60%);
  }
  .css {
    background: #264de4;
    @apply text-light;
  }
  .javascript {
    background: #f0db4f;
  }
  .dom {
    background: #74c365;
  }
  .node {
    background: linear-gradient(#68a063 45%, #3c873a 55%);
  }
  .express {
    background: #eee;
    color: #444;
  }
  .jquery {
    background: #0769ad;
    @apply text-light;
  }
  .vue {
    background: #42b883;
  }
  .pinia {
    background: #ffd350;
    @apply text-dark;
  }
  .harlem {
    background: #285d44;
    @apply text-light;
  }
  .vaxee {
    background: #91d788;
    @apply text-dark;
  }
  .nuxt {
    background: linear-gradient(#00dc82, #101010);
  }
  .react {
    background: #58c4dc;
  }
  .redux {
    background: #593d88;
    @apply text-light;
  }
  .next {
    background: conical-gradient(#ededed, #000000);
  }
  .php {
    background: linear-gradient(#484c89, #777bb3);
    @apply text-light;
  }
  .sql {
    background: #00758f;
  }
  .firebase {
    @apply bg-firebase;
  }
  .python {
    background: linear-gradient(#306998 50%, #ffe873 50%);
  }
  .sqlite {
    background: linear-gradient(#90d4f4, #0f80cc, #003b57);
  }
  .mysql {
    background: radial-gradient(#00758f 80%, #f29111 20%);
    @apply text-light;
  }
  .bootstrap {
    background: #5a23c9;
    @apply text-light;
  }
  .tailwind {
    background: #0cb5d0;
  }
  .supabase {
    background: #006239;
    @apply text-light;
  }
  .django {
    background: linear-gradient(#092e29 85%, #f0faff 15%);
    @apply text-light;
  }
  .aws {
    background: #141f2e;
    @apply text-light;
  }
  .adobe {
    background: radial-gradient(#fa0c00 66%, #ffffff 24%);
  }
  .internship {
    background: #a0a9fe;
  }
  .personal {
    background: #19d18b;
  }
  .college {
    background: #ae9165;
  }
  .udemy {
    background: #6e0dae;
    @apply text-light;
  }
  .udacity {
    background: #2015ff;
    @apply text-light;
  }
  .work {
    background: #ffbf00;
    @apply text-dark;
  }
</style>
