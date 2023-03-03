import { Observable } from 'rxjs';

const flightDataObservable$ = new Observable((subscriber) => subscriber.next());

export default flightDataObservable$;
