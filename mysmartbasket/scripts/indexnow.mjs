// Avisa a los buscadores que usan IndexNow (Bing, Yandex, Seznam, Naver...) de
// las URLs del sitemap. Uso: `npm run indexnow` desde mysmartbasket/ DESPUÉS de
// publicar (el archivo de la clave tiene que estar ya en producción).
// Pasa URLs concretas como argumentos para enviar solo esas.
// La clave no es secreta: IndexNow exige publicarla en la raíz del sitio
// (public/<clave>.txt) para verificar que el dominio es tuyo.
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const host = 'mysmartbasket.app';

const keyFile = readdirSync(path.join(root, 'public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('indexnow: no hay archivo de clave (public/<32 hex>.txt)');
const key = keyFile.replace('.txt', '');
if (readFileSync(path.join(root, 'public', keyFile), 'utf8').trim() !== key) {
  throw new Error('indexnow: el contenido del archivo de clave no coincide con su nombre');
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args
  : [...readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// Comprueba que la clave ya es accesible en producción antes de enviar nada.
const keyLocation = `https://${host}/${keyFile}`;
const check = await fetch(keyLocation);
if (!check.ok || (await check.text()).trim() !== key) {
  throw new Error(`indexnow: ${keyLocation} no responde con la clave (¿falta publicar?)`);
}

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});
console.log(`indexnow: ${urlList.length} URLs enviadas -> HTTP ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exit(1);
}
