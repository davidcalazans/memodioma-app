// sw.js
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado.');
});

self.addEventListener('fetch', (event) => {
  // Obrigatório: intercepta as requisições (pode ser expandido para cache offline no futuro)
  event.respondWith(fetch(event.request));
});