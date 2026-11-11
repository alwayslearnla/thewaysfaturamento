// Service worker: guarda o app para abrir offline.
// Com internet, sempre busca a versão mais nova (ignora o cache HTTP do GitHub Pages, que dura 10 minutos).
// Ao publicar uma versão nova, troque o número abaixo para o navegador instalar o service worker novo.
// As bibliotecas do Anonimizador (pasta lib/, com a versão no nome do arquivo) são buscadas só quando o menu é aberto,
// ficam guardadas e passam de uma versão do app para a outra sem baixar de novo.
const CACHE = 'theways-recebimentos-2026.11.11-3';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
const isLib = url => new URL(url).pathname.indexOf('/lib/') >= 0;
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => fetch(f, {cache: 'no-store'}).then(r => c.put(f, r))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(async ks => {
    const novo = await caches.open(CACHE);
    for (const k of ks) {
      if (k === CACHE) continue;
      try {
        const velho = await caches.open(k);
        for (const req of await velho.keys()) if (isLib(req.url) && !(await novo.match(req))) { const r = await velho.match(req); if (r) await novo.put(req, r); }
      } catch (err) {}
      await caches.delete(k);
    }
  }).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  if (isLib(e.request.url)) {
    e.respondWith(caches.match(e.request).then(m => m || fetch(e.request).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return r;
    })));
    return;
  }
  e.respondWith(
    fetch(e.request, {cache: 'no-store'}).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
