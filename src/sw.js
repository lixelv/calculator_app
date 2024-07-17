const CACHE_NAME = "calculator-cache-v1"
const urlsToCache = ["/", "/sw.js", "/manifest.json"]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    )
})

self.addEventListener("fetch", (event) => {
    if (!event.request.url.startsWith("http")) {
        return
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse
            }

            return fetch(event.request)
                .then((response) => {
                    if (response.status === 200 && response.type === "basic") {
                        const responseToCache = response.clone()
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache)
                        })
                    }
                    return response
                })
                .catch(() => {
                    if (event.request.mode === "navigate") {
                        return caches.match("/index.html")
                    }
                    return new Response("Resource unavailable offline", {
                        status: 503,
                        statusText: "Service Unavailable",
                        headers: new Headers({ "Content-Type": "text/plain" }),
                    })
                })
        })
    )
})

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})
