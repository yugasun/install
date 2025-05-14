<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import type { Script } from '$lib/types';
  import { ScriptService } from '$lib/services/ScriptService';
  import { t } from '$lib/i18n';

  let script: Script | null = null;
  let loading = true;
  let error = false;
  let copying = false;
  let copied = false;
  let countdown = 3;
  let redirectTimer: ReturnType<typeof setTimeout>;
  let copyTimer: ReturnType<typeof setTimeout>;

  // 获取脚本ID
  const id = $page.params.id;

  // 计算安装命令
  $: installCommand = script
    ? `curl -fsSL ${script.url.startsWith('http') ? script.url : `${browser ? window.location.origin : ''}/installs/${script.url}`} | bash`
    : '';

  // 确保始终有一个命令可用
  $: displayCommand = script?.command || installCommand;

  // 加载脚本详情
  onMount(() => {
    let unmounted = false;

    (async () => {
      try {
        const scripts = await ScriptService.getScripts();
        if (unmounted) return;
        script = ScriptService.findScriptById(scripts, id) ?? null;

        if (!script) {
          throw new Error('Script not found');
        }

        loading = false;
      } catch (err) {
        console.error('Failed to load script:', err);
        error = true;
        loading = false;

        // 脚本不存在时倒计时返回首页
        startCountdown();
      }
    })();

    // 组件卸载时清除定时器
    return () => {
      unmounted = true;
      clearInterval(redirectTimer);
      clearTimeout(copyTimer);
    };
  });

  // 复制命令到剪贴板
  async function copyCommand() {
    if (!browser || !displayCommand) return;

    try {
      await navigator.clipboard.writeText(displayCommand);
      copied = true;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('复制命令失败:', err);
    }
  }

  // 复制链接到剪贴板
  async function copyLink() {
    if (!browser) return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      copied = true;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('复制链接失败:', err);
    }
  }

  // 倒计时重定向
  function startCountdown() {
    redirectTimer = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval(redirectTimer);
        goto('/');
      }
    }, 1000);
  }
</script>

<svelte:head>
  <title>Install Scripts - {script ? script.name : $t('error.scriptNotFound')}</title>
  {#if script}
    <meta name="description" content={script.description} />
  {:else if error}
    <meta name="description" content={$t('error.scriptNotFound')} />
  {/if}
</svelte:head>

<div class="max-w-5xl mx-auto px-6 py-8 lg:px-8">
  {#if loading}
    <div class="flex justify-center items-center py-16">
      <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-[hsl(var(--primary))]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  {:else if error}
    <div class="my-16 text-center">
      <h1 class="text-3xl font-bold mb-4 text-[hsl(var(--error))]">{$t('error.scriptNotFound')}</h1>
      <p class="mb-6">{$t('error.redirecting')} ({countdown})</p>
      <a href="/" class="inline-flex items-center px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary)/0.9)] shadow-sm transition-colors">{$t('error.returnHome')}</a>
    </div>
  {:else}
    <!-- 脚本详情页面 -->
    <div>
      <a href="/" class="inline-flex items-center text-[hsl(var(--primary))] hover:underline mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        {$t('detail.backToList')}
      </a>

      <div class="mb-8 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg overflow-hidden shadow-sm">
        <div class="p-5 border-b border-[hsl(var(--border))]">
          <h1 class="text-3xl font-bold">{script?.name}</h1>
          <p class="mt-2 text-[hsl(var(--secondary-foreground))]">{script?.description}</p>
          <div class="mt-4 flex">
            <a 
              href={script?.sourceUrl}
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center px-4 py-2 border border-[hsl(var(--primary))] bg-transparent text-[hsl(var(--primary))] rounded-md hover:bg-[hsl(var(--primary)/0.1)] text-sm transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {$t('script.source')}
            </a>
          </div>
        </div>
        
        <!-- 安装命令 -->
        <div class="p-5 border-b border-[hsl(var(--border))]">
          <h2 class="text-xl font-semibold mb-3">{$t('install.installCommand')}</h2>
          <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div class="flex-grow relative">
              <div class="bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-md p-3 font-mono text-sm whitespace-nowrap overflow-x-auto">
                {displayCommand}
              </div>
            </div>
            <button
              on:click={copyCommand}
              class="shrink-0 flex items-center justify-center h-10 px-4 py-2 rounded-md transition-colors shadow-sm {copied
                ? 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]'
                : 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)]'}"
              aria-label={copied ? $t('install.copied') : $t('install.copy')}
            >
              {#if copied}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                {$t('install.copied')}
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
        
        <!-- 使用说明 -->
        <div class="p-5 border-b border-[hsl(var(--border))]">
          <h2 class="text-xl font-semibold mb-3">{$t('detail.howToUse')}</h2>
          <ol class="list-decimal list-inside space-y-2">
            <li class="flex items-start">
              <span class="w-5 h-5 flex items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-bold mr-2 mt-0.5">1</span>
              <span>{$t('detail.step1')}</span>
            </li>
            <li class="flex items-start">
              <span class="w-5 h-5 flex items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-bold mr-2 mt-0.5">2</span>
              <span>{$t('detail.step2')}</span>
            </li>
            <li class="flex items-start">
              <span class="w-5 h-5 flex items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-bold mr-2 mt-0.5">3</span>
              <span>{$t('detail.step3')}</span>
            </li>
            <li class="flex items-start">
              <span class="w-5 h-5 flex items-center justify-center rounded-full bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] font-bold mr-2 mt-0.5">4</span>
              <span>{$t('detail.step4')}</span>
            </li>
          </ol>
        </div>
        
        <!-- 分享功能 -->
        <div class="p-5">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-xl font-semibold">{$t('detail.share')}</h2>
            {#if copied}
              <span class="text-[hsl(var(--success))] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {$t('install.copied')}
              </span>
            {/if}
          </div>
          <button
            on:click={copyLink}
            class="inline-flex items-center px-4 py-2 rounded-md bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary)/0.7)] focus:ring-2 focus:ring-[hsl(var(--primary)/0.5)] focus:outline-none transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
            </svg>
            {$t('detail.copyLink')}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
