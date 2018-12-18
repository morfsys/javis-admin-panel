import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  states: Array<any> = [
    {
      name: 'Maharashtra',
      code: 'MAH',
      country: 'India'
    },
    {
      name: 'West Bengal',
      code: 'WB',
      country: 'India'
    },
    {
      name: 'Uttar Pradesh',
      code: 'UP',
      country: 'India'
    }
  ];

  constructor() { }

  getStates(): Observable<Array<any>> {
    return of(this.states);
  }

}
