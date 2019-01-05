import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  items: Array<any> = [
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

  getItems(): Observable<Array<any>> {
    return of(this.items.map((c, i)=>c = {...c, _id: i+1 }));
  }

  addItem(city): Observable<any> {
    return new Observable(observer=>{
      try {
        let id = this.items.push(city);
        observer.next({...city, _id: id+1});
      } catch(err) {
        observer.error(err);
      }
    })
  }

  
  deleteItem(id) {
    return new Observable(observer=>{
      try{
        this.items.splice(id-1, 1);
        observer.next({success: true});
      } catch(err) {
        observer.error(err);
      }
    })
  }
  issueSubmit = new Subject();
}
