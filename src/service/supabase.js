import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getIntakeHistory = async () => {
  const { data, error } = await supabase
    .from("water_intake")
    .select("*")
    .order("timestamp", { ascending: false });
  if (error) throw error;
  return data;
};

export const addIntakeEntry = async (entry) => {
  const { data, error } = await supabase
    .from("water_intake")
    .insert([entry])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getUserSettings = async () => {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .single();
  if (error) throw error;
  return data;
};

export const updateUserSettings = async (settings) => {
  const { data, error } = await supabase
    .from("user_settings")
    .update(settings)
    .eq("id", settings.id)
    .select()
    .single();
  if (error) throw error;
  return data;
};
