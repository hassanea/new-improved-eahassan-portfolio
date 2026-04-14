/* useColorMode is a custom composable for Nuxt 3 and Vue 3 that assists with managing a user's preferred color scheme (mode) reactively.
   Developed by: Evan Hassan | Version: v1.0
*/

import { computed, watch } from 'vue';
import { useEventListener, useSupported } from '@vueuse/core';
// setModeToStorage sets and stores the current color mode to localStorage.
// toggleClass adds the current color mode class.
// removeClass removes the current color mode class.
import { getModeFromStorage, setModeToStorage, toggleClass, removeClass } from '@/utils';

export const useColorMode = () => {

  // reactive ref variable that takes a callback and checks to see if matchMedia is supported and available on Vue component mount.
  const isSupported = useSupported(() => window && 'matchMedia' in window);

  if(!isSupported.value) {
    return 'window.matchMedia is NOT SUPPORTED in your current browser!';
  }

  // colorMode global state that will be hydrated and preserved under SSR with the key of 'color-mode'
  const colorMode = useState('color-mode', () => '');

  // isToggled global state that will be hydrated and preserved under SSR with the key of 'color-switch' 
  const isToggled = useState('color-switch', () => true);

  const hasColorModeInStorage = getModeFromStorage('localStorage' ,'color-mode');

  const darkMode =
  window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

const lightMode =
  window?.matchMedia && window.matchMedia('prefers-color-scheme: light)');

  if(hasColorModeInStorage === 'dark' || !('color-mode' in window?.localStorage) && (darkMode.matches)) {
    colorMode.value = 'dark';
    setModeToStorage('localStorage', 'color-mode', colorMode.value);
  } else {
    // @ts-ignore
    colorMode.value = hasColorModeInStorage;
  }

  const colorOption = computed(() => {
    return colorMode.value === 'dark'
    ? darkMode
    : lightMode;
  });

  const setColorSwitchIcon = computed(() => {
    if (!colorMode.value) return '';
    else return colorMode.value === 'dark'
        ? 'fa-solid fa-moon'
        : 'fa-solid fa-sun';
  });

  const setColorSwitchLabel = computed(() => {
    if (!colorMode.value) return '';
    else return `Toggle ${colorMode.value === 'dark' ? 'Light' : 'Dark'} Mode`;
  });

  const html = window?.document && document?.documentElement;

  // setColorTheme determines what color scheme is matched, sets the reactive colorMode variable, and toggles the color mode class.
  const setColorTheme = (e: MediaQueryListEvent | MediaQueryList) => {
    // @ts-ignore
    const currentColorMode = window?.matchMedia && e.matches ? 'dark' : 'light';
    colorMode.value = currentColorMode;
    removeClass(html, (currentColorMode === 'dark') ? 'light' : 'dark');
    toggleClass(html, currentColorMode);
  };

  // colorSchemeHandler is a event handler function executes a change event anytime the color scheme changes.
  const colorSchemeHandler = useEventListener(darkMode, 'change', setColorTheme, { passive: true });

  // handleColorThemeChange function performs toggle switch state change, toggle light / dark classes, and calls setColorTheme to update color scheme.
  const handleColorThemeChange = function () {
    isToggled.value = !isToggled.value;
    if (html.classList.contains('dark')) {
      setColorTheme(lightMode);
    } else {
      setColorTheme(darkMode);
    }
  };

// Sets up an watcher to run anytime when colorMode's value is changed then calls setColorModeToStorage to set and update the color scheme to localStorage.
const unWatchColor = watch(
  colorMode,
  value => {
    return value === 'dark'
      ? setModeToStorage('localStorage', 'color-mode', 'dark')
      : setModeToStorage('localStorage', 'color-mode', 'light');
  },
);

  return {
    colorMode,
    isToggled,
    colorOption,
    setColorSwitchIcon,
    setColorSwitchLabel,
    setColorTheme,
    toggleClass,
    removeClass,
    colorSchemeHandler,
    handleColorThemeChange,
    unWatchColor,
  };
};
