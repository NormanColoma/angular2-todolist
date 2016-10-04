/**These are necessary stub componnets when testing 
 * App Component which contains router-outlet */

export { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras } from '@angular/router';
@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

//Stub for the Outlet Router Component
@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

//We stub the Router behaviour
@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
}
