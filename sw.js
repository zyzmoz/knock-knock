function updateCache(request) {
  return caches.open(`knock-knock-pwa`).then(cache => {
      return fetch(request).then(response => {
          const resClone = response.clone();
          if (response.status < 400)
              return cache.put(request, resClone);
          return response;
      });
  });
}

self.addEventListener("fetch", (event) => {
  console.log(`Fetching ${event.request}`);
  event.respondWith(
    (async function () {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then(updateCache(event.request));
    })()
  );
});

self.addEventListener('message', function(event){
  updateCache(event.request)
});

