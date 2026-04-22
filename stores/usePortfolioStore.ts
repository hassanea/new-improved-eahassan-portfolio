// @ts-ignore
import { defineStore } from 'pinia';

export const usePortfolioStore = defineStore('portfolio', () => {
  const supabase = useSupabaseClient();
  const projects = ref([]);
  const projectID = ref(0);
  const currentDate = ref(null);

  async function handleFetchProjectData() {
    const { data } = await useAsyncData('projects', async () => {
      const { data } = await supabase.from('projects').select('*');
      // @ts-ignore
      projects.value = data;
    });
    return projects.value;
  }

  const favoriteProjects = computed(() => {
    if (projects.value.length === 0) return [];
    // @ts-ignore
    else return projects.value.filter(project => project.isFavorite);
  });

  const currentProject = computed(() => {
    if (projects.value.length === 0) return {};
    // @ts-ignore
    else return projects.value.find(project => project.id === projectID.value);
  });

  const currentYear = computed(() => {
    // @ts-ignore
    const date = new Date(currentDate.value);
    if (!date) return 0;
    return date.getFullYear();
  });

  return {
    projects,
    currentProject,
    projectID,
    currentDate,
    handleFetchProjectData,
    favoriteProjects,
    currentYear,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePortfolioStore, import.meta.hot));
}
