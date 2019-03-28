import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ResourcesService } from 'src/app/services/resources.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  items: Array<any> = [
    {
    name: "Dummy",
    code: "DUM",
    gstin: "AHJDK21321SDSA",
    pan: "ASD321",
    address_1: "Address line 1",
    address_2: "Address line 2",
    pincode: "400001",
    city: "MUMBAI"
  }
];
  
constructor(
  private http: HttpClient,
  private resource: ResourcesService
) {
  this.retrieveItems();
}

  getItems(): Observable<Array<any>> {
    return of(this.items.map((c, i)=>c = {...c, _id: i+1}));
  }

  retrieveItems() {
    return this.http
      .get(
        environment.serverUrl +
          "/outlet/list/" +
          this.resource.getUsername() +
          "/0"
      )
      .pipe(map(v => []))
      .subscribe(v => {
        this.items = v;
      });
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
}
