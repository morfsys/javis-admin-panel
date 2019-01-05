import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaService } from './area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {
  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private mService: AreaService
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
    console.log('test');
    this.getItems();
  }

  editItem(item) {
    this.item = item;
    this.viewItem = true;
  }




}
