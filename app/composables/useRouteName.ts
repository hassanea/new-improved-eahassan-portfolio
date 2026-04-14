import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useRouteName = () => {
   const currentRoute = useRoute();

   const routeName = ref('');

   watch(() => currentRoute?.meta, (value) => {
    const { name } = value;
    // @ts-ignore
    routeName.value = name;
}, { immediate: true });

return routeName;
};
