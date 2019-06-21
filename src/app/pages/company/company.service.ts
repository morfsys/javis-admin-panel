import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ResourcesService } from "src/app/services/resources.service";

@Injectable({
  providedIn: "root"
})
export class CompanyService {
  companies: Array<any> = [
    {
      name: "Dummy",
      code: "DUM",
      gstin: "AHJDK21321SDSA",
      pan: "ASD321",
      address_1: "Address line 1",
      address_2: "Address line 2",
      pincode: "400001",
      city: "MUMBAI",
      emailId: ""
    }
  ];

  constructor(private http: HttpClient, private resource: ResourcesService) {
  }

  getCompanies(): Observable<Array<any>> {
    return this.http
      .get<Array<any>>(
        environment.serverUrl +
          "/company/list/" +
          this.resource.getUsername() +
          "/0"
      )
      .pipe(
        map(v =>
          v.map(e => {
            return {
              _id: e.companyId,
              name: e.companyName,
              code: e.companyCode,
              gstin: e.gstin,
              pan: e.pan,
              address_1: e.address1,
              address_2: e.address2,
              pincode: e.pinCode,
              city: e.cityName,
              cityId: e.cityId,
              emailId: e.emailId,
            };
          })
        )
      );
    return of(this.companies.map((c, i) => (c = { ...c, _id: i + 1 })));
  }

  addCompany(item): Observable<any> {
    return item._id == 0
      ? this.http.post(
        environment.serverUrl + "/company/add",
        {
          userName: this.resource.getUsername().toUpperCase(),
          "companyName": item.name,
          "companyCode": item.code,
          "gstin": item.gstin,
          "pan": item.pan,
          "address1": item.address_1,
          "address2": item.address_2,
          "cityId": item.city,
          "pinCode": item.pincode,
          "emailId": item.emailId
        }
      )
      : this.http.post(
        environment.serverUrl + "/company/edit",
        {
          userName: this.resource.getUsername().toUpperCase(),
          companyId: item._id,
          "companyName": item.name,
          "companyCode": item.code,
          "gstin": item.gstin,
          "pan": item.pan,
          "address1": item.address_1,
          "address2": item.address_2,
          "cityId": item.city,
          "pinCode": item.pincode,
          "emailId": item.emailId
        }
      );
  }

  deleteCompany(id) {
    return new Observable(observer => {
      try {
        this.companies.splice(id - 1, 1);
        observer.next({ success: true });
      } catch (err) {
        observer.error(err);
      }
    });
  }
}
