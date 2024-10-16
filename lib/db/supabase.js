import { supabase } from '../auth/supabase';

export const addDocument = async (tableName, data) => {
  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .single();
    if (error) throw error;
    return result.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const getDocument = async (tableName, id) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting document: ', error);
  }
};

export const updateDocument = async (tableName, id, data) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating document: ', error);
    return false;
  }
};

export const deleteDocument = async (tableName, id) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting document: ', error);
    return false;
  }
};
