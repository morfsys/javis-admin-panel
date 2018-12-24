import { CompanyService } from './company.service';
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit, OnDestroy {
  @Input('items') items;
  @Output() updateItem = new EventEmitter();
  @Output() updateList = new EventEmitter();
  @ViewChild('companyList') companyList; 
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

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

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
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
        address_2: ''
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

  reRenderTable() {
    // this.dtTrigger.next();
    this.companyList.initTable();
  }

  test(a) {
    console.log(a);
  }

}