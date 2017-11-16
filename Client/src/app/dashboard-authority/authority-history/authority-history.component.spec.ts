import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApprovingAuthorityService } from '../../shared/services/approving-authority.service';
import { AuthorityHistoryComponent } from './authority-history.component';
import { HttpModule } from "@angular/http";
import { DebugElement } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/Observable/of';
import { fakeAsync, tick } from "@angular/core/testing";
import { inject } from "@angular/core/testing";
import { MOCKPENDINGREQUESTS } from "../../../testing/mock-data";
import { Router } from '@angular/router';
import {
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';


import { RouterTestingModule } from "@angular/router/testing";
class RouterStub // this is the stubing the router.
{
  navigate(url: string) { return url; }
}

describe('AuthorityHistoryComponent', () => {
  let component: AuthorityHistoryComponent;
  let fixture: ComponentFixture<AuthorityHistoryComponent>;
  let aservice: ApprovingAuthorityService;
  let spy: jasmine.Spy;

  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorityHistoryComponent],
      imports: [HttpModule, RouterTestingModule],

      providers: [ApprovingAuthorityService, { provide: Router, useClass: RouterStub }, { provide: XHRBackend, useClass: MockBackend }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityHistoryComponent);
    component = fixture.componentInstance;
    aservice = fixture.debugElement.injector.get(ApprovingAuthorityService)


    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  //   
  //test case for checking the functionality of getData()
  it(' getHistory()', fakeAsync(() => {
    let spy = spyOn(aservice, 'getHistory')  //for spying the getHistory method of ApprovingAuthorityService
      .and.returnValue(Observable.of(MOCKPENDINGREQUESTS));
    fixture.detectChanges();
    tick();
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
    expect(component.data2).toEqual(MOCKPENDINGREQUESTS);

  }));

  //test case for checking the error handling in component
  it('Should handle the error ', fakeAsync(inject([Router, ApprovingAuthorityService, XHRBackend], (router, approvingAuthorityService, mockBackend) => {
    const spy4 = spyOn(router, 'navigate');   //for spying the navigate method of router
    var req = fixture.debugElement.injector.get(ApprovingAuthorityService);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    mockBackend.connections.subscribe((connection) => {
      connection.mockError(new Response(new ResponseOptions({
        body: { error: 'somthing went wrong' }, status: 404
      })));
    });
    component.getData();
    const navArgs = spy4.calls.first().args[0];
    expect('/app-dashboard-authority/app-error-page').toContain(navArgs);
  })));
});
