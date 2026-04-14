import { onMounted, onUnmounted, watch } from "vue";

import { setModeToStorage, getModeFromStorage } from "@/utils/index";

export const useContrast = (fallback = 'no-preference', storageOption = 'localStorage') => {
  const contrastMode = useState('contrast-mode', () => '');
  const contrastOptions = ['no-preference', 'more', 'less'];

  onMounted(() => {
  const hasContrastModeInStorage = getModeFromStorage('localStorage', 'contrast-mode');

  // @ts-ignore
  if(hasContrastModeInStorage === fallback || !('transparent-mode' in window[`${storageOption}`]) ) {
    contrastMode.value = 'no-preference';
  } else {
    // @ts-ignore
    contrastMode.value = hasContrastModeInStorage;
  }
});

  const unWatchContrast = watch(contrastMode, (contrastValue) => {
      contrastValue === 'more' ? setModeToStorage(storageOption, 'contrast-mode', 'more') :
      contrastValue === 'less' ? setModeToStorage(storageOption, 'contrast-mode', 'less') : setModeToStorage(storageOption, 'contrast-mode', 'no-preference');
  }, { immediate: true });

  onUnmounted(() => {
    unWatchContrast();
  });

  return {
    contrastMode,
    contrastOptions,
  };
};
