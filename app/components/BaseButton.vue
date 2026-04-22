<template>
  <button :type="type" :aria-label="label" :class="buttonClasses">
    <span
      v-if="$slots.icon"
      :class="{ 'mr-2 inline-block align-middle': $slots.default }"
    >
      <slot name="icon" />
    </span>
    <slot class="inline-block align-middle" v-if="$slots.default">
      {{ label }}
    </slot>
  </button>
</template>

<script setup>
  defineOptions({
    name: 'BaseButton',
  });
  const props = defineProps({
    type: {
      type: String,
      required: false,
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].includes(value);
      },
    },
    variant: {
      type: String,
      required: false,
      default: 'btn',
    },
    label: {
      type: String,
      required: true,
    },
  });

  const { type, variant, label } = props;

  const buttonClasses = computed(() => {
    return {
      btn: variant === 'btn',
      'btn more': variant === 'btn-more',
      'btn no-mg': variant === 'btn-no-mg',
      'btn media': variant === 'btn-media',
      'btn-cta': variant === 'btn-cta',
      'btn-close': variant === 'btn-close',
      'btn btn-back': variant === 'btn-back',
      'btn-mobile-nav': variant === 'btn-mobile-nav',
      'btn-lightbox': variant === 'btn-lightbox',
      'btn-toolbar': variant === 'btn-toolbar',
    };
  });
</script>

<style lang="css">
  @import '../../app/assets/css/main.css';
  .btn {
    height: auto;
    font:
      normal bolder 1rem/1.5 Roboto,
      sans-serif;
    text-transform: capitalize;
    background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(30%, #2c4e6d),
      to(#330867)
    );
    background: linear-gradient(to top, #2c4e6d 30%, #330867 100%);
    color: #fff;
    padding: 1rem 1.5rem;
    @apply border-2 border-solid border-quaternary;
    border-radius: 8px 16px;
    cursor: pointer;
    margin-top: 1.125rem;
    -webkit-transition: all 0.6s cubic-bezier(1, -0.62, 0, -0.2);
    transition: all 0.6s cubic-bezier(1, -0.62, 0, -0.2);
  }

  .btn.no-mg {
    margin-top: 0;
    width: 6.25rem;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  .btn.more {
    padding: 1.5rem;
  }

  .btn.media {
    border-radius: 50%;
  }

  .btn:hover {
    background: #fff;
    color: #2c4e6d;
    opacity: 0.8;
  }

  .btn:active {
    opacity: 1;
    -webkit-filter: drop-shadow(2px 4px #aaa);
    filter: drop-shadow(2px 4px #aaa);
  }

  .btn:focus {
    outline: 0;
    border: 3.5px double #23ce6b;
  }
</style>

<style lang="css" scoped>
  @import '../../app/assets/css/main.css';
  .btn-cta {
    @apply fixed right-[1%] bottom-[1%] z-999 mx-auto my-0 inline-block h-14 w-40 cursor-pointer  rounded-[30px] border-0 bg-tertiary px-3 py-4 align-middle font-bold hover:bg-[#a7c3db] focus:bg-[#a7c3db];

    position: fixed;
    bottom: 1%;
    right: 1%;
    width: 10rem;
    height: 3.5rem;
    padding: 1rem 0.75rem;
    border: 0;
    border-radius: 30px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 auto;
    cursor: pointer;
    background: #6d9bc3;
    font-weight: bold;
    z-index: 999;
    transform: translate(-1%, -1%);
    transition: all 0.6s cubic-bezier(1, -0.62, 0, -0.2);
  }

  .btn-cta:hover,
  .btn-cta:focus {
    background: #a7c3db;
  }

  .btn-cta:active {
    @apply shadow-dark;
  }

  .btn-close {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 0;
    right: 1%;
    transform: translateX(0, -1%);
    font-size: 2rem;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-radius: 50%;
    margin: 0.5rem 0.25rem 0.5rem 0;
  }

  .btn-close:focus {
    @apply border-2 border-dotted border-dark outline-0;
  }

  .btn-close.reset {
    position: static;
    inset: 0;
    transform: none;
  }

  .btn-mobile-nav {
    display: inline-block;
    position: absolute;
    top: 10%;
    right: 1%;
    z-index: 1026;
    vertical-align: middle;
    width: 3rem;
    height: 3rem;
    margin: 1rem 0;
    padding: 0.5rem;
    border: 2px solid #b8390e;
    border-radius: 100%;
    cursor: pointer;
    -webkit-transition: all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition: all 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    @apply bg-primary text-light;
  }

  .btn-mobile-nav.active {
    left: 1%;
  }
  .btn-mobile-nav:hover {
    @apply bg-dark text-primary;
  }
  .btn-mobile-nav:active {
    -webkit-box-shadow: 4px 4px 6px #fff599;
    box-shadow: 4px 4px 6px #fff599;
  }

  .btn-mobile-nav:focus {
    outline: 0;
    background: #b3ffff;
    @apply text-primary;
  }

  .btn-back {
    display: inline-block;
    border-radius: 50%;
    background: transparent;
    font-size: 2rem;
    border: 0;
    @apply text-dark;
  }

  .btn-lightbox {
    @apply inline-block h-[3.3rem] w-[3.3rem] cursor-pointer rounded-[1.5625rem] border-none bg-blue-950 p-[0.875rem] text-xl font-bold text-light hover:bg-light hover:text-blue-950 focus:border-2 focus:border-solid focus:border-amber-600 focus:outline-none active:h-16 active:w-16 active:text-3xl;
  }

  .btn-lightbox svg {
    @apply -translate-x-0 transition-transform duration-[20];
  }

  .btn-lightbox:nth-child(1) svg {
    @apply hover:-translate-x-3;
  }

  .btn-lightbox:nth-child(2) svg {
    @apply hover:translate-x-3;
  }

  .btn-toolbar {
    @apply static z-[2] m-0 inline-block h-12 w-12 cursor-pointer rounded-none border-none bg-transparent p-2 align-middle text-2xl text-light hover:rounded-full hover:bg-blue-800 hover:text-yellow-300 focus:border-t-0 focus:border-r-0 focus:border-b-2 focus:border-l-0 focus:border-solid focus:border-b-amber-500 focus:outline-none active:rounded-full active:bg-blue-950 active:text-yellow-300;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .btn-cta {
      width: 4rem;
      height: 4rem;
      margin: 0 auto;
      border-radius: 100px;
      padding: 1rem;
      font-size: 1.3rem;
      border: 4px double #004659;
    }
    .btn-cta .mr {
      margin: 0;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .btn-mobile-nav,
    .btn,
    .btn-close,
    button,
    input[type='button'],
    input[type='submit'],
    input[type='reset'],
    button[type='button'],
    button[type='submit'],
    button[type='reset'] .btn-back,
    .btn-cta,
    .btn-lightbox,
    .btn-toolbar {
      @apply motion-reduce:transition-none;
    }
  }
</style>
