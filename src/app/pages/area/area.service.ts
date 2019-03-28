import { Injectable } from "@angular/core";
import { of, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ResourcesService } from "src/app/services/resources.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AreaService {
  items: Array<any> = [
    {
      name: "Dummy",
      city: "MUMBAI"
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {}
  getItems(cityFilter?: string): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/area/list/" +
          this.resource.getUsername() +
          "/0/0"
      )
      .pipe(
        map(v =>
          v
            .map(e => {
              return {
                _id: e.areaId,
                name: e.areaName,
                city: e.cityName,
                cityId: e.cityId
              };
            })
            .filter(
              c => !(cityFilter && cityFilter != "") || c.cityId == cityFilter
            )
        )
      );
  }

  addItem(item): Observable<any> {
    return item._id == 0
      ? this.http.post(environment.serverUrl + "/area/add", {
          userName: this.resource.getUsername().toUpperCase(),
          areaName: item.name,
          cityId: item.city
        })
      : this.http.post(environment.serverUrl + "/area/edit", {
          userName: this.resource.getUsername().toUpperCase(),
          areaId: item._id,
          areaName: item.name,
          cityId: item.city
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

  issueSubmit = new Subject();
}
