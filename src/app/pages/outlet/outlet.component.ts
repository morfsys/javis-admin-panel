import { Component, OnInit, ViewChild } from '@angular/core';
import { OutletService } from './outlet.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html'
})
export class OutletComponent implements OnInit {
  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private mService: OutletService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.mService.getItems().subscribe(items => {
      this.items = items;
      this.viewItem = false;
      setTimeout(() => {
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
