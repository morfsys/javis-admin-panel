import { Directive, ElementRef, OnInit, Input } from "@angular/core";
declare var $: any;
@Directive({
  selector: "[inputMaxLength]"
})
export class InputMaxLengthDirective implements OnInit {
  @Input("inputMaxLength") inputMaxLength: number = 10;
  constructor(private elem: ElementRef) {}

  ngOnInit() {
    let el = this.elem.nativeElement;
    $(el).on("keydown", event => {
      if (
        el.value.length == this.inputMaxLength &&
        event.keyCode != 8 &&
        event.keyCode != 9
      )
        return false;
      return true;
    });
  }
}
