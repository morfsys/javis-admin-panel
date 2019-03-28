import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ResourcesService } from "src/app/services/resources.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CountryService {
  items: Array<any> = [
    {
      name: "INDIA",
      code: "IND",
      isd: "+91",
      currency: "INDIAN RUPEE",
      currencyCode: "INR"
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {}

  getItems(): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/country/list/" +
          this.resource.getUsername() +
          "/0"
      )
      .pipe(
        map(v =>
          v.map(e => {
            return {
              _id: e.countryId,
              name: e.countryName,
              code: e.countryCode,
              isd: e.isdCode,
              currency: e.currencyName,
              currencyCode: e.currencyCode
            };
          })
        )
      );
  }

  addItem(item): Observable<any> {
    return item._id == 0
      ? this.http.post(
        environment.serverUrl + "/country/add",
        {
          userName: this.resource.getUsername().toUpperCase(),
          countryName: item.name,
          countryCode: item.code,
          isdCode: parseInt(item.isd),
          currencyCode: item.currencyCode,
          currencyName: item.currency
        }
      )
      : this.http.post(
        environment.serverUrl + "/country/edit",
        {
          countryId: item._id,
          userName: this.resource.getUsername().toUpperCase(),
          countryName: item.name,
          countryCode: item.code,
          isdCode: parseInt(item.isd),
          currencyCode: item.currencyCode,
          currencyName: item.currency
        }
      );
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
