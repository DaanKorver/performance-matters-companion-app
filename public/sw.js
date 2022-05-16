//Static Cache
const STATIC_CACHE_NAME = 'mijnhva-static-v1'
const STATIC_ASSETS = [
	'/',
	'/scripts/main.js',
	'/scripts/modules/drag.min.js',
	'/scripts/modules/navigation.min.js',
	'/styles/style.min.css',
	'/assets/fonts/OpenSans-Regular.woff2',
	'/assets/fonts/OpenSans-Regular.woff',
	'/assets/fonts/OpenSans-Regular.ttf',
	'/assets/fonts/OpenSans-Medium.woff2',
	'/assets/fonts/OpenSans-Medium.woff',
	'/assets/fonts/OpenSans-Medium.ttf',
	'/assets/images/instructions/instruction1.avif',
	'/assets/images/instructions/instruction1.webp',
	'/assets/images/instructions/instruction1.jpg',
	'/assets/images/instructions/instruction2.avif',
	'/assets/images/instructions/instruction2.webp',
	'/assets/images/instructions/instruction2.jpg',
	'/assets/images/instructions/instruction3.avif',
	'/assets/images/instructions/instruction3.webp',
	'/assets/images/instructions/instruction3.jpg',
	'/assets/images/instructions/instruction4.avif',
	'/assets/images/instructions/instruction4.webp',
	'/assets/images/instructions/instruction4.jpg',
	'/assets/images/wave.png',
	'/assets/images/chevron-down.png',
	'/assets/images/chevron-right.svg',
	'/assets/video/MijnHvA-demo.m4v',
	'/assets/images/message.svg',
	'/assets/images/storing.svg',
	'/offline',
]

// Dynamic Cache
const DYNAMIC_CACHE_NAME = 'mijnhva-dynamic-v1'

//Installing the Service Worker
self.addEventListener('install', event => {
	// console.log('Service Worker has been installed')
	event.waitUntil(
		caches.open(STATIC_CACHE_NAME).then(cache => {
			console.log('caching shell assets')
			cache.addAll(STATIC_ASSETS)
		})
	)
})

//Activate event
self.addEventListener('activate', event => {
	// console.log('Service worker has been activated')
	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys
					.filter(
						key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME
					)
					.map(key => caches.delete(key))
			)
		})
	)
})

//Fetch event
self.addEventListener('fetch', event => {
	// console.log('fetch event', event)
	event.respondWith(
		caches
			.match(event.request)
			.then(cacheRes => {
				return (
					cacheRes ||
					fetch(event.request).then(fetchRes => {
						return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
							cache.put(event.request.url, fetchRes.clone())
							return fetchRes
						})
					})
				)
			})
			.catch(() => caches.match('/offline'))
	)
})
