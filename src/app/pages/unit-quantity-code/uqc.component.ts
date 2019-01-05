import { Component, OnInit, ViewChild } from '@angular/core';
import { UQCService } from './uqc.service';

@Component({
  selector: 'app-uqc',
  templateUrl: './uqc.component.html'
})
export class UQCComponent implements OnInit {
  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private mService: UQCService
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
