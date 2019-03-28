import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ResourcesService } from "src/app/services/resources.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class StateService {
  items: Array<any> = [
    {
      name: "MAHARASHTRA",
      code: "MAH",
      country: "INDIA"
    },
    {
      name: "WEST BENGAL",
      code: "WB",
      country: "INDIA"
    },
    {
      name: "UTTAR PRADESH",
      code: "UP",
      country: "INDIA"
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {
    this.retrieveItems();
  }
  getItems(): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/state/list/" +
          this.resource.getUsername() +
          "/0/0"
      )
      .pipe(
        map(v =>
          v.map(e => {
            return {
              _id: e.stateId,
              name: e.stateName,
              code: e.stateCode,
              country: e.countryName,
              countryId: e.countryId
            };
          })
        )
      );
  }

  retrieveItems() {
    return this.http
      .get(
        environment.serverUrl +
          "/state/list/" +
          this.resource.getUsername() +
          "/0/0"
      )
      .pipe(map(v => []))
      .subscribe(v => {
        this.items = v;
      });
  }

  addItem(item): Observable<any> {
    return item._id == 0
      ? this.http.post(environment.serverUrl + "/state/add", {
          userName: this.resource.getUsername().toUpperCase(),
          stateId: 0,
          stateName: item.name,
          stateCode: item.code,
          countryId: item.country
        })
      : this.http.post(
        environment.serverUrl + "/state/edit",
        {
          userName: this.resource.getUsername().toUpperCase(),
          stateId: item._id,
          stateName: item.name,
          stateCode: item.code,
          countryId: item.country
        }
      );
  }

  deleteItem(id) {
    console.log(id);
    return new Observable(observer => {
      try {
        this.items.splice(id - 1, 1);
        observer.next({ success: true });
      } catch (err) {
        observer.error(err);
      }
    });
  }
}
