import { Directive,Input } from "@angular/core";
   // export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
   
import { Component, Injectable} from '@angular/core';
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
    triggerEventHandler(click,myObject){
     this.onClick();
    }
  }





@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) { }
}


// Only implements params and part of snapshot.paramMap
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;
  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}
