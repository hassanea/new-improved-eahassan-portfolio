import { computed, onMounted, onUnmounted, toValue, watch } from 'vue';
import { useMediaQuery, useSupported } from '@vueuse/core';
import { getModeFromStorage, setModeToStorage } from '@/utils';

export const useReducedMotion = (fallback: string = 'no-preference', storageOption: string = 'localStorage') => {

  const isSupported = useSupported(() => window && 'matchMedia' in window);

  if(!isSupported.value) {
    return 'window.matchMedia is NOT SUPPORTED in your current browser!';
  }

  const reducedMotion = useState('reduce-motion', () => '');
  const motionToggle = useState('reduce-switch', () => toValue(useMediaQuery('(prefers-reduced-motion: reduce)')));

  onMounted(() => {
  const motionFromStorage = getModeFromStorage(storageOption, 'reduced-motion');
  if(!motionFromStorage) {
    reducedMotion.value = fallback;
    setModeToStorage(storageOption, 'reduced-motion', reducedMotion.value);
  } else {
    reducedMotion.value = motionFromStorage;
  }
});

  // const noPrefMode =
  // window?.matchMedia && window.matchMedia('(prefers-reduced-motion: no-preference)');

// const reduceMode =
//   window?.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  // const motionOption = computed(() => {
  //   return reducedMotion.value === 'no-preference'
  //   ? noPrefMode
  //   : reduceMode;
  // });

  const setReducedMotionSwitchIcon = computed(() => {
    return reducedMotion.value === 'no-preference' ? 'fa-solid fa-tire' : 'fa-solid fa-ban';
  });

  const setReducedMotionSwitchLabel = computed(() => {
    return `Toggle ${reducedMotion.value === 'no-preference' ? 'Reduce motion' : 'No-Preference motion'} Mode`;
  });

  // const html = window?.document && document?.documentElement;

  // const setReduceMotion = (e: MediaQueryListEvent | MediaQueryList) => {
  //   // @ts-ignore
  //   const currentReduceMode = window?.matchMedia && e.matches ? 'no-preference' : 'reduce'; 
  //   reducedMotion.value = currentReduceMode;
  //   toggleClass(html, currentReduceMode);
  // };

  // const motionHandler = useEventListener(noPrefMode, 'change', setReduceMotion, { passive: true });

  const handleMotionChange = function () {
    motionToggle.value = !motionToggle.value;
    if(motionToggle.value) {
      reducedMotion.value = 'reduce';
    } else {
      reducedMotion.value = 'no-preference';
    }
    // if (html.classList.contains('no-preference')) {
     // motionToggle.value = true;
      // removeClass(html, 'no-preference');
     // setReduceMotion(reduceMode);
    // } else {
     // motionToggle.value = false;
      //removeClass(html, 'reduce');
      // setReduceMotion(noPrefMode);
    // }
  };

  // Sets up an watcher to run anytime when colorMode's value is changed then calls setColorModeToStorage to set and update the color scheme to localStorage.
  const unWatchReduce = watch(
    [reducedMotion, motionToggle],
    values => {
      return values[0] === 'reduce' && values[1]
        ? setModeToStorage(storageOption, 'reduced-motion', 'reduce')
        : setModeToStorage(storageOption, 'reduced-motion', 'no-preference');
    },
  );

  onUnmounted(() => {
    unWatchReduce();
  });

  return {
    reducedMotion,
    motionToggle,
    setReducedMotionSwitchIcon,
    setReducedMotionSwitchLabel,
    handleMotionChange,
  };
};

