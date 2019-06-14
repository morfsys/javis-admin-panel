import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ResourcesService } from "src/app/services/resources.service";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RetailerService {
  items: Array<any> = [
    {
      name: "Retailer name",
      mobile: "9876543210",
      altMobile: "9876543210",
      landline: {
        isd: "123",
        std: "1233",
        number: "213123"
      },
      address: "Address here",
      pincode: "400001",
      area: "adbad",
      city: "Mumbai",
      channel: "Dummy",
      FSSAILicense: "",
      latitude: "",
      longitude: "",
      endDate: ""
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {}

  getItems(): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/retailer/list/" +
          this.resource.getUsername() +
          "/0/0/0"
      )
      .pipe(
        map(v =>
          v.map(e => {
            return {
              _id: e.retailerId,
              name: e.retailerName,
              mobile: e.mobile,
              altMobile: e.alternateMobile,
              landline: {
                isd: e.isd,
                std: e.std,
                number: e.landline
              },
              address: e.address,
              pincode: e.pinCode,
              area: e.areaName,
              areaId: e.areaId,
              city: e.cityName,
              cityId: e.cityId,
              channel: e.channelName,
              channelId: e.channelId,
              FSSAILicense: e.fssaiLicense,
              latitude: e.latitude,
              longitude: e.longitude,
              endDate: e.endDate
            };
          })
        )
      );
  }

  addItem(item): Observable<any> {
    console.log(item);
    return item._id == 0
      ? this.http.post(environment.serverUrl + "/retailer/add", {
          userName: this.resource.getUsername().toUpperCase(),
          "retailerName": item.name,
          "mobile": item.mobile,
          "alternateMobile": item.altMobile,
          "isd": item.landline.isd,
          "std": item.landline.std,
          "landline": item.landline.number,
          "address": item.address,
          "pinCode": item.pincode,
          "areaId": item.area,
          "cityId": item.city,
          "channelId": item.channel,
          "fssaiLicense": item.FSSAILicense,
          "latitude": item.latitude,
          "longitude": item.longitude
        })
      : this.http.post(environment.serverUrl + "/retailer/edit", {
        userName: this.resource.getUsername().toUpperCase(),
        retailerId: item._id,
        "retailerName": item.name,
        "mobile": item.mobile,
        "alternateMobile": item.altMobile,
        "isd": item.landline.isd,
        "std": item.landline.std,
        "landline": item.landline.number,
        "address": item.address,
        "pinCode": item.pincode,
        "areaId": item.area,
        "cityId": item.city,
        "channelId": item.channel,
        "fssaiLicense": item.FSSAILicense,
        "latitude": item.latitude,
        "longitude": item.longitude,
        endDate: item.endDate
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
