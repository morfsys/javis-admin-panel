import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-action-dots',
  templateUrl: './action-dots.component.html',
  styleUrls: ['./action-dots.component.css']
})
export class ActionDotsComponent implements OnInit {
  @Input('action-items') actionItems = [] 
  @Input() item: any;
  showPopup: boolean = false;
  constructor() { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown({
      offset: '-120px, 0px'
    });
  }

  openPopup() {
    let current = this.showPopup || false;
    if(false && this.showPopup) {
      return false
    }else{
      setTimeout(()=>{
        if(!current) {
          
          this.showPopup = true;
        }
      })
    }
  }
  clickedOutside() {
    if(this.showPopup) {
      this.showPopup = false;
    }
  }
}
