<template>
  <div
    :class="{
      horizontal: orientation === 'horizontal',
      vertical: orientation === 'vertical',
    }"
    class="tab-wrap"
  >
    <ul
      :aria-label="label"
      :class="{
        horizontal: orientation === 'horizontal',
        vertical: orientation === 'vertical',
      }"
      class="tab-list"
      role="tablist"
    >
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        class="tab-item"
        role="presentation"
      >
        <base-tab-button
          :id="tab.id"
          :key="tab.title"
          :is-active="activeTab === index"
          :aria-controls="tab.paneId"
          @click="handleTabChange(index)"
          @keydown="handleTabChange(index)"
        >
          <template #default>
            <span class="tab-button-icon"
              ><font-awesome :icon="tab.icon" />
            </span>
            {{ tab.title }}
          </template>
        </base-tab-button>
      </li>
    </ul>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import BaseTabButton from './BaseTabButton.vue';

  defineOptions({
    name: 'BaseTabs',
  });

  const props = defineProps({
    orientation: {
      type: String,
      required: false,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].includes(value);
      },
    },
    label: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: Number,
      required: true,
      default: 0,
    },
  });

  const emit = defineEmits(['handle-tab-change']);
  const handleTabChange = index => {
    emit('handle-tab-change', index);
  };
</script>

<style lang="css" scoped>
  .tab-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .tab-wrap.horizontal {
    flex-direction: column;
  }

  .tab-wrap.vertical {
    flex-direction: row;
  }

  .tab-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  .tab-list.horizontal {
    flex-direction: row;
    flex: 0;
  }

  .tab-list.vertical {
    flex-direction: column;
    align-items: center;
    flex: 1 0 50%;
  }

  .tab-list .tab-item {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tab-list ~ .tab-content {
    width: 100%;
    height: 100%;
    max-width: 65rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    border-radius: 10px 10px 5px 5px;
    padding: 2.25rem;
    box-shadow: 0 0 6px #474e50;
    background: #b2c4c8;
    margin: 0 auto;
  }

  .tab-button-icon {
    width: 1.0625rem;
    height: 1.0625rem;
    font-size: 1.0625rem;
    line-height: 1.0625rem;
    display: inline-block;
    vertical-align: text-top;
    margin: 0 0.6rem;
  }

  @media only screen and (max-width: 767px) {
    .tab-wrap {
      flex-direction: column;
      flex-wrap: wrap;
    }

    .tab-list.horizontal {
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .tab-list ~ .tab-content {
      box-shadow: 0 0 4px #474e50;
      padding: 1.75rem;
      border-radius: 10px 0;
      align-items: center;
      justify-content: center;
    }
  }
</style>
