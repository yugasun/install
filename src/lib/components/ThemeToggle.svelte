<script lang="ts">
  import { theme, toggleTheme } from '$lib/utils/theme';
  import { t } from '$lib/i18n';

  const themeIcons = {
    light: 'sun',
    dark: 'moon',
    system: 'monitor'
  };
</script>

<button
  on:click={toggleTheme}
  class="btn btn-icon btn-ripple border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))]"
  aria-label={$t('common.theme.toggle')}
  title={$t(`common.theme.${$theme}`)}
>
  <span class="sr-only">{$t(`common.theme.${$theme}`)}</span>
  
  <span class="flex items-center justify-center relative">
    {#if $theme === 'light'}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
           class="w-5 h-5 transition-transform duration-300 animate-in fade-in">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    {:else if $theme === 'dark'}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
           class="w-5 h-5 transition-transform duration-300 animate-in fade-in">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
           class="w-5 h-5 transition-transform duration-300 animate-in fade-in">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    {/if}
  </span>
  
  <span class="ripple"></span>
</button>

<style>
  /* 涟漪效果 */
  .ripple-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
  }
  
  button {
    -webkit-tap-highlight-color: transparent;
    cursor: pointer; /* 添加指针光标 */
  }
  
  button:focus-visible {
    outline: none;
  }
  
  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 0.5;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* 使用JS添加这个类和样式 */
  button:active .ripple-container::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    padding-bottom: 100%;
    border-radius: 50%;
    background-color: rgba(128, 128, 128, 0.2);
    transform: translate(-50%, -50%) scale(0);
    animation: ripple 0.6s ease-out forwards;
  }
</style>