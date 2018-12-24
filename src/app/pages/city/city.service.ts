import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cities: Array<any> = [
    {
      name: "MUMBAI",
      code: "MUM",
      population: 2500000,
      stdCode: "400001",
      state: "MAHARASHTRA"
    },
    {
      name: "PUNE",
      code: "PUN",
      population: 2500000,
      stdCode: "300001",
      state: "MAHARASHTRA"
    },
    {
      name: "KOLKATA",
      code: "KOL",
      population: 2500000,
      stdCode: "910001",
      state: "WEST BENGAL"
    },
  ]
  constructor() { }

  getCities(): Observable<Array<any>> {
    return of(this.cities.map((c, i)=>c = {...c, _id: i+1 }));
  }

  addCity(city): Observable<any> {
    return new Observable(observer=>{
      try {
        let id = this.cities.push(city);
        observer.next({...city, _id: id+1});
      } catch(err) {
        observer.error(err);
      }
    })
  }

  issueSubmit = new Subject();
}
