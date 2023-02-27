//Derived from grad slides code.
const apiRequestCacheName: string = "api-cache";

const cache: Promise<Cache> = caches.open(apiRequestCacheName);

async function getCachedRequest(requestUrl: string) {
    return await (await cache).match(requestUrl);
}

function isRequestInCache(requestUrl: string): boolean {
    const request = getCachedRequest(requestUrl).then();
    if (!request) return false;
    else return true;
}

function removeResponseFromCache(requestUrl) {
    return cache.delete(requestUrl);
}

function deleteEntireCache() {
    caches.delete(apiRequestCacheName);
}

function addRequestToCache(requestUrl) {
    cache.add(new Request(requestUrl));
}

export {
    getCachedRequest,
    isRequestInCache,
    removeResponseFromCache,
    deleteEntireCache,
    addRequestToCache,
};
