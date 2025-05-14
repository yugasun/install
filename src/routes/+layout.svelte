<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import LanguageSelector from '$lib/components/LanguageSelector.svelte';
  import { page } from '$app/stores';
  import { t, language } from '$lib/i18n';
  import { initTheme } from '$lib/utils/theme';
  
  // 导航项目
  $: navItems = [
    { label: $t('common.menu.home'), path: '/' },
    { label: $t('common.menu.about'), path: '/about' }
  ];

  // 当语言改变时，确保导航项目文本被更新
  $: $language, navItems = [
    { label: $t('common.menu.home'), path: '/' },
    { label: $t('common.menu.about'), path: '/about' }
  ];
  
  // 初始化主题
  onMount(() => {
    const cleanup = initTheme();
    return cleanup;
  });
</script>

<div class="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-theme">
  <!-- 导航栏 -->
  <header class="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-6">
          <a href="/" class="flex items-center">
            <span class="font-bold text-xl text-[hsl(var(--primary))]">Install Scripts</span>
          </a>
          
          <!-- 导航链接 -->
          <nav class="hidden md:flex space-x-4">
            {#each navItems as item}
              <a 
                href={item.path} 
                class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === item.path ? 'text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]' : 'text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary)/0.5)]'} transition-colors"
              >{item.label}</a>
            {/each}
          </nav>
        </div>
        
        <div class="flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <a 
            href="https://github.com/yugasun/install" 
            class="text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--foreground))]"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div class="md:hidden pb-2">
        <div class="flex space-x-2">
          {#each navItems as item}
            <a 
              href={item.path} 
              class="block px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === item.path ? 'text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]' : 'text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary)/0.5)]'}"
            >{item.label}</a>
          {/each}
        </div>
      </div>
    </div>
  </header>

  <!-- 主内容 -->
  <main class="flex-grow fade-in">
    <slot />
  </main>
  
  <!-- 页脚 -->
  <footer class="border-t border-[hsl(var(--border))] py-6 bg-[hsl(var(--card))]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-center text-center text-sm text-[hsl(var(--secondary-foreground))]">
        <p>© {new Date().getFullYear()} Install Scripts. {$t('footer.rights')}</p>
        <p class="mt-2">{$t('footer.author')} | {$t('footer.madeWith')} ❤️</p>
        <p class="mt-3">
          <a href="https://github.com/yugasun" target="_blank" rel="noopener noreferrer" class="hover:text-[hsl(var(--primary))] transition-colors">
            <svg class="h-6 w-6 inline-block" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </p>
      </div>
    </div>
  </footer>
</div>
