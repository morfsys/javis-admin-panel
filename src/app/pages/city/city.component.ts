import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from './city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html'
})
export class CityComponent implements OnInit {

  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private mService: CityService
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
