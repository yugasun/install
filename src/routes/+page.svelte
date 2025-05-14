<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import ScriptItem from '$lib/components/ScriptItem.svelte';
  import InstallExample from '$lib/components/InstallExample.svelte';
  import type { Script } from '$lib/types';
  import { ScriptService } from '$lib/services/ScriptService';
  import { t, language } from '$lib/i18n';
  
  let scripts: Script[] = [];
  let selectedScript: Script | null = null;
  let loading = true;
  let error = false;
  let searchKeyword = '';
  let unsubscribe: () => void;
  
  // 过滤后的脚本列表
  $: filteredScripts = searchKeyword 
    ? ScriptService.searchScripts(scripts, searchKeyword)
    : scripts;
  
  // 加载脚本数据的函数
  async function loadScripts() {
    loading = true;
    error = false;
    
    try {
      scripts = await ScriptService.getScripts();
      
      // 如果存在当前选中的脚本，尝试在新加载的脚本列表中找到对应ID的脚本
      if (selectedScript) {
        const previousId = selectedScript.id;
        const newSelectedScript = scripts.find(script => script.id === previousId);
        selectedScript = newSelectedScript || (scripts.length > 0 ? scripts[0] : null);
      } else if (scripts.length > 0) {
        // 默认选择第一个脚本
        selectedScript = scripts[0];
      }
      
      loading = false;
    } catch (err) {
      console.error('加载脚本数据失败:', err);
      error = true;
      loading = false;
    }
  }
  
  // 在组件挂载时加载脚本数据，并订阅语言变化
  onMount(() => {
    loadScripts();
    
    // 订阅语言变化，当语言变化时重新加载脚本数据
    unsubscribe = language.subscribe(() => {
      loadScripts();
    });
  });
  
  // 在组件销毁时取消订阅
  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
  
  // 处理脚本选择
  function handleSelect(event: CustomEvent<Script>) {
    selectedScript = event.detail;
  }
  
  // 处理搜索输入
  function handleSearch(event: Event) {
    searchKeyword = (event.target as HTMLInputElement).value;
  }
</script>

<svelte:head>
  <title>Install Scripts - {$t('home.title')}</title>
  <meta name="description" content={$t('home.subtitle')} />
</svelte:head>

<div class="max-w-5xl mx-auto px-6 py-8 lg:px-8">
  <div class="text-center mb-8">
    <h1 class="text-4xl font-bold tracking-tight mb-4">{$t('home.title')}</h1>
    <p class="text-[hsl(var(--secondary-foreground))] max-w-2xl mx-auto">
      {$t('home.subtitle')}
    </p>
  </div>
  
  <!-- 安装示例组件 -->
  <InstallExample script={selectedScript} />
  
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">{$t('home.availableScripts')}</h2>
    
    <!-- 搜索框 -->
    <div class="relative">
      <div class="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 absolute left-3 text-[hsl(var(--secondary-foreground))]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={$t('home.searchPlaceholder')}
          class="px-3 py-2 pl-10 border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-md text-sm 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:border-[hsl(var(--border))]
                hover:border-[hsl(var(--border)/0.8)]
                transition-all duration-200 w-full min-w-[200px]"
          on:input={handleSearch}
          value={searchKeyword}
        />
        {#if searchKeyword}
          <button
            class="absolute right-2 text-[hsl(var(--secondary-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            on:click={() => searchKeyword = ''}
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- 脚本列表 -->
  <div class="border border-[hsl(var(--border))] rounded-md overflow-hidden bg-[hsl(var(--card))] shadow-sm transition-all duration-200">
    <ul class="divide-y divide-[hsl(var(--border))]">
      {#if loading}
        <li class="p-6 text-center text-[hsl(var(--secondary-foreground))]">
          <div class="flex flex-col items-center justify-center py-4">
            <svg class="animate-spin h-8 w-8 text-[hsl(var(--primary))] mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>{$t('home.loading')}</p>
          </div>
        </li>
      {:else if error}
        <li class="p-6 text-center text-[hsl(var(--error))]">
          <div class="flex flex-col items-center justify-center py-4">
            <svg class="h-8 w-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p>{$t('home.loadingError')}</p>
            <button 
              class="mt-3 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md text-sm font-medium 
                   hover:bg-[hsl(var(--primary-hover))] transition-colors duration-200 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              on:click={() => window.location.reload()}
            >
              刷新
            </button>
          </div>
        </li>
      {:else if filteredScripts.length === 0}
        <li class="p-6 text-center text-[hsl(var(--secondary-foreground))]">
          <div class="flex flex-col items-center justify-center py-4">
            <svg class="h-8 w-8 mb-3 text-[hsl(var(--secondary-foreground)/0.7)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p>{$t('home.noResults')}</p>
          </div>
        </li>
      {:else}
        <div class="max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-[hsl(var(--border))] scrollbar-track-transparent">
          {#each filteredScripts as script (script.id)}
            <ScriptItem 
              {script} 
              isSelected={selectedScript?.id === script.id} 
              on:select={handleSelect} 
            />
          {/each}
        </div>
      {/if}
    </ul>
  </div>
</div>

<style>
  /* 自定义滚动条样式 */
  :global(.scrollbar-thin::-webkit-scrollbar) {
    width: 6px;
  }
  
  :global(.scrollbar-thumb-\[hsl\(var\(--border\)\)\]::-webkit-scrollbar-thumb) {
    background: hsl(var(--border));
    border-radius: 3px;
  }
  
  :global(.scrollbar-track-transparent::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(.scrollbar-thin::-webkit-scrollbar-thumb:hover) {
    background: hsl(var(--primary) / 0.5);
  }
</style>
