import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {
  items: Array<any> = [
    {
    name: "Retailer name",
    mobile: "9876543210",
    altMobile: "9876543210",
    landline: "2316499",
    address: "Address here",
    pincode: "400001",
    area: "adbad",
    city: "Mumbai",
    channel: "",
    FSSAILicense: "",
    latitude: "",
    longitude: "",
    endDate: ""
  }
];
  

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
}
