export const useRouteName = () => {
  const currentRoute = useRoute();

  const routeName = ref('');

  watch(
    () => currentRoute?.meta,
    value => {
      const { name } = value;
      // @ts-ignore
      routeName.value = name;
    },
    { immediate: true },
  );

  return routeName;
};
