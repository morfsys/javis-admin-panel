import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'ng-selectize',
  exportAs: 'ngSelectize'
})
export class NgSelectizeDirective implements OnInit, AfterViewInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {}

  hasNgValid: boolean = false;
  ngAfterViewInit() {
    $(this.el.nativeElement).find('select').on('change', (ev)=>{
      let valid = ev.currentTarget.checkValidity();
      this.hasNgValid = valid;
    })
  }



}
