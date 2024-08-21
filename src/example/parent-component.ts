import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DragDrop, DragDropModule, DragRef } from '@angular/cdk/drag-drop';
import { TooltipComponent } from './tooltip-component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CustomDragHandlesDirective } from './custom-drag-handles.directives';

@Component({
  selector: 'app-parent',
  template: `
    <div #dragHandle class="handle">Drag Handle</div>
    <div #dragElement class="draggable" >Parent Component</div>
    <!-- <app-tooltip [parentElement]="dragElement"></app-tooltip> -->
  `,
  standalone: true,
  imports: [
    TooltipComponent,
    DragDropModule,
    CommonModule,
    CustomDragHandlesDirective,
  ],
  styles: [
    `.draggable { width: 200px; height: 100px; border: 1px solid red; }`,
  ],
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('dragElement', { static: false }) dragElement: ElementRef<any>;
  @ViewChild('dragHandle', { static: false }) dragHandle: ElementRef<any>;
  dragRef: DragRef;

  constructor(private dragDrop: DragDrop) {}

  ngAfterViewInit() {
    this.dragRef = this.dragDrop.createDrag(this.dragElement);
    this.dragRef.withHandles([this.dragHandle]);
  }
}
