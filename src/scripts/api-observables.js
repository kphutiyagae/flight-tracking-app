import { map, Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { getCachedRequest } from "./web-storage";
import { baseUrl } from "./api-service";

const flightData = [];

function getFlightData() {
	fromFetch(`${baseUrl}/states/all?extended=1`).pipe(
		map((response) => {
			return response.json();
		}),
		switchMa
	);
}

export const flightDataObservable$ = new Observable((subscriber) =>
	subscriber.next()
);
