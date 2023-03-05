import { Observable } from 'rxjs';
import { IFlight, IofError } from '../types/interfaces';

const flightDataObservable$: Observable<IFlight[] | IofError> = new Observable((subscriber) => subscriber.next());

export default flightDataObservable$;
