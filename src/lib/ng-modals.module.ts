import { NgModule } from '@angular/core';
import { NgModalsComponent, NgModalsDirective } from './ng-modals.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    NgModalsComponent,
    NgModalsDirective
  ],
  exports: [
    NgModalsComponent
  ]
})
export class NgModalsModule { }
