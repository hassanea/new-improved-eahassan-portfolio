<template>
  <base-section
    id="resume"
    :style="{ backgroundImage: `url(${resumeBackgroundImage})` }"
    :class="{ 'bg-img': resumeBackgroundImage }"
  >
    <!-- <article></article> -->
    <base-tabs
      :tabs="tabs"
      :active-tab="selectedTab"
      label="Qualifications"
      @handle-tab-change="handleActivateTab"
    >
      <template #default>
        <base-tab-pane v-show="selectedTab === 0" pane-id="education-pane">
          <template #default>
            <template v-if="Object.keys(education).length > 0">
              <h3 class="resume-title">
                <span class="mr-2">
                  <nuxt-img
                    :src="almaMaterIcon"
                    alt="Oakland University's Icon"
                    provider="imagekit"
                    width="16"
                    height="16"
                    class="ou-icon"
                  />
                </span>
                {{ education.school }}
              </h3>
              <p class="info">
                {{ education.degree.mark }}
                <abbr class="degree" v-tooltip="education.degree.study">{{
                  degreeOfStudyAbbrev
                }}</abbr>
                <span class="mx">
                  <font-awesome icon="fa-solid fa-graduation-cap" /> </span
                ><em class="date">{{ education.graduated }}</em>
              </p>
              <p class="info">
                <span class="mx">
                  <font-awesome icon="fa-solid fa-award" />
                </span>
                {{ education.honors }}
              </p>
              <p class="education-desc">
                {{ education.description }}
              </p>
            </template>
          </template>
        </base-tab-pane>
        <client-only>
          <base-tab-pane v-show="selectedTab === 1" pane-id="work-pane">
            <template #default>
              <template v-if="experiences.length > 0">
                <div
                  v-for="experience in experiences"
                  :key="experience.company"
                  class="work"
                >
                  <h3 class="resume-title">
                    {{ experience.company }}
                  </h3>
                  <p class="info">
                    {{ experience.position }}<span class="divider" />
                    <em class="date">{{ experience.years }}</em>
                  </p>
                  <p class="experience-desc">
                    {{ experience.description }}
                  </p>
                </div>
              </template>
            </template>
          </base-tab-pane>
        </client-only>
        <client-only>
          <base-tab-pane v-show="selectedTab === 2" pane-id="skills-pane">
            <template #default>
              <p class="info">
                Here is my current assessment of IT skillset based upon my
                course projects and work experience.
              </p>
              <template v-if="skills.length > 0">
                <base-progress-bar
                  v-for="skill in skills"
                  :key="skill.name"
                  :label="skill.name"
                  :current-value="skill.level"
                />
              </template>
            </template>
          </base-tab-pane>
        </client-only>

        <client-only>
          <base-tab-pane v-show="selectedTab === 3" pane-id="goals-pane">
            <template #default>
              <h3 class="resume-title">Currently Learning:</h3>
              <base-goal-list>
                <base-goal
                  v-for="item in goals.learning"
                  :key="item.toLowerCase()"
                  :goal="item"
                  variant="goal"
                />
              </base-goal-list>

              <h3 class="resume-title">Currently Working Toward:</h3>
              <base-goal-list>
                <base-goal
                  v-for="cert in goals.certifications"
                  :key="cert.toLowerCase()"
                  :goal="cert"
                  variant="cert"
                />
              </base-goal-list>
            </template>
          </base-tab-pane>
        </client-only>
      </template>
    </base-tabs>
  </base-section>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { handleAbbreviate } from '@/utils';
  import BaseSection from '@/components/BaseSection.vue';
  import BaseTabs from '@/components/BaseTabs.vue';
  import BaseTabPane from '@/components/BaseTabPane.vue';
  import BaseGoalList from '@/components/BaseGoalList.vue';
  import BaseGoal from '@/components/BaseGoal.vue';
  import BaseProgressBar from '@/components/BaseProgressBar.vue';

  defineOptions({
    name: 'MyResume',
  });

  const props = defineProps({
    education: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    experiences: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    skills: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    goals: {
      type: Object,
      required: true,
      default: () => {
        return [];
      },
    },
  });

  const { education } = props;

  const image = useImage();

  const { endPointDir } = useRuntimeConfig().public;

  const selectedTab = ref(0);

  const tabs = [
    { title: 'Edu', icon: 'fa-solid fa-building-columns' },
    { title: 'Work', icon: 'fa-solid fa-briefcase' },
    { title: 'Skills', icon: 'fa-solid fa-bars-progress' },
    { title: 'Goals', icon: 'fa-solid fa-bullseye-pointer' },
  ];

  // map(tab => {
  //   tab.id = `tab-${useId()}`;
  //   tab.paneId = `pane-${tab.title.toLowerCase()}-${useId()}`;
  //   return tab;
  // });

  const handleActivateTab = index => {
    selectedTab.value = index;
  };

  const resumeBackgroundImage = computed(() => {
    const url = image(
      `${endPointDir}resume-bg.jpg`,
      {},
      { provider: 'imagekit' },
    );
    return url;
  });

  const almaMaterIcon = computed(() => {
    return `${endPointDir}/icons/oakland-university-icon.png`;
  });

  const degreeOfStudyAbbrev = computed(() => {
    return handleAbbreviate(education.degree.study);
  });
</script>

<style lang="css" scoped>
  @import '../assets/css/main.css';

  #resume {
    padding: 5.625rem 0 4.5rem 0;
  }

  #resume .resume-title {
    font:
      normal bold 1.5625rem/1.2 'Open Sans',
      sans-serif;
  }

  #resume .info {
    font:
      italic 500 1rem/1.5 Roboto,
      sans-serif;
    color: #000814;
    margin-bottom: 1.125rem;
    margin-top: 0.5625rem;
  }

  #resume .info span {
    margin-right: 0.6rem;
    margin-left: 0.6rem;
  }

  #resume .ou-icon {
    border-radius: 6px;
    display: inline-block;
  }

  #resume .degree {
    @apply border-0 font-extrabold text-dark uppercase not-italic no-underline;
  }

  #resume .date {
    font:
      normal 500 0.9375rem/1.5 Roboto,
      sans-serif;
    margin-top: 0.375rem;
  }

  #resume .education-desc {
    font-weight: 500;
    line-height: 1.9;
  }

  #resume .work:not(.work:last-child) {
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
    border-bottom: 1.5px solid #4f5559;
  }

  @media only screen and (max-width: 768px) {
    #resume {
      padding: 3.6rem 0 2.5rem;
    }
  }
  @media only screen and (max-width: 767px) {
    #resume .info,
    #resume h3 {
      text-align: center;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 930px) and (orientation: landscape) {
    #resume {
      padding: 4rem 0 3rem;
    }
  }
  @media only screen and (min-width: 481px) and (max-width: 768px) and (orientation: landscape) {
    #resume {
      padding: 3.75rem 0 1.875rem;
    }
    #resume .work:not(.work:last-child) {
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    #resume {
      padding: 3.75rem 0 1.875rem;
    }
    #resume .date {
      font-size: 0.9rem;
    }

    #resume .info {
      font-size: 0.9rem;
      margin: 0.25rem 0 1.125rem;
    }
    #resume .education-desc,
    #resume .experience-desc {
      margin-bottom: 1rem;
      line-height: 1.7;
    }
    #resume .work:not(.work:last-child) {
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
    }
  }
</style>
