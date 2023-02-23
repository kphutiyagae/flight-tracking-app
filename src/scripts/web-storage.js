//Derived from grad slides code.
const apiRequestCacheName = "api-cache";

const cache = await caches.open(apiRequestCacheName);

async function getCachedRequest(requestUrl) {
	return await cache.match(requestUrl);
}

async function isRequestInCache(requestUrl) {
	const request = await getCachedRequest(requestUrl);
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
