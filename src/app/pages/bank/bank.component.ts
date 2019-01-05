import { Component, OnInit, ViewChild } from '@angular/core';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit {
  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private mService: BankService
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
