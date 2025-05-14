<script lang="ts">
  import { onMount } from 'svelte';
  import ScriptItem from '$lib/components/ScriptItem.svelte';
  import InstallExample from '$lib/components/InstallExample.svelte';
  import type { Script } from '$lib/types';
  import { ScriptService } from '$lib/services/ScriptService';
  import { t } from '$lib/i18n';
  
  let scripts: Script[] = [];
  let selectedScript: Script | null = null;
  let loading = true;
  let error = false;
  let searchKeyword = '';
  
  // 过滤后的脚本列表
  $: filteredScripts = searchKeyword 
    ? ScriptService.searchScripts(scripts, searchKeyword)
    : scripts;
  
  // 获取脚本数据
  onMount(async () => {
    try {
      scripts = await ScriptService.getScripts();
      
      // 默认选择第一个脚本
      if (scripts.length > 0) {
        selectedScript = scripts[0];
      }
      
      loading = false;
    } catch (err) {
      console.error('加载脚本数据失败:', err);
      error = true;
      loading = false;
    }
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
      <input
        type="text"
        placeholder={$t('home.searchPlaceholder')}
        class="px-3 py-2 border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
        on:input={handleSearch}
        value={searchKeyword}
      />
    </div>
  </div>
  
  <!-- 脚本列表 -->
  <ul class="divide-y divide-[hsl(var(--border))] rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm overflow-hidden">
    {#if loading}
      <li class="p-4 text-[hsl(var(--secondary-foreground))]">
        <div class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-[hsl(var(--primary))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {$t('home.loading')}
        </div>
      </li>
    {:else if error}
      <li class="p-4 text-[hsl(var(--error))]">
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {$t('home.loadingError')}
        </div>
      </li>
    {:else if filteredScripts.length === 0}
      <li class="p-4 text-[hsl(var(--secondary-foreground))]">{$t('home.noResults')}</li>
    {:else}
      {#each filteredScripts as script (script.id)}
        <ScriptItem 
          {script} 
          isSelected={selectedScript?.id === script.id} 
          on:select={handleSelect} 
        />
      {/each}
    {/if}
  </ul>
</div>
