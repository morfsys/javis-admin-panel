import { Directive, ElementRef, OnInit, Input } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[bs4-popover]'
})
export class Bs4PopoverDirective implements OnInit {
  @Input('data-content') dataContent;
  @Input('placement') placement = 'auto';
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    $(this.el.nativeElement).popover({
      content: this.dataContent,
      html: true,
      placement: this.placement
    });
  }

}
