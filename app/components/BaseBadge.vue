<template>
  <span class="badge" :class="contentClasses" v-if="content === 'internship'">
    <span class="mr-2">
      <lazy-font-awesome icon="fa-solid fa-brain-circuit" />
    </span>
    {{ contentCasing }}
  </span>
  <span
    class="badge"
    :class="contentClasses"
    v-else-if="content === 'personal'"
  >
    <span class="mr-2">
      <lazy-font-awesome icon="fa-solid fa-hourglass" />
    </span>
    {{ contentCasing }}
  </span>
  <span class="badge" :class="contentClasses" v-else-if="content === 'college'">
    <span class="mr-2"> <lazy-font-awesome icon="fa-solid fa-diploma" /> </span>
    {{ contentCasing }}
  </span>
  <span class="badge" :class="contentClasses" v-else-if="content === 'udemy'">
    <span class="mr-2">
      <lazy-nuxt-img
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
      <lazy-nuxt-img
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
    <span class="mr-2">
      <lazy-font-awesome icon="fa-solid fa-briefcase" />
    </span>
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

  const contentClasses = computed(() => {
    return {
      html: props.content === 'html',
      css: props.content === 'css',
      javascript: props.content === 'javascript',
      typescript: props.content === 'typescript',
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
      planetscale: props.content === 'planetscale',
      python: props.content === 'python',
      php: props.content === 'php',
      sql: props.content === 'sql',
      sqlite: props.content === 'sqlite',
      mysql: props.content === 'mysql',
      postgresql: props.content === 'postgresql',
      mariadb: props.content === 'mariadb',
      oracledb: props.content === 'oracledb',
      sqlserver: props.content === 'sqlserver',
      firebase: props.content === 'firebase',
      mongodb: props.content === 'mongodb',
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
    return `/icons/udemy-logo.svg`;
  });

  const udacityImageSource = computed(() => {
    return `/icons/udacity-logo.svg`;
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .badge {
    @apply inline-flex rounded-md border-2 border-solid border-primary p-2 text-center font-bold;
  }
  .node {
    background: linear-gradient(#68a063 45%, #3c873a 55%);
  }
  .nuxt {
    background: linear-gradient(#00dc82, #101010);
  }
  .next {
    background: conical-gradient(#ededed, #000000);
  }
  .php {
    background: linear-gradient(#484c89, #777bb3);
    @apply text-light;
  }
  .sqlite {
    background: linear-gradient(#90d4f4, #0f80cc, #003b57);
  }
  .mysql {
    background: radial-gradient(#00758f 80%, #f29111 20%);
    @apply text-light;
  }
  .mariadb {
    background: linear-gradient(#c0765a 50%, #1f305f 50%);
    @apply text-light;
  }
  .sqlserver {
    background: linear-gradient(#007fe5 50%, #82c6fb 50%);
    @apply text-dark;
  }
  .firebase {
    @apply bg-firebase;
  }
  .django {
    background: linear-gradient(#092e29 85%, #f0faff 15%);
    @apply text-light;
  }
  .cloudflare {
    background: linear-gradient(#fc7c1e 50%, #ffa945 50%);
    @apply text-[#404041];
  }
  .ms-azure {
    background: linear-gradient(#104581 33.33%, #3ccbf4 33.33%, #0078d4 33.33%);
    @apply text-dark;
  }
  .goog-cloud {
    @apply bg-google;
  }
  /* .netlify {
    @apply 
  } */
  .adobe {
    background: radial-gradient(#fa0c00 66%, #ffffff 24%);
  }
</style>
