import { CompanyService } from './company.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  @Input('items') items;
  @Output() updateItem = new EventEmitter();
  @Output() updateList = new EventEmitter();

  dtOptions = {};

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
  }

  addCompany() {
    this.updateItem.emit({
      item: {
        _id: 0,
        name: '',
        code: '',
        gstin: '',
        pan: '',
        pincode: '',
        city: ''
      }
    });
  }

  updateCompany(item) {
    this.updateItem.emit({
      item: item
    })
  }

  deleteCompany(id) {
    this.companyService.deleteCompany(id).subscribe(r=>this.updateList.emit(), err=>console.log(err));
  }

}