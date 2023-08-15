import { storageFactory } from 'storage-factory';

import { Theme, themes } from 'styles/theme.css';

export const local = storageFactory(() => window.localStorage);
export function setTheme(theme: Theme) {
  local.setItem('theme', theme);
}
export function getTheme(): Theme | undefined {
  const themeFromStorage = local.getItem('theme');

  if (themes.hasOwnProperty(themeFromStorage ?? '')) {
    return themeFromStorage as Theme;
  }
}
