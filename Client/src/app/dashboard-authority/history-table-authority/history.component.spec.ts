import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApprovingAuthorityService } from '../../shared/services/approving-authority.service';
import { HistoryComponent } from './history.component';
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
class RouterStub {
  navigate(url: string) { return url; }
}
describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let aservice: ApprovingAuthorityService;
  let spy2: jasmine.Spy;
  let spy3: jasmine.Spy;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, RouterTestingModule],
      declarations: [HistoryComponent],
      providers: [ApprovingAuthorityService, { provide: Router, useClass: RouterStub }, { provide: XHRBackend, useClass: MockBackend }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    aservice = fixture.debugElement.injector.get(ApprovingAuthorityService)
    fixture.detectChanges();
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  //test case for checking the functionality of getData()
  it(' getData()', fakeAsync(() => {
    let spy = spyOn(aservice, 'getRequest')
      .and.returnValue(Observable.of(MOCKPENDINGREQUESTS));
    fixture.detectChanges();
    tick();
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy.calls.any()).toEqual(true);
    expect(component.data2).toEqual(MOCKPENDINGREQUESTS);

  }));


  //test case for checking the functionality of acceptRequest()
  it(' acceptRequest()', fakeAsync(() => {
    let spy = spyOn(aservice, 'getRequest')
      .and.returnValue(Observable.of(MOCKPENDINGREQUESTS));
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    spy2 = spyOn(aservice, 'postRequest')
      .and.returnValue(Observable.of(MOCKPENDINGREQUESTS));
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.accept'));
    el = de.nativeElement;
    el.click();
    expect(spy2.calls.any()).toEqual(true);

    tick();

    expect(component.data2.length).toEqual(1);
    expect(component.data2).toEqual(MOCKPENDINGREQUESTS)
  }));
  //test case for checking the error handling in component   
  it('Should handle the error ', fakeAsync(inject([Router, ApprovingAuthorityService, XHRBackend], (router, approvingAuthorityService, mockBackend) => {
    const spy4 = spyOn(router, 'navigate');
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
  //test case for checking the url
  it("Test should validate for valid resource urls",
    inject([ApprovingAuthorityService], (approvingService) => {

      expect('http://localhost:59360/api/request/getbyauthority' + '/' + component.id).toEqual('http://localhost:59360/api/request/getbyauthority/50042937');
    }))
});