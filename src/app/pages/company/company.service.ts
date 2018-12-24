import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
    city: "MUMBAI"
  }
];
  

  getCompanies(): Observable<Array<any>> {
    return of(this.companies.map((c, i)=>c = {...c, _id: i+1}));
  }

  addCompany(company): Observable<any> {
    
    return company._id == 0? new Observable(observer=>{
      try{
        let id = this.companies.push(company);
        observer.next({...company, _id: id+1 });
      } catch(err) {
        observer.error(err);
      }
    }): new Observable(observer=>{
      try{
        this.companies[company._id-1] = company;
        observer.next(company);
      } catch(err) {
        observer.error(err);
      }
    })
  }

  deleteCompany(id) {
    return new Observable(observer=>{
      try{
        this.companies.splice(id-1, 1);
        observer.next({success: true});
      } catch(err) {
        observer.error(err);
      }
    })
  }
  
  constructor() { }
}
