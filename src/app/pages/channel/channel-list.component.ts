import { ChannelService } from './channel.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html'
})
export class ChannelListComponent implements OnInit {
  @Input('items') items: any;
  @Output() updateItem = new EventEmitter();
  @Output() updateList = new EventEmitter();
  @ViewChild('masterList') masterList: any; 
  dtOptions: DataTables.Settings = {};

  listActionItems:Array<any> = [
    {
      name: 'Edit',
      icon: 'ei ei-edit',
      class: 'btn btn-xs btn-primary',
      action: (ev: any, it: any)=>{
        this.editItem(it);
      }
    },
    {
      name: 'Delete',
      icon: 'ei ei-delete-alt',
      class: 'btn btn-xs btn-danger',
      action: (ev: any, it: any)=>{
        this.deleteItem(it._id);
      }
    },
  
  ]


  constructor(
    private mService: ChannelService
  ) {}

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
    }
  }

  addItem() {
    this.updateItem.emit({
      item: {
        _id: 0,
        name: '',
        description: ''
      }
    });
  }

  editItem(item: any) {
    this.updateItem.emit({
      item: item
    })
  }

  deleteItem(id: number) {
    this.mService.deleteItem(id).subscribe(r=>this.updateList.emit(), err=>console.log(err));
  }
// exported
@ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger = new Subject();
  reRenderTable() {
    if(this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }else{
      this.dtTrigger.next();
    }
  }
}