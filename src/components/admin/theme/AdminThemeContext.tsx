import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminTheme,
  ResolvedTheme,
  ThemeColors,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from './tokens';

interface AdminThemeContextType {
  theme: AdminTheme;
  resolvedTheme: ResolvedTheme;
  isDark: boolean;
  tokens: ThemeColors;
  setTheme: (theme: AdminTheme) => void;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'dcm_admin_theme_preference';

export const AdminThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AdminTheme>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as AdminTheme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    } catch {
      // Fallback
    }
    return 'light'; // Default to Light Mode as per DCM brand guidelines
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen to OS system color-scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    try {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const setTheme = (newTheme: AdminTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
  };

  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  const isDark = resolvedTheme === 'dark';
  const tokens = isDark ? DARK_TOKENS : LIGHT_TOKENS;

  return (
    <AdminThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        isDark,
        tokens,
        setTheme,
      }}
    >
      <div
        data-admin-theme={resolvedTheme}
        className={`dcm-admin-root min-h-screen transition-colors duration-150 ${tokens.pageBg} ${tokens.textPrimary} font-sans`}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
};

export const useAdminTheme = (): AdminThemeContextType => {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error('useAdminTheme must be used within an AdminThemeProvider');
  }
  return context;
};
