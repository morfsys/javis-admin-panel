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
      if(event.keyCode == 8 || event.keyCode == 9) {
        return true;
      }
      if(!new RegExp(this.allowedChars).test(event.key)) return false;
      return true;
    });
  }

}
