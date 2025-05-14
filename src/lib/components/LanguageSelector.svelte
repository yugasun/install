<script lang="ts">
  import { clickOutside } from '$lib/utils/clickOutside';
  import { language, availableLanguages, t } from '$lib/i18n';

  let showDropdown = false;

  // Dynamically create language options
  $: languages = availableLanguages.map((code: string) => ({
    code,
    name: $t(`common.language.${code}`),
  }));

  function setLanguage(code: string) {
    $language = code;
    showDropdown = false;
  }

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function closeDropdown() {
    showDropdown = false;
  }

  // Update current language name when language changes
  $: currentLanguage =
    languages.find((lang) => lang.code === $language)?.name ||
    languages[0]?.name;
</script>

<div
  class="relative"
  use:clickOutside={{ enabled: showDropdown, callback: closeDropdown }}
>
  <button
    type="button"
    class="btn btn-outline flex items-center text-sm"
    id="language-menu"
    aria-expanded={showDropdown}
    aria-haspopup="true"
    on:click={toggleDropdown}
    aria-label={$t('common.language.select')}
  >
    <span>{currentLanguage}</span>
    <svg
      class="-mr-1 ml-2 h-5 w-5 transition-transform duration-200 {showDropdown ? 'rotate-180' : ''}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  {#if showDropdown}
    <div
      class="origin-top-right absolute z-50 right-0 mt-2 w-40 rounded-md shadow-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))] overflow-hidden
             animate-in fade-in duration-200"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="language-menu"
    >
      <div class="py-1" role="none">
        {#each languages as lang}
          <button
            class="btn-ghost w-full text-left px-4 py-2 text-sm
                   {lang.code === $language ? 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-medium' : ''}"
            role="menuitem"
            on:click={() => setLanguage(lang.code)}
          >
            <div class="flex items-center">
              <span class="mr-2">{lang.code === 'en' ? '🇺🇸' : '🇨🇳'}</span>
              <span>{lang.name}</span>
              {#if lang.code === $language}
                <svg class="ml-auto h-4 w-4 text-[hsl(var(--primary))]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
