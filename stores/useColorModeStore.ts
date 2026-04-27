import { toValue } from 'vue';
import { defineStore, acceptHMRUpdate, skipHydrate } from 'pinia';
import { useMyColorMode } from '../app/composables/useMyColorMode;

export const useColorModeStore = defineStore('colorMode', () => {
  const { colorMode, isDarkMode, isLightMode } = useMyColorMode();

  const colorTheme = ref(toValue(colorMode));
  const isDark = ref(toValue(isDarkMode));
  const isLight = ref(toValue(isLightMode));

  return {
    colorTheme: skipHydrate(colorTheme),
    isDark: skipHydrate(isDark),
    isLight: skipHydrate(isLight),
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useColorModeStore, import.meta.hot));
}
