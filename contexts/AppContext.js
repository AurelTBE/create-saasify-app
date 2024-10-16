import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authModule = process.env.NEXT_PUBLIC_AUTH_PROVIDER === 'FIREBASE'
    ? require('../lib/auth/firebase')
    : require('../lib/auth/supabase');

  const dbModule = process.env.NEXT_PUBLIC_DATABASE_PROVIDER === 'FIREBASE'
    ? require('../lib/db/firebase')
    : require('../lib/db/supabase');

  useEffect(() => {
    async function loadUserFromAuth() {
      const user = await authModule.getCurrentUser();
      setUser(user);
      setLoading(false);
    }
    loadUserFromAuth();
  }, []);

  const signIn = () => authModule.signInWithGoogle();
  const signOut = () => authModule.signOutUser();

  const value = {
    user,
    signIn,
    signOut,
    loading,
    db: dbModule,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
