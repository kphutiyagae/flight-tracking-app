const baseUrl = "http://opensky-network.org/api";

async function getAllStates() {
	return await fetch(`${baseUrl}/states/all?extended=1`)
		.then((res) => res.json())
		.then((data) => {
			return data.states;
		});
}

//Make use of observable.

export { getAllStates };
