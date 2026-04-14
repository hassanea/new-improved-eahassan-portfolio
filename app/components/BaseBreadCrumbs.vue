<template>
  <nav
    class="bread-crumbs sticky inset-0 z-201 flex h-auto w-full items-center justify-center rounded-md bg-primary text-center font-sans text-base leading-normal font-normal text-light uppercase not-italic md:h-16 md:w-[50%] lg:justify-start xl:w-[30%]"
    :aria-label="label"
  >
    <ol
      class="bread-crumb-list flex h-auto w-full list-none items-center justify-evenly"
    >
      <template v-for="item in sortedItems" :key="item.path">
        <li
          class="bread-crumb-item mx-3 mt-2.5 mb-0 inline-block p-0.5"
          v-if="item.meta.depth <= currentRouteInfo.depth"
        >
          <nuxt-link
            :to="item.path === currentRouteInfo.path ? '#' : item.path"
            class="bread-crumb-link inline-block rounded-md p-1.5 font-sans font-normal hover:bg-light hover:text-website focus:border-[3px] focus:border-solid focus:border-yellow-500 focus:outline-none active:shadow-md active:shadow-website"
            :class="{
              'rounded-md bg-website p-1.5 font-bold hover:bg-light hover:text-website focus:border-[3px] focus:border-solid focus:border-yellow-500 focus:outline-none active:shadow-website':
                item.path === currentRouteInfo.path,
            }"
            :aria-current="item.path === currentRouteInfo.path ? 'page' : null"
            >{{ item.name }}</nuxt-link
          >
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
  defineOptions({
    name: 'BaseBreadcrumbs',
  });

  const props = defineProps({
    label: {
      type: String,
      required: false,
      default: 'Breadcrumbs',
    },
    items: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  });

  const route = useRoute();
  const currentRouteInfo = ref({
    depth: 0,
    path: '',
  });

  const sortedItems = computed(() => {
    return [...props.items].sort((a, b) => a?.meta?.depth - b?.meta?.depth);
  });

  watch(
    route,
    value => {
      const { matched } = value;
      currentRouteInfo.value.path = matched[0].path;
      currentRouteInfo.value.depth = matched[0].meta.depth;
    },
    { immediate: true },
  );
</script>

<style lang="css" scoped></style>
