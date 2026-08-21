import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { getMobileTheme, saveMobileTheme, type MobileTheme } from './settings-storage';

const palettes = {
  light: { background: '#f4f7f2', card: '#ffffff', text: '#17231f', muted: '#52615b', primary: '#277253' },
  dark: { background: '#101713', card: '#1b2721', text: '#f2f7f4', muted: '#b8c8bf', primary: '#72c99d' },
} as const;

type AppThemeContextValue = {
  theme: MobileTheme;
  colors: typeof palettes.light | typeof palettes.dark;
  setTheme: (theme: MobileTheme) => Promise<void>;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<MobileTheme>('light');
  useEffect(() => { void getMobileTheme().then(setThemeState); }, []);
  const value = useMemo<AppThemeContextValue>(() => ({
    theme,
    colors: palettes[theme],
    setTheme: async (nextTheme) => { setThemeState(nextTheme); await saveMobileTheme(nextTheme); },
  }), [theme]);
  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme(): AppThemeContextValue {
  const value = useContext(AppThemeContext);
  if (!value) throw new Error('useAppTheme must be used inside AppThemeProvider');
  return value;
}
