import { Directive, ElementRef, OnInit } from "@angular/core";
declare var $: any;
@Directive({
  selector: "[datePicker]"
})
export class DatePickerDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    // let elem = this.el.nativeElement;
    // $(elem).datepicker();
  }
}
