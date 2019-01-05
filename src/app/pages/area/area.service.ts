import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  items: Array<any> = [
    {
    name: "Dummy",
    city: "MUMBAI"
  }
];
  

  getItems(cityFilter?: string): Observable<Array<any>> {
    let items = [...this.items];
    if(cityFilter && cityFilter != '') {
      items = items.filter(c=>c.city == cityFilter);
    }

    return of(items.map((c, i)=>c = {...c, _id: i+1}));
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
    return new Observable(observer=>{
      try{
        this.items.splice(id-1, 1);
        observer.next({success: true});
      } catch(err) {
        observer.error(err);
      }
    })
  }
  
  constructor() { }

  issueSubmit = new Subject();
}
