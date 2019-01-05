import { Component, OnInit, ViewChild } from '@angular/core';
import { ChannelService } from './channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html'
})
export class ChannelComponent implements OnInit {
  @ViewChild('masterList') masterList;

  items: Array<any>;
  viewItem = false;
  editId: number = -1;
  item = {};

  constructor(
    private mService: ChannelService
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
