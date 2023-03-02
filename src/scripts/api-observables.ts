import { map, Observable } from "rxjs";

export const flightDataObservable$ = new Observable((subscriber) =>
    subscriber.next()
);