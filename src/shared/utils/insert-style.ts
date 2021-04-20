const cache: {
  [key: string]: HTMLStyleElement;
} = {};

function createStyle (id: string) {
  let element: HTMLStyleElement | null = document.getElementById(id) as (HTMLStyleElement | null);

  if (element) {
    return element;
  }
  
  element = document.createElement('style');
  element.setAttribute('type', 'text/css');

  document.head.appendChild(element);
  
  return element;
}

export function insertStyle (styles: string, options?: { id: string }) {
  const id = (options && options.id) || styles;
  const element = cache[id] = (cache[id] || createStyle(id));
  
  if ('textContent' in element) {
    element.textContent += styles;
  } else {
    (element as any).styleSheet.cssText += styles;
  }
}
