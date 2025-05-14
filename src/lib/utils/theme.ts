import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'system';

// Initialize theme from local storage or defaults to system
const getInitialTheme = (): Theme => {
  if (!browser) return 'system';

  const storedTheme = localStorage.getItem('theme') as Theme;
  if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
    return storedTheme;
  }
  return 'system';
};

// Create a writable store for the theme
export const theme = writable<Theme>(getInitialTheme());

// Apply theme changes to the DOM and save to local storage
export function applyTheme(newTheme: Theme): void {
  if (!browser) return;

  // Save to local storage
  localStorage.setItem('theme', newTheme);

  // Apply to DOM
  const isDark =
    newTheme === 'dark' ||
    (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
}

// Initialize theme on client-side
export function initTheme(): () => void {
  if (!browser) return () => {};

  // Subscribe to theme changes and apply them
  const unsubscribe = theme.subscribe(applyTheme);

  // Also listen for system preference changes when in system mode
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = () => {
    const currentTheme = getInitialTheme();
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  };

  mediaQuery.addEventListener('change', handleChange);

  // Return cleanup function
  return () => {
    unsubscribe();
    mediaQuery.removeEventListener('change', handleChange);
  };
}

// Utility function to toggle between themes
export function toggleTheme(): void {
  theme.update(currentTheme => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex];
  });
}