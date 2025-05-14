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

<div class="mb-8 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden">
  <div class="p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))]">
    <h2 class="text-lg font-semibold">{$t('install.installCommand')}</h2>
  </div>
  
  {#if script}
    <div class="p-4">
      <div class="flex items-center space-x-2 mb-2">
        <div class="flex-grow relative">
          <div class="bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-md p-3 font-mono text-sm whitespace-nowrap overflow-x-auto">
            {displayCommand}
          </div>
        </div>
        
        <button
          on:click={copyToClipboard}
          class="shrink-0 flex items-center justify-center h-10 px-4 py-2 rounded-md transition-colors {copied 
            ? 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]' 
            : copyFailed 
              ? 'bg-[hsl(var(--error))] text-[hsl(var(--error-foreground))]'
              : 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)]'}"
          aria-label={copied ? $t('install.copied') : $t('install.copy')}
        >
          {#if copied}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {$t('install.copied')}
          {:else if copyFailed}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            {$t('install.copyFailed')}
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            {$t('install.copy')}
          {/if}
        </button>
      </div>
    </div>
  {:else}
    <div class="p-4 text-[hsl(var(--secondary-foreground))] italic text-center">
      {$t('install.selectScript')}
    </div>
  {/if}
</div>
