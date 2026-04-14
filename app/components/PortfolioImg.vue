<template>
  <figure class="item-wrap">
    <nuxt-img
      :src="portfolioImageSource"
      :alt="caption"
      provider="imagekit"
      width="500"
      height="300"
      loading="lazy"
      class="portfolio-img"
    />
    <figcaption>
      <div class="overlay">
        <div class="portfolio-item-meta">
          <h3>{{ caption }}</h3>
          <base-button
            type="button"
            label="View Project"
            @click="handleLightBoxOpen"
            @keydown.enter="handleLightBoxOpen"
          >
            <template #icon>
              <font-awesome icon="fa-solid fa-eye" />
            </template>
            <template #default> View Project </template>
          </base-button>
        </div>
      </div>
    </figcaption>
  </figure>
</template>

<script setup>
  import BaseButton from './BaseButton.vue';

  const props = defineProps({
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['handleLightBoxSlide']);

  const handleLightBoxOpen = () => {
    emit('handleLightBoxSlide');
  };

  const { endPointDir } = useRuntimeConfig().public;

  const portfolioImageSource = computed(() => {
    return `${endPointDir}${props.image}`;
  });
</script>

<style lang="css" scoped>
  .portfolio-item .item-wrap {
    background: #fff;
    overflow: hidden;
    position: relative;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .portfolio-img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -webkit-filter: brightness(1);
    filter: brightness(1);
    border-radius: 3px;
    border-width: 25px;
    border-style: solid;
    vertical-align: middle;
    -o-border-image: url('https://images.eahassan.com/portfolio/frame.png') 150
      round repeat;
    border-image: url('https://images.eahassan.com/portfolio/frame.png') 150
      round repeat;
  }
  .portfolio-item .item-wrap .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -moz-opacity: 0;
    -webkit-transition: opacity 0.3s ease-in-out;
    transition: opacity 0.3s ease-in-out;
    background: url('https://images.eahassan.com/portfolio/overlay-bg.png')
      repeat;
  }
  .portfolio-item .portfolio-item-meta {
    position: relative;
    padding: 1.125rem;
  }
  .portfolio-item .portfolio-item-meta h3 {
    font:
      normal bold 0.875rem/1.3 'Open Sans',
      sans-serif;
    text-align: center;
    color: #fff;
  }
  .portfolio-item:hover .overlay {
    opacity: 1;
    -moz-opacity: 1;
  }
  .portfolio-item-meta button {
    position: absolute;
    top: 300%;
    left: 35%;
  }

  @media only screen and (max-width: 1024px) {
    .portfolio-item-meta button {
      top: 260%;
      left: 32%;
    }
  }

  @media only screen and (max-width: 900px) {
    .portfolio-item-meta button {
      display: none;
    }
  }

  @media only screen and (max-width: 767px) {
    .portfolio-item-meta button {
      display: inline-block;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    .portfolio-item-meta button {
      top: 230%;
      left: 30%;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .portfolio-item-meta button {
      top: 165%;
      left: 25%;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .portfolio-item .item-wrap {
      -webkit-transition: none;
      transition: none;
    }
    .portfolio-item .item-wrap .overlay {
      -webkit-transition: none;
      transition: none;
    }
  }
</style>
