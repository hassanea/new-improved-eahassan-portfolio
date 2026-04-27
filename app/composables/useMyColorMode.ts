/* useMyColorModeis a custom composable for Nuxt 3 and Vue 3 that assists with managing a user's preferred color scheme (mode) reactively.
   Developed by: Evan Hassan | Version: v1.0 */

import { computed, onMounted, onUnmounted, toValue, watch } from 'vue';
import { useMediaQuery, usePreferredDark, useSupported } from '@vueuse/core';
import { getModeFromStorage, setModeToStorage } from '@/utils';
// getModeFromStorage retrieves the current color mode from localStorage if it exists.
// setModeToStorage sets and stores the current color mode to localStorage.

export const useMyColorMode = (
  fallback: string = 'dark',
  storageOption: string = 'localStorage',
) => {
  // reactive ref variable that takes a callback and checks to see if matchMedia is supported and available on Vue component mount.
  const isSupported = useSupported(
    () =>
      window &&
      'matchMedia' in window &&
      window.matchMedia('(prefers-color-scheme: dark)'),
  );

  if (!isSupported.value) {
    return 'window.matchMedia is NOT SUPPORTED in your current browser!';
  }

  // colorMode global state that will be hydrated, preserved during SSR, and become a shared state across multiple components under the key of 'color-mode'
  const colorMode = useState('color-mode', () => '');

  // Dark Mode Reactive Media Query: (prefers-color-scheme: dark)
  const darkMode = usePreferredDark();
  // Light Mode Reactive Media Query: (prefers-color-scheme: light)
  const lightMode = useMediaQuery('(prefers-color-scheme: light)');

  // isDarkMode global state that will be hydrated and preserved during SSR with the key of 'is-dark-mode'
  // • toValue(value | ref | computed)
  // -is reactivity utility provided by Vue that normalizes values / refs / getters to values.
  // -This is similar to unref(), except that it also normalizes getters. If the argument is a getter, it will be invoked and its return value will be returned.
  // -This can be used in Composables to normalize an argument that can be either a value, a ref, or a getter.

  const isDarkMode = useState('is-dark-mode', () => toValue(darkMode));
  const isLightMode = useState('is-light-mode', () => toValue(lightMode));

  onMounted(() => {
    //  hasColorModeInStorage stores the result of calling getModeFromStorage by retrieving the color mode from localStorage if it exists otherwise, returns null.
    const hasColorModeInStorage = getModeFromStorage(
      storageOption,
      'color-mode',
    );

    // If there is a color mode that is strictly equal to dark or there is no color mode in localStorage and if dark mode matches the preferred color scheme or set system color scheme / auto to dark mode.
    // @ts-ignore
    if (
      hasColorModeInStorage === fallback ||
      (!('color-mode' in window[`${storageOption}`]) &&
        (isDarkMode.value || isLightMode.value))
    ) {
      colorMode.value = fallback;
      setModeToStorage(storageOption, 'color-mode', colorMode.value);
    } else {
      // @ts-ignore
      colorMode.value = hasColorModeInStorage;
    }
  });

  // Color mode Switch Icon
  const setColorSwitchIcon = computed(() => {
    return colorMode.value === 'dark'
      ? 'fa-solid fa-moon-stars'
      : 'fa-solid fa-sun';
  });

  // Color mode Switch Label
  const setColorSwitchLabel = computed(() => {
    return `Toggle ${colorMode.value === 'dark' ? 'Light' : 'Dark'} Mode`;
  });

  // handleColorThemeChange function performs the toggle switch state change and light / dark classes.
  const handleColorThemeChange = function () {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
      colorMode.value = 'dark';
    } else {
      colorMode.value = 'light';
    }
  };

  // Sets up an watcher to run anytime when colorMode's value or isDarkMode's value is changed then calls setColorModeToStorage to set and update the color scheme to localStorage.
  const unWatchColor = watch([colorMode, isDarkMode], values => {
    return values[0] === 'dark' && values[1]
      ? setModeToStorage(storageOption, 'color-mode', 'dark')
      : setModeToStorage(storageOption, 'color-mode', 'light');
  });

  onUnmounted(() => {
    unWatchColor();
  });

  return {
    colorMode,
    setColorSwitchIcon,
    setColorSwitchLabel,
    handleColorThemeChange,
  };
};
