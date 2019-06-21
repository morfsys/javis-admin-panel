import { CompanyService } from './company.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  @Input('items') items: any;
  @Output() updateItem = new EventEmitter();
  @Output() updateList = new EventEmitter();
  @ViewChild('companyList') companyList: any; 
  dtOptions: DataTables.Settings = {};

  listActionItems:Array<any> = [
    {
      name: 'Edit',
      icon: 'ei ei-edit',
      class: 'btn btn-xs btn-primary',
      action: (ev: any, it: any)=>{
        this.updateCompany(it);
      }
    },
    {
      name: 'Delete',
      icon: 'ei ei-delete-alt',
      class: 'btn btn-xs btn-danger',
      action: (ev: any, it: any)=>{
        this.deleteCompany(it._id);
      }
    },
  
  ]


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
        city: '',
        address_1: '',
        address_2: '',
        emailId: ''
      }
    });
  }

  updateCompany(item: any) {
    this.updateItem.emit({
      item: {...item, city: item.cityId}
    })
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(r=>this.updateList.emit(), err=>console.log(err));
  }
// exported
  reRenderTable() {
    this.companyList.initTable();
  }

}