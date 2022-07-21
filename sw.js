self.addEventListener('fetch', event => {
  console.log(`Fetching ${event.request.url}`);
  // normally this is where the service worker checks to see
  // if the requested resource is in the local cache or not.
  // Here for the time being jit just goes to get the requested resource from the network,
  event.respondWith(fetch(event.request));
});