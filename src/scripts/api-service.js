import {
	isRequestInCache,
	addRequestToCache,
	getCachedRequest,
} from "./web-storage";

const baseUrl = "http://opensky-network.org/api";

async function getAllStates() {
	if (!(await isRequestInCache(`${baseUrl}/states/all?extended=1`))) {
		addRequestToCache(`${baseUrl}/states/all?extended=1`);
		return await getCachedRequest(`${baseUrl}/states/all?extended=1`)
			.then((res) => res.json())
			.then((data) => {
				return data.states;
			});
	} else {
		return getCachedRequest(`${baseUrl}/states/all?extended=1`)
			.then((res) => res.json())
			.then((data) => {
				return data.states;
			});
	}
}

export { getAllStates };
