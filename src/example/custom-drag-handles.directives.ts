import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[cmsNextCustomDragHandles]',
  standalone: true,
})
export class CustomDragHandlesDirective
  extends CdkDragHandle
  implements AfterViewInit
{
  @Input() dragger: CdkDrag;
  constructor(private el: ElementRef) {
    super(el, null);
    console.log('EEEEEEEEEEEEEEeee ', el);
  }
  ngAfterViewInit(): void {
    this.dragger._handles.reset([this as any]);
    console.log('DRAG FUCKER ', this.dragger);
    // (this.cdkDrag as any)._addHandle(this);
  }
}
