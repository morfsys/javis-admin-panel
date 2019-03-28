import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResourcesService } from 'src/app/services/resources.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
  constructor(
    private http: HttpClient,
    private resource: ResourcesService
  ) { 
  }

  getItems(): Observable<Array<any>> {
    return this.http
    .get<Array<any>>(
      environment.serverUrl +
        "/city/list/" +
        this.resource.getUsername() +
        "/0/0"
    )
    .pipe(
      map(v =>
        v.map(e => {
          return {
            _id: e.cityId,
            name: e.cityName,
            code: e.cityCode,
            population: e.population,
            stdCode: e.stdCode,
            state: e.stateName,
            stateId: e.stateId
          };
        })
      )
    );
  }

  addItem(item): Observable<any> {
    return item._id == 0
      ? this.http.post(
        environment.serverUrl + "/city/add",
        {
          userName: this.resource.getUsername().toUpperCase(),
          cityName: item.name,
          cityCode: item.code,
          stateId: item.state,
          population: item.population,
          stdCod: item.stdCode
        }
      )
      : this.http.post(
        environment.serverUrl + "/city/edit",
        {
          cityId: item._id,
          userName: this.resource.getUsername().toUpperCase(),
          cityName: item.name,
          cityCode: item.code,
          stateId: item.state,
          population: item.population,
          stdCod: item.stdCode
        }
      );
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
