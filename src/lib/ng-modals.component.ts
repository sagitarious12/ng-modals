import { Component, OnInit, AfterViewInit, OnChanges, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver, Directive, ViewContainerRef } from '@angular/core';
import { NgModalsInterface } from './interface/ng-modals.interface';


@Directive({
  selector: '[ngmodals]'
})
export class NgModalsDirective {
  constructor(public containers: ViewContainerRef) { }
}

@Component({
  selector: 'ng-modals',
  template: `
    <div class="mainWrapper" *ngIf="condition" id="mainWrapper" (click)="closeModal()">
      <div class="modalContainer" id="modelContainer">
        <ng-template ngmodals></ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .mainWrapper{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100vh;
        opacity: 0;
        transition: opacity 0.2s ease-out;
      }
      .modalContainer{
        position: fixed;
        top: 15vh;
        left: 20vw;
        width: 60vw;
        height: 70vh;
        background: white;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        overflow-y: auto;
      }
    `
  ]
})
export class NgModalsComponent implements OnInit, AfterViewInit, OnChanges {

  @Input('options') options;
  @Input('status') condition;
  @Output('close') close = new EventEmitter();
  public css = {};
  public viewIsInit = false;
  @ViewChild(NgModalsDirective) modalDirective:NgModalsDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnChanges(){
    setTimeout(()=>{
      this.loadComponent();
    },10);
  }

  ngAfterViewInit(){
    this.loadComponent();
    this.viewIsInit = true;
  }

  loadComponent(){
    if(this.condition){
      let contain = document.getElementById('modelContainer');
      if(this.options.width){
        contain.style.width = this.options.width + "vw";
        contain.style.left = ((100 - (parseInt(this.options.width))) / 2) + "vw";
      }
      if(this.options.height){
        contain.style.height = this.options.height + "vh";
        contain.style.top = ((100 - (parseInt(this.options.height))) / 2) + "vh";
      }
      let factory = this.componentFactoryResolver.resolveComponentFactory(this.options.component);
      let container = this.modalDirective.containers;
      container.clear();
      let component = container.createComponent(factory);
      (<NgModalsInterface>component.instance).data = this.options.data;
      document.getElementById("mainWrapper").style.opacity = "1";
    }
  }

  closeModal(){
    document.getElementById("mainWrapper").style.opacity = "0";
    setTimeout(() => {
      this.close.emit();
    }, 200);
  }

}
