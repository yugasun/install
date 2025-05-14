<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import type { Script } from '$lib/types';
  import { theme } from '$lib/utils/theme';
  import { t } from '$lib/i18n';

  // 接收选中的脚本数据
  export let script: Script | null = null;

  let copied = false;
  let copyFailed = false;
  let copyTimeout: ReturnType<typeof setTimeout>;

  // 计算安装命令
  $: installCommand = script ? 
    `curl -fsSL ${script.url.startsWith('http') ? script.url : `${browser ? window.location.origin : ''}/installs/${script.url}`} | bash` : '';
  
  // 确保始终有一个命令可用
  $: displayCommand = script?.command || installCommand;
  
  // 复制命令到剪贴板
  async function copyToClipboard() {
    if (!script) return;

    try {
      await navigator.clipboard.writeText(displayCommand);
      copied = true;
      copyFailed = false;
      
      // 2秒后重置复制状态
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (error) {
      console.error('复制到剪贴板失败:', error);
      copyFailed = true;
      
      // 2秒后重置失败状态
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copyFailed = false;
      }, 2000);
    }
  }

  // 在组件卸载时清除定时器
  onMount(() => {
    return () => {
      clearTimeout(copyTimeout);
    };
  });
</script>

<div class="mb-8 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden shadow-sm transition-all duration-300">
  <div class="p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.5)] flex items-center justify-between">
    <h2 class="text-lg font-semibold">{$t('install.installCommand')}</h2>
    {#if script}
      <div class="text-xs text-[hsl(var(--secondary-foreground))] bg-[hsl(var(--card))] px-2 py-1 rounded-full border border-[hsl(var(--border))]">
        {script.name}
      </div>
    {/if}
  </div>
  
  {#if script}
    <div class="p-4">
      <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div class="flex-grow relative">
          <div 
            class="bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-md p-3 font-mono text-sm 
                   whitespace-nowrap overflow-x-auto custom-scrollbar
                   hover:border-[hsl(var(--border)/0.8)] hover:bg-[hsl(var(--background)/0.8)]
                   transition-colors duration-200 relative cursor-pointer"
            on:click={copyToClipboard}
            role="button"
            tabindex="0"
            aria-label={$t('install.copy')}
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyToClipboard();
              }
            }}
          >
            <!-- 命令前缀 $ 符号 -->
            <span class="mr-2 select-none text-[hsl(var(--secondary-foreground))]">$</span>
            <span class="select-all">{displayCommand}</span>
            
            <!-- 点击提示 - 在悬停时显示 -->
            <div class="absolute inset-0 bg-[hsl(var(--primary)/0.1)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md">
              <div class="bg-[hsl(var(--secondary))] px-2 py-1 rounded text-xs text-[hsl(var(--secondary-foreground))] shadow-sm">
                {$t('install.clickToCopy')}
              </div>
            </div>
          </div>
        </div>
        
        <button
          on:click={copyToClipboard}
          class="btn btn-md {copied 
                  ? 'btn-success' 
                  : copyFailed 
                    ? 'btn-error'
                    : 'btn-primary'}"
          aria-label={copied ? $t('install.copied') : copyFailed ? $t('install.copyFailed') : $t('install.copy')}
        >
          {#if copied}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 opacity-0 animate-fadeIn" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="opacity-0 animate-fadeIn">{$t('install.copied')}</span>
          {:else if copyFailed}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 opacity-0 animate-fadeIn" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="opacity-0 animate-fadeIn">{$t('install.copyFailed')}</span>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            {$t('install.copy')}
          {/if}
        </button>
      </div>
      
      <!-- 小贴士信息 -->
      <div class="mt-3 text-xs text-[hsl(var(--secondary-foreground))] flex items-start">
        <svg class="h-4 w-4 mr-1 flex-shrink-0 mt-0.5 text-[hsl(var(--info))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{@html $t('install.tip', { values: { name: script.name } })}</span>
      </div>
    </div>
  {:else}
    <div class="p-8 text-[hsl(var(--secondary-foreground))] italic text-center flex flex-col items-center justify-center">
      <svg class="h-12 w-12 mb-3 text-[hsl(var(--secondary-foreground)/0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
      <p>{$t('install.selectScript')}</p>
    </div>
  {/if}
</div>

<style>
  /* 自定义滚动条样式 */
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--border));
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--primary) / 0.5);
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  /* 添加自定义动画 */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
</style>
