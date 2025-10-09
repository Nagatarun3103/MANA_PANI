/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, options, delay } = event.data.payload;

    if (delay > 0) {
      setTimeout(() => {
        self.registration.showNotification(title, options);
      }, delay);
    }
  }
});

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
