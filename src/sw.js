const CACHE_NAME = "calculator-cache-v1"
const urlsToCache = [
    "/",
    "/sw.js",
    "/manifest.json",
    "/src/index.html",
    "/src/style.css",
    "/src/script.js",
    "/src/decimal.js",
    "/src/assets/logo-512.png",
    "/src/assets/SF-Pro-Rounded-Bold.otf",
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Если получили ответ от сети, клонируем его и кэшируем
                if (response.status === 200) {
                    const responseToCache = response.clone()
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache)
                        })
                        .catch((err) => console.error("Caching failed:", err))
                }
                return response
            })
            .catch(() => {
                // Если не удалось получить из сети, пробуем из кэша
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse
                    }
                    // Если нет в кэше, возвращаем ошибку или fallback
                    console.log(
                        "No response found in cache. Falling back to network error."
                    )
                    return new Response("Network error happened", {
                        status: 408,
                        headers: { "Content-Type": "text/plain" },
                    })
                })
            })
    )
})

// Очистка старых кэшей при активации
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})
