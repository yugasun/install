<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Script } from '$lib/types';
  import { t } from '$lib/i18n';

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
  class={`script-item flex items-center justify-between py-4 pl-4 pr-5 text-sm cursor-pointer transition-colors
    ${isSelected 
      ? 'bg-[hsl(var(--primary)/0.1)] border-l-4 border-[hsl(var(--primary))] pl-3' 
      : 'hover:bg-[hsl(var(--secondary)/0.5)]'}`}
  on:click={handleClick}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
  aria-selected={isSelected}
>
  <div class="flex min-w-0 gap-x-4 flex-1 overflow-hidden">
    <div class="min-w-0 flex-auto">
      <div class="text-sm font-semibold truncate">{script.name}</div>
      <p class="mt-1 text-xs text-[hsl(var(--secondary-foreground))] line-clamp-2">{script.description || ''}</p>
    </div>
  </div>
  <div class="shrink-0 flex gap-2 ml-2">
    <a href={`/scripts/${script.id}`}
       class="flex w-auto justify-center rounded-md bg-[hsl(var(--secondary))] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--secondary-foreground))] shadow-sm hover:bg-[hsl(var(--secondary)/0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--primary))]"
       on:click={(e) => e.stopPropagation()}
       aria-label={`${$t('script.details')} - ${script.name}`}
    >
       {$t('script.details')}
    </a>
    <a href={script.sourceUrl}
       class="flex w-auto justify-center rounded-md border border-[hsl(var(--primary))] bg-transparent px-3 py-1.5 text-xs font-semibold text-[hsl(var(--primary))] shadow-sm hover:bg-[hsl(var(--primary)/0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--primary))]"
       target="_blank"
       rel="noreferrer"
       on:click={(e) => e.stopPropagation()}
       aria-label={`${$t('script.source')} - ${script.name}`}
    >
       {$t('script.source')}
    </a>
  </div>
</li>
