import type { Action } from 'svelte/action';

/** 
 * A custom Svelte directive for handling clicks outside an element
 * Used for closing dropdown menus when clicking outside
 */

export function clickOutside(node: HTMLElement, { enabled = true, callback }: { enabled: boolean; callback: () => void }) {
  const handleOutsideClick = (event: MouseEvent) => {
    if (!enabled) return;
    
    // Check if the click is outside the node
    const target = event.target as Node;
    if (node && !node.contains(target) && !event.defaultPrevented) {
      callback();
    }
  };

  // Add the event listener
  document.addEventListener('click', handleOutsideClick, true);

  return {
    update({ enabled: newEnabled, callback: newCallback }: { enabled: boolean; callback: () => void }) {
      enabled = newEnabled;
      callback = newCallback;
    },
    destroy() {
      document.removeEventListener('click', handleOutsideClick, true);
    }
  };
}