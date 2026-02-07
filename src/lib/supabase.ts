import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verify Supabase connection
console.log('Supabase URL:', supabaseUrl ? 'Connected' : 'Not connected');
console.log('Supabase Key:', supabaseAnonKey ? 'Valid' : 'Invalid');

// Custom fetch function to proxy through Vite dev server in development
const customFetch = async (url: string, options: RequestInit = {}) => {
  // In development, proxy through Vite dev server to avoid CORS issues
  if (import.meta.env.DEV) {
    const proxyUrl = url.replace('http://49.13.63.120:8000', '/api/db');
    console.log('Proxying request:', url, '->', proxyUrl);
    return fetch(proxyUrl, options);
  }

  // In production, connect directly to VPS
  return fetch(url, options);
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'decor'
  },
  global: {
    headers: {
      'X-Client-Info': 'decor-paint-website'
    },
    fetch: customFetch
  }
});

// Helper function to get localized field name
export const getLocalizedField = (fieldName: string, language: string) => {
  return language === 'ar' ? `${fieldName}_ar` : fieldName;
};

// Helper function to create select statement for localized fields
export const createLocalizedSelect = (fields: string[], language: string) => {
  return fields.map(field => {
    const arField = `${field}_ar`;
    return language === 'ar' && field !== 'id' ? 
      `COALESCE(${arField}, ${field}) as ${field}` : 
      field;
  }).join(',');
};
// Add error event listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Clear any cached data when user signs out
    supabase.auth.refreshSession();
  } else if (event === 'INITIAL_SESSION') {
    console.log('Supabase session initialized:', session ? 'Active' : 'None');
  }
});