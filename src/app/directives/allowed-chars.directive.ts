import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[allowedChars]'
})
export class AllowedCharsDirective {
  @Input() allowedChars = ".";
  constructor(
    private elem: ElementRef
  ) { }

  ngOnInit() {
    let el = this.elem.nativeElement;
    $(el).on('keydown', event=>{
      if(!new RegExp(this.allowedChars).test(event.key)) return false;
      return true;
    });
  }

}
