import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ResourcesService } from "src/app/services/resources.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ChannelService {
  items: Array<any> = [
    {
      name: "Dummy",
      description: "this is description"
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {}

  getItems(): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/channel/list/" +
          this.resource.getUsername() +
          "/0"
      )
      .pipe(
        map(v =>
          v.map(e => {
            return {
              _id: e.channelId,
              name: e.channelName,
              description: e.companyDescription
            };
          })
        )
      );
  }

  addItem(item): Observable<any> {
    return item._id == 0
      ? this.http.post(environment.serverUrl + "/channel/add", {
          userName: this.resource.getUsername().toUpperCase(),
          "channelName": item.name,
          "channelDescription": item.description
        })
      : this.http.post(environment.serverUrl + "/channel/edit", {
        userName: this.resource.getUsername().toUpperCase(),
        channelId: item._id,
        "channelName": item.name,
        "channelDescription": item.description
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
