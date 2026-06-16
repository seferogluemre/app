import React, { createContext, useContext, useState, ReactNode } from 'react';

export const LightTheme = {
  background: '#F8F7F4',
  card: '#FFFFFF',
  primary: '#B59E75',
  secondary: '#F0EEE9',
  accent: '#22C55E',
  text: {
    primary: '#1A1A1A',
    secondary: '#706F6C',
    muted: '#A19F9C',
  },
  status: {
    success: '#22C55E',
    error: '#EF4444',
    info: '#3B82F6',
  },
  border: 'rgba(0, 0, 0, 0.05)',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

export const DarkTheme = {
  background: '#0F0F0F',
  card: '#1A1A1A',
  primary: '#D4AF37',
  secondary: '#252525',
  accent: '#22C55E',
  text: {
    primary: '#FFFFFF',
    secondary: '#A19F9C',
    muted: '#636260',
  },
  status: {
    success: '#22C55E',
    error: '#EF4444',
    info: '#3B82F6',
  },
  border: 'rgba(255, 255, 255, 0.05)',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

type ThemeType = typeof LightTheme;

interface ThemeContextType {
  colors: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ colors: isDark ? DarkTheme : LightTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Default export as LightTheme for legacy compatibility during migration
export const Colors = LightTheme;
