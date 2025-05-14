<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Script } from '$lib/types';
  import { t } from '$lib/i18n';
  import { onMount } from 'svelte';

  // 接收传入的脚本信息作为属性
  export let script: Script;
  export let isSelected: boolean = false;

  // 创建调度器，用于触发自定义事件
  const dispatch = createEventDispatcher<{
    select: Script;
  }>();

  // 定义选中事件
  function handleClick() {
    // 触发自定义事件，通知父组件该脚本被选中
    dispatch('select', script);
  }

  // 处理键盘可访问性
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }
</script>

<li 
  class={`script-item flex items-center justify-between py-4 pl-4 pr-5 text-sm cursor-pointer relative
    ${isSelected 
      ? 'bg-[hsl(var(--primary)/0.1)] border-l-4 border-[hsl(var(--primary))] pl-3' 
      : 'hover:bg-[hsl(var(--secondary)/0.5)] border-l-4 border-transparent'} 
    transition-all duration-200 group`}
  on:click={handleClick}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
  aria-selected={isSelected}
>
  <div class="flex min-w-0 gap-x-4 flex-1 overflow-hidden">
    <div class="min-w-0 flex-auto">
      <div class="text-sm font-semibold truncate group-hover:text-[hsl(var(--primary))] transition-colors duration-200">
        {script.name}
      </div>
      <p class="mt-1 text-xs text-[hsl(var(--secondary-foreground))] line-clamp-2">
        {script.description || ''}
      </p>
    </div>
  </div>
  <div class="shrink-0 flex gap-2 ml-2">
    <a href={`/scripts/${script.id}`}
       class="btn btn-sm btn-secondary"
       on:click={(e) => e.stopPropagation()}
       aria-label={`${$t('script.details')} - ${script.name}`}
    >
       {$t('script.details')}
    </a>
    <a href={script.sourceUrl}
       class="btn btn-sm btn-outline-primary"
       target="_blank"
       rel="noreferrer"
       on:click={(e) => e.stopPropagation()}
       aria-label={`${$t('script.source')} - ${script.name}`}
    >
       {$t('script.source')}
    </a>
  </div>
  
  <!-- 选中状态指示器 -->
  {#if isSelected}
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-[hsl(var(--primary))] transition-all duration-300"></div>
  {/if}
</li>
