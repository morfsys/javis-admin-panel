import { Component, OnInit, ViewChild } from '@angular/core';
import { RetailerService } from './retailer.service';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html'
})
export class RetailerComponent implements OnInit {

  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private moduleService: RetailerService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.moduleService.getItems().subscribe(items => {
      this.items = items;
      this.viewItem = false;
      setTimeout(()=>{
        this.masterList.reRenderTable();
      }, 500);
    });
  }
  // exported
  itemSubmitted() {
    this.getItems();
  }

  editItem(item) {
    this.item = item;
    this.viewItem = true;
  }





}
