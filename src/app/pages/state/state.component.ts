import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html'
})
export class StateComponent implements OnInit {

  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private mService: StateService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.mService.getItems().subscribe(items => {
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
