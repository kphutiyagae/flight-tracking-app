//Derived from grad slides code.
const apiRequestCacheName: string = "api-cache";

const cache: Promise<Cache> = caches.open(apiRequestCacheName);

async function getCachedRequest(requestUrl: string) {
    return (await cache).match(requestUrl);
}

async function removeResponseFromCache(requestUrl: string): Promise<void> {
    (await cache).delete(requestUrl);
}

async function deleteEntireCache(): Promise<void> {
    (await cache).delete(apiRequestCacheName);
}

async function addRequestToCache(requestUrl: string): Promise<void> {
    (await cache).add(new Request(requestUrl));
}

async function isRequestInCache(requestUrl: string) {
    const request = await getCachedRequest(requestUrl);
    if (!request) return false;
    else return true;
}

export {
    getCachedRequest,
    isRequestInCache,
    removeResponseFromCache,
    deleteEntireCache,
    addRequestToCache,
};
