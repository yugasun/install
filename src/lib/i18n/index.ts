import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import translations from './translations';

// 变量替换的接口定义
interface TranslationOptions {
  values?: Record<string, string | number>;
}

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

/**
 * 替换字符串中的变量占位符
 * 支持 {name} 格式的占位符
 */
function replaceVariables(text: string, values?: Record<string, string | number>): string {
  if (!values) return text;

  return text.replace(/{([^}]+)}/g, (match, key) => {
    return values[key] !== undefined ? String(values[key]) : match;
  });
}

// Create a derived store for translations
export const t = derived(language, ($language) => {
  // Function that returns translation string with optional variable replacement
  return (key: string, options?: TranslationOptions): string => {
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

    // 获取翻译文本
    const translatedText = typeof result === 'string' ? result : key;

    // 替换变量(如果有)
    return replaceVariables(translatedText, options?.values);
  };
});