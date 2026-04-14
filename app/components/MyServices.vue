<template>
  <base-section
    id="service"
    class="bg-light px-0 py-5 text-light md:p-8 lg:p-10 xl:p-12 2xl:p-12.5 dark:bg-secondary"
  >
    <template #default>
      <div class="grid h-auto w-full grid-cols-1">
        <h2
          class="text-heading my-3 text-center font-sans text-[1.375rem] leading-normal font-bold not-italic md:my-4 md:text-2xl lg:my-5 dark:text-light"
        >
          My Services:
        </h2>
        <ul
          class="grid h-auto w-full grid-cols-1 place-content-center place-items-center gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3"
        >
          <base-service-card
            v-for="service in services"
            :key="service.name.toLowerCase()"
            :service
          />
        </ul>
      </div>
    </template>
  </base-section>
</template>

<script setup>
  import BaseSection from '@/components/BaseSection.vue';
  import BaseServiceCard from '@/components/BaseServiceCard.vue';
  const props = defineProps({
    services: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  });
</script>
