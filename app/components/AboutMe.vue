<template>
  <base-section id="about" class="about-section bg-[#464656] dark:bg-primary">
    <template #default>
      <div v-if="Object.keys(person).length > 0" class="row">
        <div class="three columns">
          <nuxt-img
            :src="profileImage"
            :alt="profileImageText"
            provider="imagekit"
            class="profile-pic"
            width="120"
            height="120"
            loading="lazy"
          />
        </div>
        <div class="nine columns main-col">
          <h2>{{ person.heading }}</h2>
          <base-speech-bubble>
            <template #default>
              {{ person.bio }}
            </template>
          </base-speech-bubble>
          <div class="row">
            <div class="columns contact-details">
              <h2>Contact Details</h2>
              <p>
                <span class="block">{{ person.name }}</span>

                <span class="block">
                  <nuxt-link
                    :to="person.cellPhoneTo"
                    :aria-label="cellPhoneCaption"
                  >
                    {{ person.cellPhone }}
                  </nuxt-link>
                </span>

                <span class="block">
                  <nuxt-link :to="person.mailTo" :aria-label="emailCaption">
                    {{ person.email }}
                  </nuxt-link>
                </span>

                <span class="my-1 block">
                  <client-only>
                    <nuxt-link
                      to="https://www.codewars.com/users/hassanea"
                      title="My CodeWars"
                      target="_blank"
                      external
                      class="text-light visited:border-2 visited:border-solid visited:border-light hover:border-2 hover:border-solid hover:border-[#ff0] focus:text-[#ff0] focus:outline-none active:border-2 active:border-solid active:border-[#80ffff]"
                    >
                      <img
                        :src="`https://www.codewars.com/users/hassanea/badges/micro?theme=${colorScheme}`"
                        :alt="`${person.name}'s Codewars Profile Badge`"
                        width="120"
                        height="20"
                      />
                    </nuxt-link>
                  </client-only>
                </span>
              </p>
            </div>
            <div v-if="person.resume" class="columns download">
              <p>
                <nuxt-link
                  :href="person.resume.link"
                  :download="person.resume.name"
                  external
                  class="btn"
                  title="Download resumé"
                  label="Download Resumé"
                >
                  <span class="mr">
                    <font-awesome icon="fa-solid fa-download" />
                  </span>
                  Download Resumé
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-section>
</template>

<script setup>
  import BaseSection from './BaseSection.vue';
  import BaseSpeechBubble from './BaseSpeechBubble.vue';

  const colorScheme = useState('color-mode');

  defineOptions({
    name: 'AboutMe',
  });

  const props = defineProps({
    person: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  });

  const { person } = props;

  const { endPointDir } = useRuntimeConfig().public;

  const profileImage = computed(() => {
    if (!person.avatar) return '';
    return `${endPointDir}${person.avatar}`;
  });

  const profileImageText = computed(() => {
    if (!person.name) return '';
    return `${person.name}'s self portrait`;
  });

  const cellPhoneCaption = computed(() => {
    if (!person.name && !person.cellPhone) return '';
    return `${person.name}'s cell phone - ${person.cellPhone}`;
  });

  const emailCaption = computed(() => {
    if (!person.name && !person.email) return '';
    return `${person.name}'s email address - ${person.email}`;
  });
</script>

<style lang="css" scoped>
  .dark .about-section .profile-pic {
    filter: contrast(0.9) brightness(0.9);
  }

  .about-section {
    padding: 6rem 0 4.125rem 0;
    -webkit-transition: all 0.4s cubic-bezier(0.73, -0.18, 0, 1.3);
    transition: all 0.4s cubic-bezier(0.73, -0.18, 0, 1.3);
  }

  .about-section .download .btn {
    margin-top: 1rem;
    border: 3px solid #6cc;
    border-radius: 30px;
    padding: 1.25rem;
    color: #fff;
  }

  .about-section .download .btn:hover {
    background: #fff;
    color: #2c4e6d;
  }
  .about-section .download .btn:active {
    -webkit-box-shadow: 2px 4px 0 #99c1b9;
    box-shadow: 2px 4px 1px #99c1b9;
  }
  .about-section .download .btn:focus {
    outline: 0;
    border: 3.5px double #ff4500;
  }

  .about-section h2 {
    font:
      normal bold 1.375rem/1.4 'Open Sans',
      sans-serif;
    color: #fff;
    margin-bottom: 0.75rem;
  }

  .about-section .profile-pic {
    display: inline-block;
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 100%;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .about-section .profile-pic:hover {
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

  .about-section .contact-details {
    width: 41.66667%;
    color: #fff;
  }

  .about-section .download {
    width: 58.33333%;
    padding-top: 0.375rem;
  }

  .about-section .main-col {
    padding-right: 5%;
  }

  .about-section a,
  a:visited {
    color: #fff;
  }
  .about-section a:focus,
  .about-section a:hover {
    outline: none;
    color: #ff0;
  }
  .about-section a:active {
    color: #80ffff;
  }

  @media only screen and (max-width: 900px) {
    .about-section .profile-pic {
      width: 7.125rem;
      height: 7.125rem;
      margin-left: 0.75rem;
    }
    .about-section .contact-details {
      width: 50%;
    }
    .about-section .download {
      width: 50%;
    }
  }

  @media only screen and (max-width: 768px) {
    .about-section {
      padding: 4rem 0 2.5rem;
    }

    .about-section .download {
      width: 100%;
    }
    .about-section .download .btn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
  }
  @media only screen and (max-width: 767px) {
    .about-section .main-col {
      padding-right: 1.875rem;
    }
    .about-section .profile-pic {
      width: 6.25rem;
      height: 6.25rem;
      margin: 0 0 1rem 0;
    }
  }

  @media only screen and (min-width: 769px) and (max-width: 930px) and (orientation: landscape) {
    .about-section {
      padding: 4.5rem 0 3rem;
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    .about-section {
      padding: 3rem 0;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .about-section {
      padding: 3rem 0;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .about-section,
    .about-section .profile-pic {
      -webkit-transition: none;
      transition: none;
    }
  }
</style>
