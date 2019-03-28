import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ResourcesService } from "src/app/services/resources.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BankService {
  items: Array<any> = [
    {
      name: "Dummy",
      country: "INDIA"
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {}

  getItems(): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/bank/list/" +
          this.resource.getUsername() +
          "/0/0"
      )
      .pipe(
        map(v =>
          v.map(e => {
            return {
              _id: e.bankId,
              name: e.bankName,
              country: e.countryName,
              countryId: e.countryId
            };
          })
        )
      );
    return of(this.items.map((c, i) => (c = { ...c, _id: i + 1 })));
  }

  addItem(item): Observable<any> {
    return item._id == 0
      ? this.http.post(environment.serverUrl + "/bank/add", {
          userName: this.resource.getUsername().toUpperCase(),
          bankName: item.name,
          countryId: item.country
        })
      : this.http.post(environment.serverUrl + "/bank/edit", {
        userName: this.resource.getUsername().toUpperCase(),
        bankId: item._id,
        bankName: item.name,
        countryId: item.country
      });
  }

  deleteItem(id) {
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
