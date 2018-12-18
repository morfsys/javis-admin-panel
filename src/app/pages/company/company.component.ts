import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {


  companies: Array<any>;
  viewCompany = false;
  editId: number = -1;
  company = {};

  constructor(
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      this.viewCompany = false;
    });
  }
  companySubmitted() {
    this.getCompanies();
  }

  editCompany(company) {
    this.company = company;
    this.viewCompany = true;
  }





}
