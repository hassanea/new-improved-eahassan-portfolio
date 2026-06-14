import { useElementBounding } from '#imports';
const useNavbarScroll = () => {
  const headerEl = useTemplateRef('headerEl');
  const navbar = useTemplateRef('navbar');
  const { height: navbarHeight } = useElementBounding(navbar);
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
    const headerObsOptions = {
      root: null,
      threshold: 0,
      rootMargin: `-${navbarHeight.value}px`,
    };

    headerObserver = new IntersectionObserver(
      handleNavbarHeaderIntersection,
      headerObsOptions,
    );

    headerObserver.observe(headerEl.value);
  };

  const handleNavbarScrollReset = () => {
    headerObserver.unobserve(headerEl.value);
    hasIntersected.value = false;
    headerObserver = null;
  };

  return {
    headerEl,
    navbar,
    hasIntersected,
    headerObserver,
    navbarScrollClass,
    handleNavbarHeaderIntersection,
    handleNavbarScroll,
    handleNavbarScrollReset,
  };
};

export default useNavbarScroll;
