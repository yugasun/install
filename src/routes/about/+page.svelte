<script lang="ts">
  import { onMount } from 'svelte';
  import { ScriptService } from '$lib/services/ScriptService';
  import { t } from '$lib/i18n';
  
  let scriptCount = 0;
  
  onMount(async () => {
    try {
      const scripts = await ScriptService.getScripts();
      scriptCount = scripts.length;
    } catch (error) {
      console.error('获取脚本数量失败', error);
    }
  });
</script>

<svelte:head>
  <title>Install Scripts - {$t('about.title')}</title>
  <meta name="description" content={$t('about.subtitle')} />
</svelte:head>

<div class="max-w-4xl mx-auto px-6 py-8 lg:px-8">
  <div class="mb-10 text-center">
    <h1 class="text-4xl font-bold tracking-tight mb-4">{$t('about.title')}</h1>
    <p class="text-[hsl(var(--secondary-foreground))] max-w-2xl mx-auto text-lg">
      {$t('about.subtitle')}
    </p>
  </div>
  
  <!-- 统计数据卡片 -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <div class="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
      <div class="text-4xl font-bold text-[hsl(var(--primary))]">{scriptCount}</div>
      <div class="mt-2 text-[hsl(var(--secondary-foreground))]">可用脚本</div>
    </div>
    <div class="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
      <div class="text-4xl font-bold text-[hsl(var(--primary))]">2</div>
      <div class="mt-2 text-[hsl(var(--secondary-foreground))]">支持语言</div>
    </div>
    <div class="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
      <div class="text-4xl font-bold text-[hsl(var(--primary))]">3+</div>
      <div class="mt-2 text-[hsl(var(--secondary-foreground))]">主题选项</div>
    </div>
  </div>
  
  <div class="prose prose-lg dark:prose-invert prose-headings:font-semibold prose-a:text-[hsl(var(--primary))] max-w-none bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))] p-6 md:p-8 shadow-sm">
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-[hsl(var(--border))]">{$t('about.whatIs')}</h2>
      <p class="leading-relaxed">{$t('about.description')}</p>
      
      <div class="mt-6 bg-[hsl(var(--secondary)/0.3)] border-l-4 border-[hsl(var(--primary))] rounded p-4">
        <p class="italic text-[hsl(var(--secondary-foreground))]">
          简单、快速、安全的安装体验 — 让复杂的安装过程变得轻松。
        </p>
      </div>
    </section>
    
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-[hsl(var(--border))]">{$t('about.howWorks')}</h2>
      <p class="leading-relaxed">{$t('about.workingDescription')}</p>
      
      <div class="flex flex-col md:flex-row gap-4 mt-6">
        <div class="bg-[hsl(var(--background))] rounded-lg p-4 flex-1 border border-[hsl(var(--border))]">
          <div class="w-10 h-10 bg-[hsl(var(--primary)/0.1)] rounded-full flex items-center justify-center text-[hsl(var(--primary))] font-bold mb-3">1</div>
          <p class="font-medium">{$t('about.step1')}</p>
        </div>
        <div class="bg-[hsl(var(--background))] rounded-lg p-4 flex-1 border border-[hsl(var(--border))]">
          <div class="w-10 h-10 bg-[hsl(var(--primary)/0.1)] rounded-full flex items-center justify-center text-[hsl(var(--primary))] font-bold mb-3">2</div>
          <p class="font-medium">{$t('about.step2')}</p>
        </div>
        <div class="bg-[hsl(var(--background))] rounded-lg p-4 flex-1 border border-[hsl(var(--border))]">
          <div class="w-10 h-10 bg-[hsl(var(--primary)/0.1)] rounded-full flex items-center justify-center text-[hsl(var(--primary))] font-bold mb-3">3</div>
          <p class="font-medium">{$t('about.step3')}</p>
        </div>
      </div>
    </section>
    
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-[hsl(var(--border))]">{$t('about.contribute')}</h2>
      <p class="leading-relaxed">
        {$t('about.contributeDesc')}
        <a href="https://github.com/yugasun/install" target="_blank" rel="noreferrer" class="font-medium hover:underline inline-flex items-center">
          GitHub
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </p>
      
      <div class="mt-6 bg-[hsl(var(--success-bg))] rounded-lg p-4 border border-[hsl(var(--success)/0.3)]">
        <p class="text-[hsl(var(--success))] font-medium flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          欢迎提交您自己编写的安装脚本，帮助更多开发者提高工作效率！
        </p>
      </div>
    </section>
    
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-[hsl(var(--border))]">{$t('about.security')}</h2>
      <p class="leading-relaxed">{$t('about.securityDesc')}</p>
      
      <div class="mt-6 space-y-3">
        <div class="flex items-start">
          <div class="bg-[hsl(var(--primary)/0.1)] rounded-full p-1 mr-3 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[hsl(var(--primary))]" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <p>{$t('about.securityItem1')}</p>
        </div>
        <div class="flex items-start">
          <div class="bg-[hsl(var(--primary)/0.1)] rounded-full p-1 mr-3 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[hsl(var(--primary))]" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <p>{$t('about.securityItem2')}</p>
        </div>
        <div class="flex items-start">
          <div class="bg-[hsl(var(--primary)/0.1)] rounded-full p-1 mr-3 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[hsl(var(--primary))]" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <p>{$t('about.securityItem3')}</p>
        </div>
      </div>
    </section>
    
    <section>
      <h2 class="text-2xl font-bold mb-4 pb-2 border-b border-[hsl(var(--border))]">{$t('about.contact')}</h2>
      <p class="leading-relaxed">
        {$t('about.contactDesc')}
        <a href="https://github.com/yugasun" target="_blank" rel="noreferrer" class="font-medium hover:underline inline-flex items-center">
          Yuga Sun
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </p>
    </section>
  </div>
</div>