import adapter from '@sveltejs/adapter-static'; // 改用静态站点适配器
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// 使用静态适配器以支持 GitHub Pages 部署
		adapter: adapter({
			// 默认构建输出到 build 目录
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		// 使用自定义域名不需要 base path
		paths: {
			// 如果设置了 BASE_PATH 环境变量，使用它，否则使用空字符串（根路径）
			base: process.env.BASE_PATH || ''
		}
	}
};

export default config;
