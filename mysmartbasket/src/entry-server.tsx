import { renderToString } from 'react-dom/server';
import App from './App.tsx';

// Used only at build time by scripts/prerender.mjs to turn the landing into
// static HTML. The browser never loads this file.
export function render(): string {
  return renderToString(<App />);
}
