import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ResourcesService } from "src/app/services/resources.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UQCService {
  items: Array<any> = [
    {
      code: "DUM",
      description: "this is the description"
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {}
  getItems(): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/uqc/list/" +
          this.resource.getUsername() +
          "/0"
      )
      .pipe(
        map(v =>
          v.map(e => {
            return {
              _id: e.uqcId,
              code: e.uqcCode,
              description: e.uqcDescription
            };
          })
        )
      );
  }

  addItem(item): Observable<any> {
    return item._id == 0
      ? this.http.post(environment.serverUrl + "/uqc/add", {
          userName: this.resource.getUsername().toUpperCase(),
          uqcCode: item.code,
          uqcDescription: item.description
        })
      : this.http.post(environment.serverUrl + "/uqc/edit", {
        userName: this.resource.getUsername().toUpperCase(),
        uqcId: item._id,
        uqcCode: item.code,
        uqcDescription: item.description
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
