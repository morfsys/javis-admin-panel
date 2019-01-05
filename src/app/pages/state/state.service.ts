import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  items: Array<any> = [
    {
      name: 'MAHARASHTRA',
      code: 'MAH',
      country: 'INDIA'
    },
    {
      name: 'WEST BENGAL',
      code: 'WB',
      country: 'INDIA'
    },
    {
      name: 'UTTAR PRADESH',
      code: 'UP',
      country: 'INDIA'
    }
  ];

  constructor() { }
  getItems(): Observable<Array<any>> {
    return of(this.items.map((c, i)=>c = {...c, _id: i+1}));
  }

  addItem(item): Observable<any> {
    
    return item._id == 0? new Observable(observer=>{
      try{
        let id = this.items.push(item);
        observer.next({...item, _id: id+1 });
      } catch(err) {
        observer.error(err);
      }
    }): new Observable(observer=>{
      try{
        this.items[item._id-1] = item;
        observer.next(item);
      } catch(err) {
        observer.error(err);
      }
    })
  }

  deleteItem(id) {
    console.log(id);
    return new Observable(observer=>{
      try{
        this.items.splice(id-1, 1);
        observer.next({success: true});
      } catch(err) {
        observer.error(err);
      }
    })
  }
  

}
