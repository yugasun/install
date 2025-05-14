import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ScriptService } from '$lib/services/ScriptService';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;
    
    if (!id) {
      return json({ error: 'Script ID is required' }, { status: 400 });
    }
    
    const scripts = await ScriptService.getScripts();
    const script = scripts.find(s => s.id === id);
    
    if (!script) {
      return json({ error: 'Script not found' }, { status: 404 });
    }
    
    return json(script);
  } catch (error) {
    return json({ error: 'Failed to fetch script' }, { status: 500 });
  }
};