import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  states: Array<any> = [
    {
      name: 'MAHARASHTRA',
      code: 'MAH',
      country: 'India'
    },
    {
      name: 'WEST BENGAL',
      code: 'WB',
      country: 'India'
    },
    {
      name: 'UTTAR PRADESH',
      code: 'UP',
      country: 'India'
    }
  ];

  constructor() { }

  getStates(): Observable<Array<any>> {
    return of(this.states);
  }

}
