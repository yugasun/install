import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import translations from './translations';

// Default language
const defaultLanguage = 'en';

// Initialize language from localStorage if in browser, or use default
const initialLanguage = browser
  ? localStorage.getItem('language') || defaultLanguage
  : defaultLanguage;

export const availableLanguages = Object.keys(translations);

// Create a writable store for the language
export const language = writable<string>(initialLanguage);

// When language changes, update localStorage
if (browser) {
  language.subscribe((value) => {
    localStorage.setItem('language', value);
  });
}

// Create a derived store for translations
export const t = derived(language, ($language) => {
  // Function that returns translation string
  return (key: string): string => {
    // Get the language-specific translations
    const lang = $language in translations ? $language : defaultLanguage;
    const translation = translations[lang];

    // Split the key by dots to navigate through nested translation object
    const keys = key.split('.');
    let result = translation;

    // Navigate through the translation object
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as any)[k];
      } else {
        // Fallback to defaultLanguage if the key is missing
        if (lang !== defaultLanguage) {
          const fallback = translations[defaultLanguage];
          result = fallback;
          for (const fk of keys) {
            if (result && typeof result === 'object' && fk in result) {
              result = (result as any)[fk];
            } else {
              // Key not found, return the key itself as fallback
              return key;
            }
          }
        } else {
          // Key not found even in default language, return the key itself
          return key;
        }
      }
    }

    // Return the translation or the key itself if not found
    return typeof result === 'string' ? result : key;
  };
});