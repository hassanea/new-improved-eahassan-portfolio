import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event) => {
  // @ts-ignore
  const { id } = event.context.params;
  // Establish connection to Supabase Postgres DB
  const supabase = await serverSupabaseClient(event);
  // Fetch and selects an individual project data based off the dynamic id route parameter.
  // SELECT * FROM project WHERE id = '5mo3m2o2m6o2634634'; 
  const { data } = await supabase.from('projects').select().eq('id', id);
  return { project: data };
});