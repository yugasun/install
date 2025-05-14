import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ScriptService } from '$lib/services/ScriptService';

export const GET: RequestHandler = async () => {
  try {
    const scripts = await ScriptService.getScripts();
    return json(scripts);
  } catch (error) {
    return json({ error: 'Failed to fetch scripts' }, { status: 500 });
  }
};