import { Directive, ElementRef, OnInit, Input } from "@angular/core";
declare var $: any;
@Directive({
  selector: "[datePicker]",
  exportAs: "datePicker"
})
export class DatePickerDirective implements OnInit {
  @Input() datePicker: any = {};
  constructor(private el: ElementRef) {}
  
  touched: boolean = false;
  dateSet: boolean = false;
  ngOnInit() {
    let elem = this.el.nativeElement;
    $(elem).on('blur', ()=>{this.touched = true;})
    $(elem).datepicker(Object.assign({
      format: "dd-mm-yyyy"
    }, this.datePicker)).on('changeDate', ()=>{
      this.dateSet = true;
    });
  }
}
