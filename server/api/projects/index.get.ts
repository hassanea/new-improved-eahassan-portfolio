import {  serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  // Establish connection to Supabase Postgres DB
  const supabase = await serverSupabaseClient(event);
  // Fetch and select all project data
  // SELECT * FROM project; 
  const { data } = await supabase.from('projects').select('*');
  return { projects: data };
});
