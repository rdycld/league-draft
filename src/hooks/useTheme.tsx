import { useEffect, useState } from 'react';

import * as storage from '@/storage';
import { Theme } from 'styles/theme.css';

export function useTheme() {
  const [theme, setTheme] = useState<Theme | undefined>();

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    if (theme) {
      storage.setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onMediaQueryChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    themeMediaQuery.addEventListener('change', onMediaQueryChange);
    return () => themeMediaQuery.removeEventListener('change', onMediaQueryChange);
  }, []);

  const toggle = () => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));

  return { theme, toggle };
}

function getInitialTheme(): Theme {
  const theme = storage.getTheme();

  if (theme) {
    return theme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
