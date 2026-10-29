// Prerenders the landing page into dist/index.html so crawlers (Google,
// social previews) and users see the full content before any
// JavaScript runs. Runs after `vite build` and `vite build --ssr`.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const serverDir = path.join(root, 'dist-server');

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

const template = readFileSync(htmlPath, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}

writeFileSync(htmlPath, template.replace(placeholder, `<div id="root">${render()}</div>`));
rmSync(serverDir, { recursive: true, force: true });
console.log('prerender: dist/index.html written with the rendered landing');
