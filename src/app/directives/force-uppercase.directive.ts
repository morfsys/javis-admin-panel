import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[forceUppercase]'
})
export class ForceUppercaseDirective {

  constructor(
      private el: ElementRef
  ) {}

  @HostListener('blur')
  setUppercase() {
      $(this.el.nativeElement).val(this.format(this.el.nativeElement.value)).trigger('change');
  }

  ngOnInit() {
      this.format(this.el.nativeElement.value);
  }

  format(value) {
      return value.toUpperCase();
  }

}
