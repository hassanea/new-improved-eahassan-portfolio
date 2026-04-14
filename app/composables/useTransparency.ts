import { computed, onMounted, onUnmounted, watch } from 'vue';
import { getModeFromStorage, setModeToStorage } from '@/utils';


export const useTransparency = (fallback: string = 'no-preference', storageOption: string = 'localStorage') => {

  const transparentMode = useState('transparent-mode', () => '');
  const isTransparent = useState('tranparent-switch', () => false);

  onMounted(() => {
  const hasTransparentModeInStorage = getModeFromStorage(storageOption, 'transparent-mode');

  // If there is a color mode that is strictly equal to dark or there is no color mode in localStorage and if dark mode matches the preferred color scheme or set system color scheme / auto to dark mode.
  // @ts-ignore
  if(hasTransparentModeInStorage === fallback || !('transparent-mode' in window[`${storageOption}`])) {
    transparentMode.value = fallback;
    setModeToStorage(storageOption, 'transparent-mode', transparentMode.value);
  } else {
    // @ts-ignore
    transparentMode.value = hasTransparentModeInStorage;
  }
});

  // Transparent mode Switch Icon
  const setTransparentSwitchIcon = computed(() => {
    return transparentMode.value === 'reduce' ? 'fa-solid fa-lightbulb' : 'fa-solid fa-lightbulb-on';
  });

  // Transparent mode Switch Label
  const setTransparentSwitchLabel = computed(() => {
    return `Toggle ${ transparentMode.value === 'reduce' ? 'No-Preference' : 'Reduce'} Mode`;
  });

  // handleTransparentChange function performs the toggle switch state change and light / dark classes.
  const handleTransparentChange = function () {
    isTransparent.value = !isTransparent.value;
    if(isTransparent.value) {
      transparentMode.value = 'reduce';
    } else {
      transparentMode.value = 'no-preference';
    }
  };

// Sets up an watcher to run anytime when colorMode's value or isDarkMode's value is changed then calls setColorModeToStorage to set and update the color scheme to localStorage.
const unWatchTransparency = watch(
  transparentMode,
  value => {
    return value === 'reduce'
      ? setModeToStorage(storageOption, 'transparent-mode', 'reduce')
      : setModeToStorage(storageOption, 'transparent-mode', 'no-preference');
  },
);

onUnmounted(() => {
  unWatchTransparency();
});

  return { transparentMode, handleTransparentChange, setTransparentSwitchLabel, setTransparentSwitchIcon, };
};
