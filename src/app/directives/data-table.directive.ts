import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
declare var $: any;
@Directive({
  selector: '[appDataTable]',
  exportAs: 'appDataTable'
})
export class DataTableDirective implements OnInit {
  
  constructor(
    private el: ElementRef
  ) { } 

  ngOnInit() {
  }

  initTable() {
    console.log('init called');
    // if($(this.el.nativeElement).dataTable) {
    //   $(this.el.nativeElement).dataTable('destroy');
    // }
    $(this.el.nativeElement).dataTable();
  }
  

  reRender(el) {

  }


}
