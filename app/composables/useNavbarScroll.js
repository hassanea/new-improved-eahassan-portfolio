import { ref, computed } from 'vue';

const useNavbarScroll = () => {
  const headerEl = ref(null);
  const hasIntersected = ref(false);
  let headerObserver = null;
  const navbarScrollClass = computed(() => {
    return {
      'nav-bg': !hasIntersected.value,
    };
  });

  const handleNavbarHeaderIntersection = entries => {
    const [entry] = entries;
    hasIntersected.value = entry.isIntersecting;
  };

  const handleNavbarScroll = () => {
    const navbarHeight = document
      .getElementById('navigation')
      ?.getBoundingClientRect().height;

    const headerObsOptions = {
      root: null,
      threshold: 0,
      rootMargin: `-${navbarHeight}px`,
    };

    headerObserver = new IntersectionObserver(
      handleNavbarHeaderIntersection,
      headerObsOptions,
    );

    headerObserver.observe(headerEl.value);
  };

  const handleNavbarScrollReset = () => {
    headerObserver.unobserve(headerEl?.value);
    headerEl.value = null;
    hasIntersected.value = false;
    headerObserver = null;
  };

  return {
    headerEl,
    hasIntersected,
    headerObserver,
    navbarScrollClass,
    handleNavbarHeaderIntersection,
    handleNavbarScroll,
    handleNavbarScrollReset,
  };
};

export default useNavbarScroll;
