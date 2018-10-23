# ng-modals

> Friendly modal creator for Angular 2+ projects

ng-modals allows for the creation of a modal with a few simple lines of code. It comes standard with a clean opening animation and also the ability to define the width and height of the modal and other cool features.

### Installation

```bash
npm install ng-modals --save
```

### API

Add the module to the `app.module.ts` as an import

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 
import { AppComponent } from './app.component';
import {NgModalsComponent, NgModalsDirective } from 'ng-modals';
 
@NgModule({
  declarations: [ AppComponent, NgModalsComponent, NgModalsDirective ],
  imports: [ BrowserModule, FormsModule, HttpModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

Then, in the a `component` file

```javascript
import { Component } from '@angular/core';
import { SomeOtherComponent } from './some/file/path';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleModal()"></button>
    <ng-modals [options]="modalOptions" [status]="isModalOpen" (close)="toggleModal()"></ng-modals>
  `
})
export class AppComponent {
  public isModalOpen = false;
  public modalOptions = {
    width: "70",
    height: "70",
    component: SomeOtherComponent,
    data: {authors: [{name: "Joe Seph", books: 23}]}
  }

  toggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }
}
```

Then in the `SomeOtherComponent` that you referenced in the `modalOptions` object..

```javascript
import { Component, OnInit, Input } from '@angular/core';
import { NgModalsInterface } from 'ng-modals';

@Component({
  selector: 'app-some-other-component',
  template: `
    <p>{{data.authors[0].name}} has {{data.authors[0].books}} books.</p>
  `
})
export class SomeOtherComponent implements OnInit, NgModalsInterface {

  @Input('data') data:any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }
}
```

#### You have now opened a new modal!