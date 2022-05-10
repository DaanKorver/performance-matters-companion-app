const cacheName = 'mijnhva-v1'
const cacheFiles = ['/']

self.addEventListener('install', e => {
	console.log('[Service Worker] Installed')
	e.waitUntil(async () => {
		const cache = await caches.open(cacheName)
		return cache.addAll(cacheFiles).then(() => self.skipWaiting())
	})
})
