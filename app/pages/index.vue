<template>
  <div>
    <Teleport v-if="show" to="#teleports">
      <transition name="fade">
        <lazy-base-modal
          varaint="custom"
          :modelValue="show"
          :title="developer.contact.title"
          :description="developer.contact.message"
          @update:modelValue="displayModal"
          @close-modal="closeModal"
        >
          <template #default>
            <address class="inline-block italic">
              <nav
                class="contact-modal-info"
                aria-label="Contact information links"
              >
                <a
                  :href="developer.cellPhoneTo"
                  class="contact-modal-link"
                  aria-label="Cellphone"
                >
                  <font-awesome
                    icon="fa-solid fa-phone"
                    :class="{ 'd-none': isMobile }"
                  />
                  <span
                    class="divider mx-0.5 md:mx-1"
                    :class="{ 'd-none': isMobile }"
                  />
                  {{ developer.cellPhone }}
                </a>
                <a
                  :href="developer.mailTo"
                  class="contact-modal-link"
                  aria-label="E-Mail"
                >
                  <font-awesome
                    icon="fa-solid fa-envelope"
                    :class="{ 'd-none': isMobile }"
                  />
                  <span
                    class="divider mx-0.5 md:mx-1"
                    :class="{ 'd-none': isMobile }"
                  />{{ developer.email }}
                </a>
              </nav>
            </address>
            <div>
              <lazy-base-button
                ref="interestButton"
                label="Contact me if interested in hiring me"
                @click="incrementStepCounter"
                @keydown.enter="incrementStepCounter"
              >
                <template #default>
                  {{ interestedButtonText }}
                </template>
              </lazy-base-button>
            </div>
          </template>
        </lazy-base-modal>
      </transition>
    </Teleport>

    <dev-only>
      <Teleport v-if="currentStep === 1" to="#teleports">
        <keep-alive>
          <transition name="fade">
            <lazy-base-modal
              variant="custom"
              :modelValue="currentStep === 1"
              title="E-Mail Contact"
              description="Send me an E-Mail"
              size="large"
              @close-modal="closeFormModal"
              @update-modelValue="modelValue = currentStep === 1"
            >
              <template #actions>
                <lazy-base-button
                  variant="btn-back"
                  label="Back to previous step"
                  @click="decrementStepCounter"
                  v-focus
                >
                  <template #icon>
                    <font-awesome icon="fa-solid fa-arrow-left" />
                  </template>
                </lazy-base-button>
                <lazy-base-button
                  variant="btn-close"
                  class="reset"
                  label="Close"
                  @click="closeModal"
                  @keydown.enter="closeModal"
                >
                  <template #icon>
                    <font-awesome icon="fa-solid fa-xmark" />
                  </template>
                </lazy-base-button>
              </template>
              <template #default>
                <form @submit.prevent="handleSendEmail" autocomplete="on">
                  <div class="form-control">
                    <label class="form-control-label" :for="nameId"
                      >Name:
                      <input
                        :id="nameId"
                        v-model="email.name"
                        type="text"
                        placeholder="Enter your Name"
                      />
                    </label>
                  </div>
                  <div class="form-control">
                    <label class="form-control-label" :for="emailId"
                      >E-Mail:
                      <input
                        :id="emailId"
                        v-model="email.email"
                        type="email"
                        placeholder="Enter your E-Mail"
                      />
                    </label>
                  </div>
                  <div class="form-control">
                    <label class="form-control-label" :for="subjectId">
                      Subject:
                      <input
                        :id="subjectId"
                        v-model="email.subject"
                        type="text"
                        placeholder="Enter a Subject"
                      />
                    </label>
                  </div>
                  <div class="form-control">
                    <lazy-base-select
                      v-model="email.interest"
                      show-label
                      label="Interested in?"
                      description="Services that you are interested in."
                      :choices="serviceNames"
                      @update:model-value="modelValue = email.interest"
                    />
                  </div>
                  <div class="form-control">
                    <label class="form-control-label" :for="messageId">
                      Message:
                      <textarea
                        :id="messageId"
                        ref="textarea"
                        v-model="input"
                        class="resize-none"
                        placeholder="Enter your Message"
                      />
                    </label>
                  </div>

                  <div class="form-control">
                    <lazy-nuxt-turnstile v-model="turnstile" />
                  </div>
                  <div>
                    <lazy-base-loader v-if="hasSentEmail" type="status" />
                    <p v-if="!displayAlert && !hasSentEmail">
                      Error occurred trying to send E-Mail!
                    </p>
                    <lazy-base-button label="Send Email!" type="submit">
                      <template #icon>
                        <font-awesome icon="fa-solid fa-envelope" />
                      </template>
                      <template #default> Send! </template>
                    </lazy-base-button>
                  </div>
                </form>
              </template>
            </lazy-base-modal>
          </transition>
        </keep-alive>
      </Teleport>
    </dev-only>

    <dev-only>
      <Teleport v-if="displayAlert && !hasSentEmail" to="#teleports">
        <transition name="come-in">
          <lazy-base-alert
            :display="displayAlert && !hasSentEmail"
            variant="success"
            @close-alert="dismissSuccessEmailAlert"
          >
            <template #default>
              <strong>
                <span class="mr">
                  <font-awesome icon="fa-solid fa-envelope" />
                </span>
                E-Mail Sent Successfully!
              </strong>
            </template>
          </lazy-base-alert>
        </transition>
      </Teleport>
    </dev-only>

    <dev-only>
      <Teleport v-if="!displayAlert && !!hasSentEmail" to="#teleports">
        <transition name="come-in">
          <lazy-base-alert
            :display="!displayAlert && !!hasSentEmail"
            variant="error"
            @close-alert="closeEmailFailureAlert"
          >
            <template #default>
              <strong>
                <span class="mr">
                  <font-awesome icon="fa-solid fa-xmark" />
                </span>
                E-Mail Failed To Send!
              </strong>
            </template>
          </lazy-base-alert>
        </transition>
      </Teleport>
    </dev-only>

    <about-me :person="developer" />
    <my-resume :experiences="workExperience" :education :skills :goals />
    <my-services :services />
    <my-portfolio :projects="favoriteProjects" />
    <base-button
      variant="btn-cta"
      label="Contact Me now!"
      @click="displayModal"
      @keydown.space="displayModal"
    >
      <template #icon>
        <font-awesome icon="fa-solid fa-handshake" />
      </template>
      <template v-if="!isMobile" #default>
        <span>Contact Me</span>
      </template>
    </base-button>

    <!--
    <u-button
      label="Show toast!"
      color="neutral"
      variant="outline"
      @click="handleOffLineToastMessage"
    ></u-button> 

     <u-button
      label="Reset token in template"
      color="neutral"
      variant="outline"
      @click="turnstile?.reset()"
    ></u-button>

    <u-button
      label="Reset token from handler"
      color="neutral"
      variant="outline"
      @click="reset()"
    ></u-button>

    <u-button
      label="Validate"
      color="neutral"
      variant="outline"
      @click="handleValidateTurnstile"
    ></u-button> -->
  </div>
</template>

<script setup lang="ts">
  import resumeData from '@/assets/data/resume.json';
  import { usePortfolioStore } from '../../stores/usePortfolioStore';

  const store = usePortfolioStore();

  const { favoriteProjects } = storeToRefs(store);

  import {
    useElementHover,
    useMediaQuery,
    useTextareaAutosize,
  } from '@vueuse/core';

  import AboutMe from '@/components/AboutMe.vue';

  import MyResume from '@/components/MyResume.vue';

  import MyPortfolio from '@/components/MyPortfolio.vue';

  import MyServices from '@/components/MyServices.vue';

  import BaseButton from '@/components/BaseButton.vue';

  const { developer, education, workExperience, skills, services, goals } =
    resumeData;

  definePageMeta({
    name: 'Home',
    layout: 'default',
    depth: 1,
    keepalive: true,
  });

  const turnstile = ref(null);

  const reset = () => {
    turnstile.value?.reset();
  };

  const handleValidateTurnstile = async () => {
    await $fetch('/api/validateTurnstile', {
      method: 'POST',
      body: { token: turnstile.value },
    });
  };

  if (!favoriteProjects.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Project Data Failed To Load',
      fatal: true,
    });
  }

  onMounted(() => {
    useHead({
      meta: [
        {
          name: 'keywords',
          content:
            'Evan Hassan, Web Developer, IT Specialist, IT Solutions, For Hire, Bloomfield Hills, Michigan',
        },
        // { name: 'description', content: '', },
        // { property: 'og:description', content: '',  },
      ],
    });

    //       <meta property="og:image" content="https://images.esacredheart.org/sacred-heart-logo.jpg" />
    //       <meta property="og:image:width" content="1200" />
    //       <meta property="og:image:height" content="630" />
  });

  // useScriptCloudflareTurnstile({});

  // const turnstile = ref(null);
  // const theme = useState('color-mode');
  // const language = useState('locale');
  const show = ref(false);
  const currentStep = ref(0);

  const email = ref({
    name: '',
    email: '',
    subject: '',
    interest: '',
    message: '',
    token: null,
  });

  const serviceNames = services.map(service => service.name);

  const { textarea, input } = useTextareaAutosize();
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  const resetTurnstileCaptcha = () => {
    turnstile.value?.reset();
  };

  const hasSentEmail = ref(false);
  const displayAlert = ref(false);
  const showError = ref(false);
  const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 480px)');
  const interestButton = ref(null);
  const isHovered = useElementHover(interestButton);
  const interestedButtonText = computed(() => {
    return isHovered.value ? 'Contact me!' : 'Interested ?';
  });

  const displayModal = () => {
    show.value = true;
  };

  const closeModal = () => {
    show.value = false;
  };

  const closeFormModal = () => {
    currentStep.value = 0;
  };

  const incrementStepCounter = () => {
    currentStep.value++;
  };

  const decrementStepCounter = () => {
    if (currentStep.value < 1) {
      currentStep.value = 0;
    } else {
      currentStep.value--;
    }
  };

  const handleSendEmail = async () => {
    setTimeout(async () => {
      const currentEmail = {
        name: email.value.name,
        email: email.value.email,
        subject: email.value.subject,
        message: email.value.message,
      };

      const tokenOptions = {
        token: email.value.token,
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(currentEmail),
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      try {
        hasSentEmail.value = true;
        await $fetch('/api/mail', options);
        hasSentEmail.value = false;
        email.value.name = '';
        email.value.email = '';
        email.value.subject = '';
        email.value.message = '';
        // resetTurnstileCaptcha();
        // token.value = null;
        currentStep.value = 0;
        show.value = false;
        displayAlert.value = true;
      } catch (error) {
        throw new Error('Failed to send E-Mail!', error);
      } finally {
        show.value = false;
        currentStep.value = 0;
      }
    }, 1500);
  };

  const dismissSuccessEmailAlert = () => {
    displayAlert.value = false;
  };
  const closeEmailFailureAlert = () => {
    showError.value = false;
  };
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';
  .contact-modal-icon {
    font-size: 1.25rem;
  }

  .contact-modal-info {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 1.75rem;
    gap: 0.625rem;
  }

  .contact-modal-info .contact-modal-link {
    @apply block rounded-[10px] bg-tertiary p-4 text-[0.875rem] font-bold text-dark md:text-base;
  }

  .contact-modal-info .contact-modal-link:hover {
    @apply bg-dark text-[#98afc7];
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(-2000px) scale(0.5);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateY(0), scale(1);
  }

  .fade-enter-active {
    transition:
      opacity,
      transform 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  .fade-leave-from {
    opacity: 1;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .form-control {
    position: relative;
    margin: 1rem 2rem;
  }

  textarea {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  textarea::-webkit-scrollbar {
    display: none;
  }

  /* .form-control-label {
    position: absolute;
    top: 0;
    left: 2%;
  } */

  .fade-leave-active {
    transition: opacity 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  .come-in-active,
  .come-in-active {
    transition: opacity 0.5s ease;
    transform: translateX(0);
  }

  .come-in-enter-from,
  .come-in-leave-to {
    opacity: 0;
    transform: translateX(-10000px);
  }

  @media only screen and (max-width: 960px) {
    .contact-modal-info {
      flex-direction: column;
      flex-wrap: wrap;
    }
  }
  @media only screen and (max-width: 768px) {
    .contact-modal-title {
      font-size: 2rem;
      transform: none;
    }
  }
  @media only screen and (max-width: 700px) {
    .contact-modal-title {
      font-size: 1.5rem;
    }
    .contact-modal-desc {
      font-size: 1rem;
      margin-bottom: 1.25rem;
    }
  }
  @media only screen and (min-width: 320px) and (max-width: 480px) {
  }
</style>
