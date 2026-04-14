<template>
  <div
    @keydown.esc="handleCloseDropDown"
    class="block h-auto w-auto overflow-scroll"
    tabindex="0"
    ref="target"
  >
    <button
      v-if="node === 'button'"
      type="button"
      @click="handleToggleDropDown"
      @keydown.space="handleToggleDropDown"
      :tabindex="dropdownBtnTabIndex"
      :id="dropDownBtnId"
      class="dropdown-toggle focus-visible:border-gold relative m-2 inline-block h-auto w-auto cursor-pointer align-text-bottom focus:outline-0 focus:outline-none focus-visible:rounded-xl focus-visible:border-[3px] focus-visible:outline-0"
      :aria-expanded="dropdownExpanded"
      aria-haspopup="true"
      :aria-controls="toggle ? dropDownMenuId : ''"
    >
      <slot name="icon"> </slot>
      <span
        :class="{ 'not-sr-only lg:not-sr-only': showLabel }"
        class="dropdown-text sr-only"
        >{{ label }}</span
      >
      <font-awesome :icon="arrowIcon" />
    </button>
    <a
      v-else-if="node === 'a'"
      href="#"
      @click="handleToggleDropDown"
      @keydown.space="handleToggleDropDown"
      :tabindex="dropdownBtnTabIndex"
      :id="dropDownBtnId"
      class="dropdown-toggle focus-visible:border-gold relative m-2 inline-block h-auto w-auto align-text-bottom focus:outline-0 focus:outline-none focus-visible:rounded-xl focus-visible:border-[3px] focus-visible:outline-0"
      :aria-expanded="dropdownExpanded"
      aria-haspopup="true"
      :aria-controls="toggle ? dropDownMenuId : ''"
    >
      <slot name="icon"> </slot> <span class="sr-only">{{ label }}</span>
      <font-awesome :icon="arrowIcon" />
    </a>
    <nuxt-link
      v-else
      to="#"
      @click="handleToggleDropDown"
      @keydown.space="handleToggleDropDown"
      :tabindex="dropdownBtnTabIndex"
      :id="dropDownBtnId"
      class="dropdown-toggle focus-visible:border-gold relative m-2 inline-block h-auto w-auto align-text-bottom focus:outline-0 focus:outline-none focus-visible:rounded-xl focus-visible:border-[3px] focus-visible:outline-0"
      :aria-expanded="dropdownExpanded"
      aria-haspopup="true"
      :aria-controls="toggle ? dropDownMenuId : ''"
    >
      <slot name="icon"> </slot> <span class="sr-only">{{ label }}</span>
      <font-awesome :icon="arrowIcon" />
    </nuxt-link>
    <div
      v-if="toggle && links.length === 0"
      :class="dropDownMenuClasses"
      role="menu"
      class="dropdown-menu m-0 rounded bg-light p-3 tracking-normal before:absolute before:z-201 before:block before:max-h-0 before:w-auto before:overflow-scroll before:opacity-0 before:content-none"
      :id="dropDownMenuId"
      :aria-labelledby="dropDownBtnId"
    >
      <slot></slot>
    </div>
    <ul
      v-if="isDropDownMenuWithList"
      :class="dropDownMenuClasses"
      role="menu"
      class="dropdown-menu m-0 rounded bg-[#e5d5d3] p-4 text-center tracking-normal before:absolute before:z-201 before:block before:max-h-0 before:w-auto before:overflow-scroll before:opacity-0 before:content-none"
      :id="dropDownMenuId"
      :aria-labelledby="dropDownBtnId"
    >
      <li
        v-for="{ name, to } in links"
        :key="name"
        role="none"
        class="dropdown-menu-item mb-2"
      >
        <nuxt-link
          v-if="!to.startsWith('https')"
          role="menu-item"
          :to="to"
          class="dropdown-link text-dark hover:bg-[#739eb2]"
        >
          {{ name }}
        </nuxt-link>
        <nuxt-link
          v-else
          role="menu-item"
          :to="to"
          target="_blank"
          class="dropdown-link text-dark hover:bg-[#739eb2]"
        >
          {{ name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { onClickOutside } from '@vueuse/core';

  const target = ref(null);

  defineOptions({
    name: 'BaseDropDownMenu',
  });

  const props = defineProps({
    node: {
      type: String,
      required: false,
      default: 'button',
      validator(value: string) {
        return ['button', 'a', 'nuxt-link'].includes(value);
      },
    },
    label: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: 'down',
      validator(value: string) {
        return ['down', 'up'].includes(value);
      },
    },
    toggle: {
      type: Boolean,
      required: false,
      default: false,
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
    links: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
  });

  const emit = defineEmits(['handleToggle', 'handleClose']);

  const isToggled = ref(false);
  const dropDownBtnId = useId();
  const dropDownMenuId = useId();

  const handleToggleDropDown = () => {
    isToggled.value = !isToggled.value;
    emit('handleToggle', isToggled.value);
  };

  const handleCloseDropDown = () => {
    isToggled.value = false;
    emit('handleClose', isToggled.value);
  };

  onClickOutside(target, handleCloseDropDown);

  const dropdownExpanded = computed(() => {
    return props.toggle ? true : false;
  });

  const dropdownBtnTabIndex = computed(() => {
    return props.toggle ? 0 : -1;
  });

  const arrowIcon = computed(() => {
    return props.toggle ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down';
  });

  const isDropDownMenuWithList = computed(() => {
    return props.toggle && props.links.length > 0;
  });

  const dropDownMenuClasses = computed(() => {
    return {
      'before:top-0 before:left-2 before:max-h-64 before:opacity-100':
        props.toggle && props.variant === 'down',
      'before:bottom-[100%] before:left-0 before:max-h-64 before:opacity-100':
        props.toggle && props.variant === 'up',
    };
  });

  watch(
    () => props.toggle,
    value => {
      isToggled.value = value;
    },
    { immediate: true },
  );
</script>

<style lang="css" scoped>
  .dropdown-menu {
    transition:
      opacity,
      max-height,
      transform 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
</style>
