import type { Script, ScriptsData } from '$lib/types';
import { browser } from '$app/environment';

export class ScriptService {
  /**
   * 获取所有脚本数据
   */
  static async getScripts(): Promise<Script[]> {
    try {
      const response = await fetch('/scripts.json');
      const data: ScriptsData = await response.json();
      
      // 为每个脚本添加唯一ID和安装命令
      return data.scripts.map((script, index) => {
        const baseUrl = browser ? window.location.origin : '';
        const scriptUrl = script.url.startsWith('http') ? script.url : `${baseUrl}/installs/${script.url}`;
        const command = `curl -fsSL ${scriptUrl} | bash`;
        
        return {
          ...script,
          id: `script-${index}`,
          command: script.command || command
        };
      });
    } catch (error) {
      console.error('加载脚本数据失败:', error);
      throw new Error('加载脚本数据失败');
    }
  }
  
  /**
   * 根据ID获取单个脚本
   */
  static async getScript(id: string): Promise<Script> {
    try {
      const scripts = await this.getScripts();
      const script = this.findScriptById(scripts, id);
      
      if (!script) {
        throw new Error(`Script with ID ${id} not found`);
      }
      
      return script;
    } catch (error) {
      console.error(`加载脚本 ${id} 失败:`, error);
      throw new Error(`加载脚本 ${id} 失败`);
    }
  }
  
  /**
   * 根据ID获取脚本
   */
  static findScriptById(scripts: Script[], id: string): Script | undefined {
    return scripts.find(script => script.id === id);
  }
  
  /**
   * 根据名称搜索脚本
   */
  static searchScripts(scripts: Script[], keyword: string): Script[] {
    if (!keyword) return scripts;
    
    const lowerKeyword = keyword.toLowerCase();
    return scripts.filter(script => 
      script.name.toLowerCase().includes(lowerKeyword) || 
      script.description.toLowerCase().includes(lowerKeyword)
    );
  }
}