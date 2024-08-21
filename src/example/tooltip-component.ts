import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  template: `<ng-template #templateRef><div class="tooltip-content">Tooltip Content</div></ng-template>`,
  styles: [`.tooltip-content { background-color: lightgrey; padding: 10px; }`],
})
export class TooltipComponent implements AfterViewInit {
  @Input() parentElement: any;
  @ViewChild('templateRef', { read: TemplateRef })
  templateRef!: TemplateRef<any>;
  overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit() {
    const positionStrategy: PositionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.parentElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
    const portal = new TemplatePortal(this.templateRef, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }
}
