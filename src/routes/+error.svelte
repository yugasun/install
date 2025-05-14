<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="max-w-5xl mx-auto min-h-[60vh] flex flex-col items-center justify-center px-6 py-12 lg:px-8">
  <h1 class="text-3xl font-bold mb-4 text-center">
    {$page.status}: {$page.error?.message || '发生错误'}
  </h1>
  
  <p class="text-[hsl(var(--secondary-foreground))] mb-6 text-center max-w-lg">
    {#if $page.status === 404}
      抱歉，您请求的页面不存在。
    {:else}
      抱歉，请求处理过程中发生了错误。
    {/if}
  </p>
  
  <a 
    href="/" 
    class="px-4 py-2 rounded-md bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
  >
    返回主页
  </a>
</div>