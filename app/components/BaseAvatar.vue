<template>
  <nuxt-img
    :src
    :alt
    provider="imagekit"
    class="profile-pic"
    :width="size.width"
    :height="size.height"
    loading="lazy"
  />
</template>

<script setup lang="ts">
  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: "Evan Hassan's profile pic",
    },
    size: {
      type: Object,
      required: false,
      default: () => {
        return { width: 120, height: 120 };
      },
    },
  });
</script>

<style lang="css" scoped>
  .dark .profile-pic {
    filter: contrast(0.9) brightness(0.9);
  }

  .profile-pic {
    display: inline-block;
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 100%;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .profile-pic:hover {
    border-width: 4px;
    border-style: solid;
    -o-border-image: linear-gradient(
        to top,
        #3ab5b0 0%,
        #3d99be 31%,
        #56317a 100%
      )
      1;
    border-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(#3ab5b0),
        color-stop(31%, #3d99be),
        to(#56317a)
      )
      1;
    border-image: linear-gradient(to top, #3ab5b0 0%, #3d99be 31%, #56317a 100%)
      1;
    background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0, #3ab5b0),
      color-stop(31%, #3d99be),
      to(#56317a)
    );
    background: linear-gradient(to top, #3ab5b0 0, #3d99be 31%, #56317a 100%);
    border-radius: 100%;
  }

  @media only screen and (max-width: 900px) {
    .about-section .profile-pic {
      width: 7.125rem;
      height: 7.125rem;
      margin-left: 0.75rem;
    }
  }

  @media only screen and (max-width: 767px) {
    .profile-pic {
      width: 6.25rem;
      height: 6.25rem;
      margin: 0 0 1rem 0;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .about-section .profile-pic {
      -webkit-transition: none;
      transition: none;
    }
  }
</style>
