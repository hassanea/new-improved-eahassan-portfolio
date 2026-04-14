<template>
  <div>
    <label
      :for="selectId"
      class="mx-0 my-3 inline-block text-center font-semibold not-italic"
      :class="selectLabelClasses"
      >{{ label }}</label
    >
    <p v-if="description" class="font sr-only" :id="selectDescId">
      {{ description }}
    </p>
    <div
      class="select-wrapper-content relative after:absolute after:right-[0.9rem] after:bottom-[0.9rem] after:inline-block after:-translate-x-1 after:translate-y-0 after:cursor-pointer after:align-middle after:text-xl after:leading-normal after:text-light"
    >
      <select
        class="pointer-events-auto mx-auto mb-1 block h-16 w-full max-w-[9.4rem] min-w-0 cursor-grab appearance-none rounded-lg bg-secondary p-3 text-center font-sans2 text-[0.94rem] leading-normal font-medium not-italic transition-all duration-100 ease-in-out select-auto read-only:bg-gray-600 hover:bg-selection hover:font-bold hover:text-dark focus:border-4 focus:border-solid focus:border-quaternary focus:outline-none active:bg-selection active:font-bold active:text-dark disabled:pointer-events-none disabled:bg-gray-700 disabled:opacity-75 disabled:select-none"
        :class="selectClasses"
        v-model="selected"
        :name="selectName"
        :aria-describedby="selectDescId"
        :disabled="isDisabled"
        :readonly="isReadOnly"
        :id="selectId"
        :multiple="selectMultiple"
        :size="selectMultipleSize"
      >
        <option value="" disabled="true" class="select-option">
          Please select an option...
        </option>
        <option
          v-for="choice in choices"
          :value="choice"
          :key="`option-${choice.toLowerCase()}`"
          :selected="modelValue === selected"
          class="select-option"
          :class="selectActiveOptionClasses"
        >
          {{ capitalize(choice) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    showLabel: {
      type: Boolean,
      required: false,
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    choices: {
      type: Array,
      required: false,
      default: () => {
        return [];
      },
    },
    selectMultiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    isReadOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
  });
  const emit = defineEmits(['update:modelValue']);

  import capitalize from 'lodash/capitalize';

  const selected = ref('');
  const selectId = useId();
  const selectDescId = useId();

  const handleSelectChange = (value: string) => {
    emit('update:modelValue', value);
  };

  watch(selected, newValue => handleSelectChange(newValue), {
    immediate: true,
  });

  watch(
    () => props.modelValue,
    value => {
      // @ts-ignore
      selected.value = value;
      console.log('fired!');
    },
    { immediate: true },
  );

  const selectName = computed(() => {
    return `select-${selectId}`;
  });

  const selectMultipleSize = computed(() => {
    return props.selectMultiple ? 0 : '';
  });

  const selectClasses = computed(() => {
    return {
      'select-disabled': props.isDisabled,
      'select-read-only': props.isReadOnly,
    };
  });

  const selectActiveOptionClasses = computed(() => {
    return {
      'font-black': props.modelValue === selected.value,
      'font-normal': props.modelValue !== selected.value,
    };
  });

  const selectLabelClasses = computed(() => {
    return { 'sr-only': !props.showLabel, 'not-sr-only': props.showLabel };
  });
</script>

<style lang="css" scoped>
  .select-wrapper-content::after {
    content: '▼';
  }
</style>
