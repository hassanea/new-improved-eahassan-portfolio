<template>
  <base-section id="portfolio" class="bg-alternative dark:bg-[#A9CBE5]">
    <template #default>
      <div class="row">
        <div class="twelve columns collapsed">
          <h2 class="portfolio-title">Check Out Some of My Creations.</h2>
          <div class="form-control">
            <input
              id="project-filter"
              v-model="projectFilter"
              type="text"
              class="portfolio-project-filter"
              aria-label="Search portfolio projects"
              placeholder="Search Projects..."
            />
            <div v-if="!projectFilter" class="search-icon">
              <font-awesome icon="fa-solid fa-search" />
            </div>
            <base-button
              v-if="projectFilter"
              variant="btn-close"
              class="clear-input"
              label="Clear Input"
              @click="resetProjectFilter"
              @keydown="resetProjectFilter"
            >
              <template #icon>
                <font-awesome icon="fa-solid fa-xmark" />
              </template>
            </base-button>
          </div>
          <div id="portfolio-wrapper" class="grid grid-cols-1 md:grid-cols-2">
            <transition-group name="portfolio">
              <div
                v-for="(project, index) in filterProjects"
                :key="project.id"
                class="columns portfolio-item"
              >
                <portfolio-img
                  :image="project.image"
                  :caption="project.title"
                  @handle-light-box-slide="handleLightboxOnSlide(index)"
                />
              </div>
            </transition-group>
            <p v-if="hasNoResults" class="no-results">No results found!</p>
          </div>

          <div class="slideshow">
            <base-button
              type="button"
              variant="btn-more"
              label="View Slideshow"
              @click="handleLightboxOnSlide(0)"
              @keydown.enter="handleLightboxOnSlide(0)"
            >
              <template #icon>
                <svg
                  version="1.0"
                  focusable="false"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.000000pt"
                  height="16.000000pt"
                  viewBox="0 0 16.000000 16.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)"
                    fill="#fff"
                    stroke="none"
                  >
                    <path
                      d="M20 80 l0 -60 60 0 60 0 0 60 0 60 -60 0 -60 0 0 -60z m80 0 c0 -3
-9 -11 -20 -18 -18 -11 -20 -10 -20 18 0 28 2 29 20 18 11 -7 20 -15 20 -18z"
                    />
                    <path
                      d="M3 80 c0 -30 2 -43 4 -28 2 16 2 40 0 55 -2 16 -4 3 -4 -27z"
                    />
                    <path
                      d="M153 75 c0 -27 2 -38 4 -22 2 15 2 37 0 50 -2 12 -4 0 -4 -28z"
                    />
                  </g>
                </svg>
              </template>
              <template #default> View Slideshow </template>
            </base-button>
          </div>
          <teleport v-if="show" to="#teleports">
            <transition name="come">
              <base-light-box
                v-model="slide"
                :show
                :show-thumb-nails="showThumbs"
                :show-captions="toggleCaptions"
                :images="projects"
                :duration="3500"
                label="Portfolio projects' Lightbox"
                @close-modal="closeLightBox"
                @show-thumbs="handleThumbNailsDisplayed"
                @toggle-captions="handleCaptionsToggle"
                @update-model-value="handleLightboxSlideUpdate"
              />
            </transition>
          </teleport>
        </div>
      </div>
    </template>
  </base-section>
</template>

<script setup>
  import BaseSection from '@/components/BaseSection.vue';
  import PortfolioImg from '@/components/PortfolioImg.vue';
  import BaseButton from '@/components/BaseButton.vue';

  const BaseLightBox = defineAsyncComponent(async () => {
    return await import('@/components/BaseLightBox.vue');
  });

  defineOptions({
    name: 'MyPortfolio',
  });

  const props = defineProps({
    projects: {
      type: Array,
      required: true,
    },
  });

  const { projects } = props;

  const projectFilter = ref('');
  const slide = ref(0);
  const show = ref(false);
  const showThumbs = ref(false);
  const hasNoResults = ref(false);
  const toggleCaptions = ref(true);

  const handleThumbNailsDisplayed = () => {
    showThumbs.value = !showThumbs.value;
  };

  const handleCaptionsToggle = () => {
    toggleCaptions.value = !toggleCaptions.value;
  };

  const handleLightboxOnSlide = index => {
    slide.value = index;
    show.value = !show.value;
  };

  const closeLightBox = () => {
    show.value = false;
  };

  const handleLightboxSlideUpdate = currentSlide => {
    slide.value = currentSlide;
  };

  const resetProjectFilter = () => {
    projectFilter.value = '';
    hasNoResults.value = false;
  };

  const filterProjects = computed(() => {
    if (projects.length > 0 && projectFilter.value) {
      return projects.filter(project => {
        if (
          project.title
            .toLowerCase()
            .includes(projectFilter.value.toLowerCase())
        ) {
          return project;
        }
      });
    } else {
      return projects;
    }
  });

  watch(filterProjects, value => {
    if (value.length === 0) {
      hasNoResults.value = true;
    } else {
      hasNoResults.value = false;
      return;
    }
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .come-enter-active,
  .come-leave-active {
    transition: transform 0.7s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }

  .come-enter-from,
  .come-leave-to {
    transition: transform 0.7s cubic-bezier(0.6, 0.04, 0.98, 0.335);
    transform: scale3d(1.3, 1.3, 1.3);
  }
  #portfolio {
    padding: 5.625rem 0 3.75rem 0;
  }

  #portfolio h2 {
    font:
      normal bolder 1.25rem/1.5 'Open Sans',
      sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 3rem;
    color: #313131;
  }

  #portfolio .form-control {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 auto 2rem;
  }

  #portfolio .portfolio-project-filter {
    display: block;
    width: 100%;
    max-width: 85%;
    margin: 0;
    padding: 0.75rem 1rem;
    height: 3.5rem;
    border-radius: 25px;
    background: #98afc7;
    border: 3px groove #7c9abb;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0.13rem;
    @apply text-dark caret-quinary;
  }

  #portfolio .portfolio-project-filter:hover::placeholder {
    @apply font-normal;
  }

  #portfolio .portfolio-project-filter::placeholder {
    padding-left: 0.75rem;
    @apply font-black;
  }

  #portfolio .portfolio-project-filter:focus {
    border: 3px groove #000814;
    background: #7c9abb;
  }

  .no-results {
    @apply text-center font-sans text-xl leading-normal font-bold not-italic;
  }

  .portfolio-enter-active,
  .portfolio-leave-active {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .portfolio-enter-from,
  .portfolio-leave-to {
    opacity: 0;
    transform: translateY(30px) scale(0.5);
  }

  .search-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 7%;
    right: 7.6%;
    border: 0;
    cursor: pointer;
    border-radius: 50%;
    @apply bg-[#004659] text-light;
  }

  .clear-input {
    top: 0;
    right: 5.55vh;
    transform: translateX(-0.55vh);
    font-size: 1.3rem;
  }

  #portfolio #portfolio-wrapper .columns {
    margin-bottom: 2.25rem;
  }

  .slideshow {
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .slideshow .btn:hover svg {
    @apply bg-secondary;
  }
  .lightbox-caption {
    position: absolute;
    bottom: 220%;
    left: 42%;
    width: 100%;
    height: auto;
    max-width: 25rem;
    margin: 0 auto;
    z-index: 10;
    padding: 2rem;
    border-left: 6px double #396;
    border-right: 6px double #396;
    border-radius: 8px;
    background: #f0fff0;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    @apply text-dark;
  }
  .caption-title {
    font-style: italic;
    font-weight: 700;
    font-size: 1.25rem;
    margin: 1.5rem 0;
  }
  .caption-category {
    font-weight: 600;
    font-size: inherit;
    margin-bottom: 1.125rem;
  }
  .caption-desc {
    font-size: inherit;
    font-weight: 500;
    line-height: 1.8;
    margin-bottom: 1.875rem;
  }
  a.caption-link {
    display: inline-block;
    margin: 0 0.5rem;
    padding: 0.25rem;
    color: #19534f;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

  a.caption-link:hover {
    color: #a8201a;
  }

  @media only screen and (max-width: 1024px) {
    .lightbox-caption {
      bottom: 130%;
      left: 30%;
    }
  }

  @media only screen and (max-width: 768px) {
    .lightbox-caption {
      bottom: 150%;
      left: 25%;
    }
    #portfolio {
      padding: 3.6rem 0 1.875rem;
    }
  }
  @media only screen and (max-width: 767px) {
    .clear-input {
      top: 0;
      right: 3vh;
      transform: translateX(-0.2vh);
      font-size: 1.3rem;
    }
    #portfolio-wrapper .columns {
      margin-bottom: 2.5rem;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 930px) and (orientation: landscape) {
    #portfolio {
      padding: 4rem 0 2.3rem;
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    #portfolio {
      padding: 4rem 0 2.2rem;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    #portfolio {
      padding: 4rem 0 2.2rem;
    }
    #portfolio h2 {
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    a.caption-link {
      -webkit-transition: none;
      transition: none;
    }
  }
</style>
